import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { Spinner, Button, Card, ListGroup, Table } from "react-bootstrap";
import * as fn from "../MyFunctions";
import { useSelector, useDispatch } from 'react-redux';

const AddTransaksiTokoCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [nama, setNama] = useState("");
  // const [alamat, setAlamat] = useState("");
  // const [telepon, setTelepon] = useState("");
  // const [foto, setFoto] = useState("");
  // const [kecamatan, setKecamatan] = useState("");
  // const [kota, setKota] = useState("");
  const [dataToko, setDataToko] = useState({});

  const [cartItems, setCartItems] = useState([]);
  const [nilaiTotal, setNilaiTotal] = useState(0);

  const kunjunganToko = useSelector(state => state.kunjunganToko);
  console.log('kunjungan toko', kunjunganToko);

  const { id } = useParams(); // id rute
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const idToko = searchParams.get("id_toko"); // id toko

  let localCart = JSON.parse(localStorage.getItem('cartList') || '[]');
  // if (localStorage.getItem('cartList')) {
  //   localCart = JSON.parse(localStorage.getItem("cartList"));
  // }
  // console.log('localcart', localCart);
  // let tokoCart = [];
  // let total = 0;
  // localCart.map(item => {
  //   console.log('cart', idToko, item.idToko);
  //   if (idToko === item.idToko) {
  //     // total += item.harga*item.jumlahTitip;

  //     // if (item.id === id) {
  //       tokoCart.push(item);
  //     // }
  //   }
  // });
  // console.log('tokocart', tokoCart);

  useEffect(() => {
    setIsLoading(true);
    getDataToko();
    getDataCart();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    hitungTotal();
    localStorage.setItem('cartList', JSON.stringify(cartItems));
  }, [cartItems]);

  const getDataCart = () => {
    let arrCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    console.log('arrcart', arrCart);
    arrCart = arrCart.filter(function(item) {
      return item.id_toko.toString() === idToko;
    });
    setCartItems(arrCart);
    // hitungTotal();
  }

  const getDataToko = async () => {
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
      const response = await fetch(`${global.config.base_url}/toko/${idToko}`);
      const data = await response.json();
      console.log('getdatatoko', data);
      setDataToko(data);
      localStorage.setItem('kunjungan', JSON.stringify(data));
    }
  };

  // const onClickSubmit = async () => {
  //   // gunakan data dr localstorage utk simpan data ke tabel
  //   const dataTransaksi = { 
  //     id_toko: idToko, 
  //     id_user: 2, // id user yg sedang login
  //     nilai_transaksi: total,
  //     details: localCart,
  //   };
  //   console.log('data transaksi', dataTransaksi);
  //   const myurl = `${global.config.base_url}/Mtransaksi`;
  //   console.log(myurl);
  //   await fetch(myurl, {
  //     method: 'POST',
  //     body: JSON.stringify(dataTransaksi),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((res) => {
  //       console.log('res', res);
  //       // perbarui data di tabel barang
  //       // lalu hapus item localstorage utk toko ini
  //       for (let i=localCart.length-1; i>=0; i--) {
  //         console.log('localcart', localCart[i].idToko, id);
  //         if (localCart[i].idToko === idToko) {
  //           localCart.splice(i, 1);
  //         }
  //       }
  //       localStorage.setItem('cartList', localCart);
        
  //       navigate(`/rute_list_toko/${id}`);
  //     })
  //     .catch((error) => console.log('error', error));
  // }

  const handleOnChangeInput = (id, field, value) => {
    console.log('asd0', cartItems);
    console.log('change item', id, field, value);
    value = value.toString().replace(/\D/g,'');
    let updatedItems = cartItems.map(item => {
      item.id_toko = idToko;
      if (item.id === id) {
        if (field === 'titip') {
          item.titip = value;
        }
        if (field === 'sisa') {
          item.sisa = value;
        }
        if (field === 'laku') {
          item.laku = value;
        }
        if (field === 'harga') {
          item.harga = value;
        }
      }
      return item;
    });
    console.log('asd1', updatedItems);
    setCartItems(updatedItems);
    localStorage.setItem('cartList', JSON.stringify(updatedItems));
  }
  // end const handleOnChangeInput

  const handleDelete = (idBarang) => {
    let arrCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    console.log('delete', idBarang, arrCart);
    let tmpCart = arrCart.filter(item => {return item.id.toString() !== idBarang.toString()})
    console.log('after delete', tmpCart);
    setCartItems(tmpCart);
  }

  const selectAllText = (e) => {
    e.target.select();
  }

  const hitungTotal = () => {
    let total = 0;
    let copyCart = cartItems.map(item => {
      total += item.harga * item.laku;
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
    let myurl = `${global.config.base_url}/Mtransaksi`
    console.log('save', myurl, data);
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
        }
      });
    navigate(`/rute_list_toko/${id}`)
  }
  // end const saveTransaksi

  // const saveToko = async (e) => {
  //   e.preventDefault();

  //   const toko = { nama, alamat, foto, kecamatan, kota, telepon };
  //   await fetch(`${global.config.base_url}/toko`, {
  //     method: 'POST',
  //     body: JSON.stringify(toko),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });

  //   // setelah selesai, redirect ke hal.master toko
  //   navigate("/master_toko");
  // };

  return (
    <>
      {
        isLoading
        ? <Spinner animation="border" />
        : <div className="container">
            <div className="mb-3 fs-4">
              Ringkasan Nota baru untuk [<strong>{dataToko.nama}</strong>]
            </div>
            <div className="mb-3">
              <Link to={`/add_transaksi_list_barang/${id}?id_toko=${idToko}`}>
                <Button variant="primary">Pilih Barang</Button>
              </Link>
            </div>
            <Card className="mb-3">
              {
                cartItems.length > 0
                ? (
                  cartItems.map((item, index) => (
                    <Card.Body key={item.id}>
                      <Card.Text className="fw-bold mb-2">
                        <span className="me-2">{item.nama}</span>
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
                        value={fn.thousandSeparator(item.laku)}
                        onChange={(e) => handleOnChangeInput(item.id, 'laku', e.target.value)}
                        onFocus={selectAllText}
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
                        value={fn.thousandSeparator(item.laku * item.harga)}
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
              : (<></>)
            }
          </div>

      }
    </>
  );
};

export default AddTransaksiTokoCart;
