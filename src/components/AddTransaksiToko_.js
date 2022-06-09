import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const AddTransaksiTokoCart = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [foto, setFoto] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota, setKota] = useState("");

  const { id } = useParams(); // id toko

  useEffect(() => {
    getTokoById();
  }, []);

  const getTokoById = async () => {
    const response = await fetch(`${global.config.base_url}/toko/${id}`);
    const data = await response.json();
    // console.log('data', data);
    setNama(data.nama);
    setAlamat(data.alamat);
    setTelepon(data.telepon);
    setKecamatan(data.kecamatan);
    setKota(data.kota);
    setFoto(data.foto);
  };

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
        Nota baru untuk [<strong>{nama}</strong>]
      </div>
      <div>
        <Link to="/add_transaksi_pilih_barang">
          <Button variant="primary">Pilih Barang</Button>
        </Link>
      </div>
      <div className="simple-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Jumlah</th>
              <th>Harga</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lolipop Strawberry</td>
              <td>20</td>
              <td>Rp 5.000</td>
              <td>Rp 100.000</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddTransaksiTokoCart;
