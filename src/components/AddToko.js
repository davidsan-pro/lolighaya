import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const AddToko = () => {
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
      <form onSubmit={saveToko}>
      <div className="field">
          <label className="label">Nama</label>
          <input type="text" className="input" placeholder="nama barang" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Alamat</label>
          <input type="text" className="input" placeholder="alamat lengkap" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Telepon</label>
          <input type="text" className="input" placeholder="nomor telepon" value={telepon} onChange={(e) => setTelepon(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Kecamatan</label>
          <input type="text" className="input" placeholder="kecamatan" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Kota</label>
          <input type="text" className="input" placeholder="kota" value={kota} onChange={(e) => setKota(e.target.value)} />
        </div>
        <div className="field">
          <Button variant="primary" type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  );
};

export default AddToko;
