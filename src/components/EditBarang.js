import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

const EditBarang = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  console.log('id', id);

  const updateBarang = async (e) => {
    e.preventDefault();

    const barang = { nama, harga, stok };
    await fetch(`${global.config.base_url}/barang/${id}`, {
      method: 'PUT',
      body: JSON.stringify(barang),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    navigate("/master_barang");
  };

  useEffect(() => {
    getBarangById();
  }, []);

  const getBarangById = async () => {
    const response = await fetch(`${global.config.base_url}/barang/${id}`);
    console.log('response', response);
    const data = response.json();
    console.log('data', data);
    setNama(data.nama);
    setHarga(data.harga);
    setStok(data.stok);
    console.log(data.nama);
  };

  return (
    <div className="container">
      <form onSubmit={updateBarang}>
        <div className="field">
          <label className="label">Nama</label>
          <input type="text" className="input" placeholder="nama barang" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Harga</label>
          <input type="text" className="input" placeholder="harga barang" value={harga} onChange={(e) => setHarga(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Stok</label>
          <input type="text" className="input" placeholder="stok barang" value={stok} onChange={(e) => setStok(e.target.value)} />
        </div>
        <Button variant="primary" type="submit">Update</Button>
      </form>
    </div>
  );
};

export default EditBarang;
