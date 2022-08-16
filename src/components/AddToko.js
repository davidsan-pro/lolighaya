import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
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

  let prev = localStorage.getItem('prev') || '';
  // console.log('prev', prev);
  // prev = JSON.parse(prev);
  prev = fn.ltrim(prev, '/');
  // const backURL = searchParams.get('back_url') || '/master_toko';
  let backURL = searchParams.get('back_url') || `${prev}` || 'master_toko';
  backURL = `/${backURL}`;
  // console.log('backurl', backURL);
  let formMsg = '';
  for (const entry of searchParams.entries()) {
    console.log('entry', entry);
  }

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

        // setelah proses selesai dgn sukses, kembali ke hal.sblmnya
        navigate(backURL);
      }
    })
    .catch(err => {
      formMsg = 'Gagal menambahkan data toko baru.';
      console.log('error', err);
    });
  };

  return (
    <div className="container">
      <form onSubmit={saveToko}>
        {/* <div className="field">
          <label className="label">Nama</label>
          <input type="text" className="input" placeholder="nama toko" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div> */}
        <div className="mb-4">
          <Form.Group className="mb-2" controlId="field_nama">
            <Form.Label>Nama Toko</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Nama toko. cth: Toko Sinar Terang" 
            value={nama} 
            onChange={(e) => setNama(e.target.value)}
            />
            <span className="errmsg" id="err-fld-nama"></span>
          </Form.Group>
          <Form.Group className="mb-2" controlId="field_alamat">
            <Form.Label>Alamat Lengkap</Form.Label>
            <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Alamat toko. cth: Jalan Sudirman no.123" 
            value={alamat} 
            onChange={(e) => setAlamat(e.target.value)}
            />
            <span className="errmsg" id="err-fld-alamat"></span>
          </Form.Group>
          <Form.Group className="mb-2" controlId="field_telepon">
            <Form.Label>Telepon</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Nomor telepon. cth: 8123456789" 
            value={telepon} 
            onChange={(e) => setTelepon(e.target.value)}
            />
            <span className="errmsg" id="err-fld-telepon"></span>
          </Form.Group>
          <Form.Group className="mb-2" controlId="field_kota">
            <Form.Label>Kota</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Kota lokasi toko. cth: Surabaya" 
            value={kota} 
            onChange={(e) => setKota(e.target.value)}
            />
            <span className="errmsg" id="err-fld-kota"></span>
          </Form.Group>
          <Form.Group className="mb-2" controlId="field_kecamatan">
            <Form.Label>
              <span className="me-1">Kecamatan</span>
              <small className="fst-italic">(opsional)</small>
            </Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Kecamatan lokasi toko. cth: Rungkut" 
            value={kecamatan} 
            onChange={(e) => setKecamatan(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Simpan
          </Button>
        </div>
        <div className="field errmsg">{formMsg}</div>
      </form>
    </div>
  );
};

export default AddToko;
