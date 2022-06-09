import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const HistoriTransaksiToko = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [foto, setFoto] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota, setKota] = useState("");

  const navigate = useNavigate();

  const saveToko = async (e) => {
    e.preventDefault();

    const toko = { nama, alamat, foto, kecamatan, kota, telepon };
    await fetch(`${global.config.base_url}/toko`, {
      method: 'POST',
      body: JSON.stringify(toko),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // setelah selesai, redirect ke hal.master toko
    navigate("/master_toko");
  };

  return (
    <div className="container">
      <div className="mb-3 fs-4">Histori Nota</div>
      <div className="table-container">
        <Table striped hover>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Username</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15 Jan 2022</td>
              <td>Edy001</td>
              <td>750.000</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default HistoriTransaksiToko;
