import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const AddTransaksiToko = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [foto, setFoto] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota, setKota] = useState("");

  const { id } = useParams();
  // console.log('add transaksi toko', id);

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
      <div className="mb-3 fs-4">Nota baru untuk toko [xxx]</div>
      <div>
        <Button variant="primary">Pilih Barang</Button>
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

export default AddTransaksiToko;
