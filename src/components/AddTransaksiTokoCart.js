import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import * as fn from "../MyFunctions";

const AddTransaksiTokoCart = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [foto, setFoto] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota, setKota] = useState("");

  const { id } = useParams(); // id rute
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const idToko = searchParams.get("id_toko"); // id toko

  let localCart = [];
  if (localStorage.getItem('cartList')) {
    localCart = JSON.parse(localStorage.getItem("cartList"));
  }
  // console.log('localcart', localCart);
  let tokoCart = [];
  let total = 0;
  localCart.map(item => {
    console.log('cart', idToko, item.idToko);
    if (idToko === item.idToko) {
      total += item.harga*item.jumlahTitip;

      // if (item.id === id) {
        tokoCart.push(item);
      // }
    }
  });
  console.log('tokocart', tokoCart);

  useEffect(() => {
    getTokoById();
  }, []);

  const getTokoById = async () => {
    const response = await fetch(`${global.config.base_url}/toko/${idToko}`);
    const data = await response.json();
    // console.log('data', data);
    setNama(data.nama);
    setAlamat(data.alamat);
    setTelepon(data.telepon);
    setKecamatan(data.kecamatan);
    setKota(data.kota);
    setFoto(data.foto);
  };

  const onClickSubmit = async () => {
    // gunakan data dr localstorage utk simpan data ke tabel
    const dataTransaksi = { 
      id_toko: idToko, 
      id_user: 2, // id user yg sedang login
      nilai_transaksi: total,
      details: localCart,
    };
    console.log('data transaksi', dataTransaksi);
    const myurl = `${global.config.base_url}/Mtransaksi`;
    console.log(myurl);
    await fetch(myurl, {
      method: 'POST',
      body: JSON.stringify(dataTransaksi),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('res', res);
        // perbarui data di tabel barang
        // lalu hapus item localstorage utk toko ini
        for (let i=localCart.length-1; i>=0; i--) {
          console.log('localcart', localCart[i].idToko, id);
          if (localCart[i].idToko === idToko) {
            localCart.splice(i, 1);
          }
        }
        localStorage.setItem('cartList', localCart);
        
        navigate(`/rute_list_toko/${id}`);
      })
      .catch((error) => console.log('error', error));
  }
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
    <div className="container">
      <div className="mb-3 fs-4">
        Ringkasan Nota baru untuk [<strong>{nama}</strong>]
      </div>
      <div className="mb-3">
        <Link to={`/add_transaksi_list_barang/${id}?id_toko=${idToko}`}>
          <Button variant="primary">Pilih Barang</Button>
        </Link>
      </div>
      {/* <div>
        {
          localCart.length > 0
          ? (
            localCart.map((item, index) => (
              <article className="media" key={item.id}>
                {index+1}. 
                <figure className="media-left ms-2">
                  <div className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/48x48.png" />
                  </div>
                </figure>
                <div className="media-content">
                  <div className="content mb-2">

                    <strong>{item.nama}</strong>
                    <div className="fs-7">
                      <span className="me-1">
                        Harga: Rp {item.harga}, 
                      </span>
                      <span>
                        Jumlah Titip: {item.jumlahTitip}
                      </span>
                    </div>

                  </div>
                </div>
              </article>
            ))
          )
          : (
            <em>Data masih kosong</em>
          )
        }
      </div> */}
      <div className="simple-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan={2}>Nama Barang</th>
              <th>Info Nilai</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              tokoCart.length > 0
              ? (
                tokoCart.map((item, index) => (
                  <tr key={item.id}>
                    <td colSpan={2} style={{wordBreak:'break-word'}}>{item.nama}</td>
                    <td className="align-right" style={{wordBreak:'break-word'}}>
                      <span className="me-2">Rp {fn.thousandSeparator(item.harga)}</span>
                      <br/>
                      <span className="me-2">x {fn.thousandSeparator(item.jumlahTitip)}</span>
                    </td>
                    <td className="align-right">
                      Rp {fn.thousandSeparator(item.jumlahTitip * item.harga)}
                    </td>
                  </tr>
                ))
              )
              : (
                <tr>
                  <td colSpan="4">
                    Keranjang belanja masih kosong
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
      <div className="align-right fs-4 mb-2">
        <span className="me-2">Total:</span>
        <strong>Rp {fn.thousandSeparator(total)}</strong>
      </div>

      {
        tokoCart.length > 0
        ? (
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={onClickSubmit}>
              SIMPAN NOTA
            </Button>
          </div>
        )
        : (<></>)
      }
    </div>
  );
};

export default AddTransaksiTokoCart;
