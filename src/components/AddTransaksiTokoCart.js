import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { Spinner, Button, Card, ListGroup, Table } from "react-bootstrap";
import * as fn from "../MyFunctions";
import { useSelector, useDispatch } from 'react-redux';

const AddTransaksiTokoCart = () => {
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

  let localCart = JSON.parse(localStorage.getItem('cartList') || '[]');

  useEffect(() => {
    getDataToko();
    if (idTrx) {
      getDataNota();
    } else {
      getDataCart();
    }
  }, []);

  useEffect(() => {
    hitungTotal();
    localStorage.setItem('cartList', JSON.stringify(cartItems));
  }, [cartItems]);

  const getDataCart = () => {
    setIsLoadingCartData(true);
    let arrCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    console.log('getdatacart', arrCart);
    arrCart = arrCart.filter(function(item) {
      return item.id_toko.toString() === idToko;
    });
    setCartItems(arrCart);
    // hitungTotal();
    setIsLoadingCartData(false);
  }

  const getDataNota = async () => {
    setIsLoadingCartData(true);
    let myurl = `${fn.getBaseUrl()}/Dtransaksi?qf=id_transaksi&qv=${idTrx}`;
    console.log('getdatanota myurl', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    data.forEach(item => {
      item.nama = item.nama_barang;
    });
    console.log('getdatanota data', data);
    setCartItems(data);
    setIsLoadingCartData(false);
  }

  const getDataToko = async () => {
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
    console.log('asd1', id, itemID, cartItems[0]);
    let updatedItems = cartItems.map(item => {
      item.id_toko = idToko;
      if (item.id === itemID) {
        if (field === 'titip') {
          item.titip = value;
        }
        if (field === 'sisa') {
          item.sisa = value;
          item.subtotal = item.laku * item.harga;
        }
        if (field === 'laku') {
          item.laku = value;
          item.subtotal = item.laku * item.harga;
        }
        if (field === 'harga') {
          item.harga = value;
          item.subtotal = item.laku * item.harga;
        }
        if (field === 'subtotal') {
          item.subtotal = value;
        }
        console.log('item', field, item.titip - item.sisa)
        // console.log('item', field, item.titip, item.sisa, item.laku, item.harga, item.subtotal);
      }
      return item;
    });
    console.log('asd2', updatedItems);
    setCartItems(updatedItems);
    localStorage.setItem('cartList', JSON.stringify(updatedItems));
  }
  // end const handleOnChangeInput

  const handleDelete = (idBarang) => {
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
      total += item.subtotal;
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
          {console.log('asd', isLoadingInfoToko, dataToko)}
          {
            (() => {
              if (isLoadingInfoToko)
                return <Spinner animation="border" />;
              if (parseInt(idTrx|0) > 0)
                return <span>Ringkasan Nota <strong>{idTrx}</strong> untuk [<strong>{dataToko.nama}</strong>]</span>
              if (parseInt(idToko|0) > 0)
              return <span>Ringkasan Nota Baru untuk [<strong>{dataToko.nama}</strong>]</span>
            })()
          }
        </div>
        <div className="mb-3">
          <Link to={`/add_transaksi_toko_nota/${id}?id_toko=${idToko}`}>
            <Button variant="primary">Pilih Barang</Button>
          </Link>
        </div>
        {
          isLoadingCartData
          ? <Spinner animation="border" />
          : <>
            <Card className="mb-3">
              {
                cartItems.length > 0
                ? (
                  cartItems.map((item, index) => (
                    <Card.Body key={item.id}>
                      <Card.Text className="fw-bold mb-2">
                        <span className="me-2">{index+1}. {item.nama}</span>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>Hapus</Button>
                      </Card.Text>
                      <Card.Text className="mb-1 is-flex is-justify-content-space-between">
                        <span className="me-2">Titip:</span>
                        <input type="text"
                        id={`titip-${item.id}`}
                        value={item.titip}
                        onChange={(e) => handleOnChangeInput(item.id, 'titip', e.target.value)}
                        onFocus={selectAllText}
                        />
                      </Card.Text>
                      <Card.Text className="mb-1 is-flex is-justify-content-space-between">
                        <span className="me-2">Sisa:</span>
                        <input type="text"
                        id={`sisa-${item.id}`}
                        value={item.sisa}
                        onChange={(e) => handleOnChangeInput(item.id, 'sisa', e.target.value)}
                        onFocus={selectAllText}
                        />
                      </Card.Text>
                      <Card.Text className="mb-1 is-flex is-justify-content-space-between">
                        <span className="me-2">Laku:</span>
                        <input type="text"
                        id={`laku-${item.id}`}
                        value={fn.thousandSeparator(item.titip - item.sisa)}
                        onChange={(e) => handleOnChangeInput(item.id, 'laku', e.target.value)}
                        onFocus={selectAllText}
                        readOnly="readonly"
                        />
                      </Card.Text>
                      <Card.Text className="mb-1 is-flex is-justify-content-space-between">
                        <span className="me-2">Harga:</span>
                        <input type="text"
                        id={`harga-${item.id}`}
                        value={fn.thousandSeparator(item.harga)}
                        onChange={(e) => handleOnChangeInput(item.id, 'harga', e.target.value)}
                        onFocus={selectAllText}
                        />
                      </Card.Text>
                      <hr/>
                      <Card.Text className="mb-1 is-flex is-justify-content-space-between">
                        <span className="me-2">Subtotal:</span>
                        <input type="text"
                        style={{textAlign:"right"}}
                        id={`subtotal-${item.id}`}
                        value={fn.thousandSeparator((item.titip - item.sisa) * item.harga)}
                        onChange={(e) => handleOnChangeInput(item.id, 'subtotal', e.target.value)}
                        />
                      </Card.Text>
                    </Card.Body>
                  ))
                )
                : (
                  <Card.Body>
                    <Card.Text className="mb-2">
                      <em>Data transaksi masih kosong</em>
                    </Card.Text>
                  </Card.Body>
                )
              }

              {
                cartItems.length > 0
                ? (
                  <Card.Body className="align-right fs-4 mb-2">
                    <span className="me-2">Total:</span>
                    <strong>Rp {fn.thousandSeparator(nilaiTotal)}</strong>
                  </Card.Body>
                )
                : ''
              }

            </Card>

            {
              cartItems.length > 0
              ? (
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" onClick={() => saveTransaksi()}>
                    SIMPAN NOTA
                  </Button>
                </div>
              )
              : ""
            }
          </>
        }
      </div>
    </>
  );
};

export default AddTransaksiTokoCart;
