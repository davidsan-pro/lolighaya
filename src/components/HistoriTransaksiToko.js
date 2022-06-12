import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const HistoriTransaksiToko = () => {
  const [toko, setToko] = useState({});
  const [trx, setTrx] = useState([]);
  // const [nama, setNama] = useState("");
  // const [alamat, setAlamat] = useState("");
  // const [telepon, setTelepon] = useState("");
  // const [foto, setFoto] = useState("");
  // const [kecamatan, setKecamatan] = useState("");
  // const [kota, setKota] = useState("");

  const { id } = useParams(); // id toko

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

  const getTokoById = async () => {
    const response = await fetch(`${global.config.base_url}/toko/${id}`);
    const data = await response.json();
    console.log('data toko', data);
    setToko(data);
    // setNama(data.nama);
    // setAlamat(data.alamat);
    // setTelepon(data.telepon);
    // setKecamatan(data.kecamatan);
    // setKota(data.kota);
    // setFoto(data.foto);
  };

  const getHistoriTransaksi = async () => {
    let myurl = `${global.config.base_url}/Mtransaksi
      ?qf=id_toko&qv=${idToko}`;
    const response = await fetch(myurl);
    const data = await response.json();
    console.log('data trx', data);
    setTrx(data);
  }

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
