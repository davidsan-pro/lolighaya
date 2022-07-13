import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as fn from "../MyFunctions";

const EditToko = () => {
  // console.log('edit toko');
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [foto, setFoto] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kota, setKota] = useState("");
  const [searchParams] = useSearchParams({});

  let backURL = searchParams.get('back_url') || "/master_toko";

  const navigate = useNavigate();
  const { id } = useParams();

  const updateToko = async (e) => {
    e.preventDefault();

    const toko = { nama, alamat, foto, kecamatan, kota, telepon };
    await fetch(`${fn.getBaseUrl()}/toko/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toko),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(res => {
      if (res.status === 200) {
        fn.showToastMsg(`Berhasil update data toko [${nama}]`);
        navigate(backURL);
      }
    });

  };

  useEffect(() => {
    getTokoById();
  }, []);

  const getTokoById = async () => {
    // console.log('gettokobyid', id);
    const response = await fetch(`${fn.getBaseUrl()}/toko/${id}`);
    const data = await response.json();
    // console.log('data', data);
    setNama(data.nama);
    setAlamat(data.alamat);
    setTelepon(data.telepon);
    setKecamatan(data.kecamatan);
    setKota(data.kota);
    setFoto(data.foto);
  };

  return (
    <div className="container">
      <form onSubmit={updateToko}>
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
        <Button variant="primary" type="submit">Update</Button>
      </form>
    </div>
  );
};

export default EditToko;
