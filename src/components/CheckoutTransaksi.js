import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { Spinner, Button, Card, Container, Row, Col } from "react-bootstrap";
import * as fn from "../MyFunctions";
import { useSelector, useDispatch } from 'react-redux';

const CheckoutTransaksi = () => {
  const [isLoadingInfoToko, setIsLoadingInfoToko] = useState(false);
  const [isLoadingCartData, setIsLoadingCartData] = useState(false);

  const [dataToko, setDataToko] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [nilaiTotal, setNilaiTotal] = useState(0);

  const kunjunganToko = useSelector(state => state.kunjunganToko);
  console.log('kunjungan toko', kunjunganToko);

  const { id } = useParams(); // id rute
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const idToko = searchParams.get("id_toko"); // id toko
  const idTrx = searchParams.get("id_trx"); // id transaksi (hanya ada saat mengedit trx lama)
  console.log('id', id, idToko, idTrx);

  // let localCart = JSON.parse(localStorage.getItem('cartList') || '[]');

  useEffect(() => {
    getDataToko();
    console.log('idtrx', idTrx, idToko, id);
    getDataNota();
    // if (idTrx) {
    //   getDataNota();
    // } else {
    //   getDataCart();
    // }
  }, []);

  useEffect(() => {
    hitungTotal();
    localStorage.setItem('cartList', JSON.stringify(cartItems));
  }, [cartItems]);

  const getDataCart = () => {
    // setIsLoadingCartData(true);
    // let arrCart = [];
    // if (idTrx) {
    //   let myurl = `${fn.getBaseUrl()}/Dtransaksi?qf=id_transaksi&qv=${idTrx}`;
    //   console.log('getdatanota myurl', myurl);
    //   fetch(myurl)
    //     .then(response => response.json())
    //     .then(res => {
    //       arrCart = res;
    //     });
    // } else {
    //   arrCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    //   console.log('getdatacart', arrCart);
    //   // yg diambil dr localStorage hanya yg id_toko nya sesuai dgn transaksi saat ini
    //   // utk kasus dmn user bolak balik ke halaman sblmnya sblm menyelesaikan/submit nota
    //   arrCart = arrCart.filter(function(item) {
    //     return item.id_toko.toString() === idToko;
    //   });
    // }
    // arrCart.map(item => {
    //   item.subtotal = (item.titip - item.sisa) * item.harga;
    //   if (idTrx) {
    //     item.nama = item.nama_barang;
    //   }
    // });
    // setCartItems(arrCart);
    // // hitungTotal();
    // setIsLoadingCartData(false);
  }

  const getDataNota = async () => {
    setIsLoadingCartData(true);
    let qsArr = [];
    qsArr.push(`qf[]=id_transaksi&qv[]=${idTrx}&qmode[]=exact`);
    let myurl = fn.prepURL('/Dtransaksi', qsArr);
    // let myurl = `${fn.getBaseUrl()}/Dtransaksi?qf[]=id_transaksi&qv[]=${idTrx}`;
    console.log('getdatanota myurl', myurl, idTrx);
    const response = await fetch(myurl);
    const data = await response.json();
    data.map(item => {
      item.nama = item.nama_barang;
      if (idTrx) {
        item.laku = item.titip - item.sisa;
      }
      item.subtotal = item.laku * item.harga;
      // item.subtotal = (item.titip - item.sisa) * item.harga;
    });
    console.log('getdatanota data', data);
    setCartItems(data);
    setIsLoadingCartData(false);
  }

  const getDataToko = async () => {
    console.log('get data toko');
    setIsLoadingInfoToko(true);
    let kunjungan = localStorage.getItem('kunjungan') || '[]';
    kunjungan = JSON.parse(kunjungan);
    // kalo variabel kunjungan terakhir masih tersimpan di localStorage
    // artinya masih dlm proses transaksi
    // maka data toko langsung diambil dr data localStorage tsb
    if (kunjungan.length > 0) {
      setDataToko(kunjungan);
    }
    else {
      // kalo belum ada data kunjungan yg tersimpan di localStorage
      // artinya ini awal dari sebuah transaksi
      // maka ambil data toko dari API server
      // lalu simpan data tsb di localStorage
      const response = await fetch(`${fn.getBaseUrl()}/toko/${idToko}`);
      const data = await response.json();
      console.log('getdatatoko', data);
      setDataToko(data);
      localStorage.setItem('kunjungan', JSON.stringify(data));
    }
    setIsLoadingInfoToko(false);
  };


  const handleOnChangeInput = (itemID, field, value) => {
    // console.log('asd0', cartItems);
    // console.log('change item', id, field, value);
    value = value.toString().replace(/\D/g,'');
    console.log('asd1', id, itemID, value, cartItems[0]);
    let updatedItems = cartItems.map(item => {
      item.id_toko = idToko;
      if (item.id === itemID) {
        if (field === 'titip') {
          item.titip = parseInt(value|0).toString();
          // item.laku = item.titip - item.sisa;
        }
        if (field === 'sisa') {
          item.sisa = parseInt(value|0).toString();
          // item.laku = item.titip - item.sisa;
          // item.subtotal = item.laku * item.harga;
        }
        if (field === 'laku') {
          item.laku = parseInt(value|0).toString();
          // item.subtotal = item.laku * item.harga;
        }
        if (field === 'harga') {
          item.harga = parseInt(value|0).toString();
          // item.subtotal = item.laku * item.harga;
        }
        console.log('idtrx', idTrx, item.laku, item.harga);
        if (idTrx) {
          item.laku = item.titip - item.sisa;
          item.subtotal = item.laku * item.harga;
        } else {
          item.subtotal = 0;
        }
        if (field === 'subtotal') {
          item.subtotal = value;
        }
        console.log('item', field, item.titip - item.sisa, item.laku);
        // console.log('item', field, item.titip, item.sisa, item.laku, item.harga, item.subtotal);
      }
      return item;
    });
    console.log('asd2', updatedItems);
    setCartItems(updatedItems);
    localStorage.setItem('cartList', JSON.stringify(updatedItems));
  }
  // end const handleOnChangeInput

  const handleDelete = (idBarang, string) => {
    if ( ! window.confirm(`Data barang [${string}] akan dihapus dari nota ini. Lanjutkan?`)) {
      return false;
    }

    let arrCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    // console.log('delete', idBarang, arrCart);
    let tmpCart = arrCart.filter(item => {return item.id.toString() !== idBarang.toString()})
    // console.log('after delete', tmpCart);
    setCartItems(tmpCart);
  }

  const selectAllText = (e) => {
    let str = e.target.value;
    e.target.value = str.replace(/\D/g,'');
    e.target.select();
  }

  const hitungTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total += parseInt(fn.removeNonNumeric(item.subtotal.toString())|0);
    });
    setNilaiTotal(total);
    return total;
  }

  const saveTransaksi = async () => {
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    const loginID = typeof loginData.id != 'undefined' ? loginData.id : '';
    let data = {
      id_user: loginID,
      id_toko: idToko,
      nilai_transaksi: nilaiTotal,
      details: cartItems,
    }
    let myurl = `${fn.getBaseUrl()}/Mtransaksi`
    // console.log('save', myurl, data);
    await fetch(myurl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(res => {
        if (res.status == 201) {
          localStorage.removeItem('cartList');
          let phone = fn.ltrim(dataToko.telepon);
          // console.log('phone', phone);
          let msgWA = `Nota Baru untuk toko *${dataToko.nama}* telah berhasil dibuat pada ${fn.formatDate()} oleh user ${loginData.username}. Total nilai transaksi: Rp ${fn.thousandSeparator(nilaiTotal)}`;
          fn.sendWhatsApp(phone, msgWA);
          fn.showToastMsg(res.messages.success);
          // navigate(`/rute_list_toko/${id}`)
        }
      })
      .catch(err => {
        fn.showToastMsg('Gagal menghapus data rute', 'error');
      });
  }
  // end const saveTransaksi


  return (
    <>
      <div className="container">
        <div className="mb-3 fs-5">
          { console.log('asd', isLoadingInfoToko, dataToko) }
          {
            (() => {
              if (isLoadingInfoToko) {
                return <Spinner animation="border" />;
              } else if (idTrx) {
                return (
                  <Container fluid className="fs-7 p-0">
                    <Row>
                      <Col xs={3} className="pe-0">
                        <div className="is-flex is-justify-content-space-between">
                          <div>Kode Nota</div>
                          <div>:</div>
                        </div>
                      </Col>
                      <Col>{fn.formatNoNota(idTrx)}</Col>
                    </Row>
                    <Row>
                      <Col xs={3} className="pe-0">
                        <div className="is-flex is-justify-content-space-between">
                          <div>Nama Toko</div>
                          <div>:</div>
                        </div>
                      </Col>
                      <Col>{dataToko.nama}</Col>
                    </Row>
                    <Row>
                      <Col xs={3} className="pe-0">
                        <div className="is-flex is-justify-content-space-between">
                          <div>Tanggal</div>
                          <div>:</div>
                        </div>
                      </Col>
                      {
                        cartItems.length > 0
                        ? (<Col>{fn.formatDate(new Date(cartItems[0].created_at))}</Col>)
                        : (<Col>{fn.formatDate(new Date())}</Col>)
                      }
                    </Row>
                  </Container>
                );
              } else {
                return (
                  <Container fluid className="fs-7 p-0">
                    <Row>
                      <Col xs={3} className="pe-0">
                        <div className="is-flex is-justify-content-space-between">
                          <div>Nama Toko</div>
                          <div>:</div>
                        </div>
                      </Col>
                      <Col>{dataToko.nama}</Col>
                    </Row>
                    <Row>
                      <Col xs={3} className="pe-0">
                        <div className="is-flex is-justify-content-space-between">
                          <div>Tanggal</div>
                          <div>:</div>
                        </div>
                      </Col>
                      <Col>{fn.formatDate(new Date())}</Col>
                    </Row>
                  </Container>
                );
              }
            })()
          }
        </div>
        <div className="mb-3">
          <Link to={`/add_transaksi_list_barang/${id}?id_toko=${idToko}`}>
            <Button variant="primary">Pilih Barang</Button>
          </Link>
        </div>
        {
          isLoadingCartData
          ? <Spinner animation="border" />
          : <>
              {
                cartItems.length > 0
                ? (
                  <>
                    {cartItems.map((item, index) => (
                      <>
                      <Card key={item.id} className="mb-3">
                        <Card.Body>
                          <Card.Text className="fw-bold mb-2">
                            <span className="me-2">{index+1}. {item.nama}</span>
                            {
                              idTrx 
                                ? '' 
                                : (
                                  <Button size="sm" variant="danger" onClick={() => handleDelete(item.id, item.nama)}>Hapus</Button>
                                )
                            }
                          </Card.Text>
                          <Card.Text className="mb-1 is-flex is-justify-content-space-between">
                            <Container fluid className="p-0">
                              <Row>
                                <Col xs={3} className="pe-0">
                                  <div className="is-flex is-justify-content-space-between">
                                    <div>Titip</div>
                                    <div>:</div>
                                  </div>
                                </Col>
                                <Col>
                                  <input type="text"
                                  id={`titip-${item.id}`}
                                  value={item.titip}
                                  onChange={(e) => handleOnChangeInput(item.id, 'titip', e.target.value)}
                                  onBlur={(e) => handleOnChangeInput(item.id, 'titip', e.target.value)}
                                  // onBlur={(e) => {e.target.value = parseInt(e.target.value|0).toString()}}
                                  onFocus={selectAllText}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={3} className="pe-0">
                                  <div className="is-flex is-justify-content-space-between">
                                    <div>Sisa</div>
                                    <div>:</div>
                                  </div>
                                </Col>
                                <Col>
                                  <input type="text"
                                  id={`sisa-${item.id}`}
                                  value={item.sisa}
                                  onChange={(e) => handleOnChangeInput(item.id, 'sisa', e.target.value)}
                                  onBlur={(e) => handleOnChangeInput(item.id, 'sisa', e.target.value)}
                                  // onBlur={(e) => {e.target.value = parseInt(e.target.value|0).toString()}}
                                  onFocus={selectAllText}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={3} className="pe-0">
                                  <div className="is-flex is-justify-content-space-between">
                                    <div>Laku</div>
                                    <div>:</div>
                                  </div>
                                </Col>
                                <Col>
                                  <input type="text"
                                  id={`laku-${item.id}`}
                                  value={fn.thousandSeparator(item.laku)}
                                  onBlur={(e) => handleOnChangeInput(item.id, 'laku', e.target.value)}
                                  onFocus={selectAllText}
                                  readOnly={idTrx ?"readonly" : ""}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={3} className="pe-0">
                                  <div className="is-flex is-justify-content-space-between">
                                    <div>Harga</div>
                                    <div>:</div>
                                  </div>
                                </Col>
                                <Col>
                                  <input type="text"
                                  id={`harga-${item.id}`}
                                  value={fn.thousandSeparator(item.harga)}
                                  onChange={(e) => handleOnChangeInput(item.id, 'harga', e.target.value)}
                                  onBlur={(e) => handleOnChangeInput(item.id, 'harga', e.target.value)}
                                  onFocus={selectAllText}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={3} className="pe-0">
                                  <div className="is-flex is-justify-content-space-between">
                                    <div>Subtotal</div>
                                    <div>:</div>
                                  </div>
                                </Col>
                                <Col>
                                  <input type="text"
                                  style={{textAlign:"right"}}
                                  id={`subtotal-${item.id}`}
                                  value={fn.thousandSeparator(item.subtotal)}
                                  onChange={(e) => handleOnChangeInput(item.id, 'subtotal', e.target.value)}
                                  onBlur={(e) => handleOnChangeInput(item.id, 'subtotal', e.target.value)}
                                  onFocus={selectAllText}
                                  />
                                </Col>
                              </Row>
                            </Container>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      </>
                    ))}
                  </>
                )
                : (
                  <div className="mb-2 fst-italic">
                    Data transaksi masih kosong
                  </div>
                )
              }

              {
                cartItems.length > 0
                ? (
                  <>
                    <div className="align-right fs-4 mb-2">
                      <span className="me-2">Total:</span>
                      <strong>Rp {fn.thousandSeparator(nilaiTotal)}</strong>
                    </div>

                    <div className="d-grid gap-2">
                      <Button variant="primary" size="lg" onClick={() => saveTransaksi()}>
                        SIMPAN NOTA
                      </Button>
                    </div>
                  </>
                )
                : ''
              }
          </>
        }
      </div>
    </>
  );
};

export default CheckoutTransaksi;
