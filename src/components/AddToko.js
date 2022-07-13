import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as fn from "../MyFunctions";

const AddToko = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [foto, setFoto] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota, setKota] = useState("");
  const [searchParams] = useSearchParams({});

  const navigate = useNavigate();

  const backURL = searchParams.get('back_url') || '/master_toko';
  let formMsg = '';

  const saveToko = async (e) => {
    e.preventDefault();

    const toko = { nama, alamat, foto, kecamatan, kota, telepon };
    await fetch(`${fn.getBaseUrl()}/toko`, {
      method: 'POST',
      body: JSON.stringify(toko),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(res => {
      if (res.status === 201) {
        fn.showToastMsg(`Berhasil menambahkan data toko [${nama}]`);
      }
    })
    .catch(err => {
      formMsg = 'Gagal menambahkan data toko baru.';
      console.log('error', err);
    });

    // setelah selesai, redirect ke hal.master toko
    navigate(backURL);
  };

  return (
    <div className="container">
      <div className="mb-2">Masukkan detail data toko baru</div>
      <form onSubmit={saveToko}>
        <div className="field">
          <label className="label">Nama</label>
          <input type="text" className="input" placeholder="nama toko" value={nama} onChange={(e) => setNama(e.target.value)} />
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
        <div className="field fst-italic text-danger">{formMsg}</div>
        <div className="field">
          <Button variant="primary" type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  );
};

export default AddToko;
