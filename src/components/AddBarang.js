import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as fn from "../MyFunctions";

const AddBarang = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");

  const navigate = useNavigate();

  const saveBarang = async (e) => {
    e.preventDefault();

    const barang = { nama, harga, stok };
    await fetch(`${fn.getBaseUrl()}/barang`, {
      method: 'POST',
      body: JSON.stringify(barang),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // setelah selesai, redirect ke hal.master barang
    navigate("/master_barang");
  };

  return (
    <div className="container">
      <form onSubmit={saveBarang}>
        <div className="field">
          <label className="label">Nama</label>
          <input type="text" 
            className="input" 
            placeholder="nama barang" 
            value={nama} 
            onChange={(e) => setNama(e.target.value)} 
          />
        </div>
        <div className="field">
          <label className="label">harga</label>
          <input type="text" 
            className="input" 
            placeholder="harga barang" 
            value={harga} 
            onChange={(e) => setHarga(e.target.value)} 
          />
        </div>
        <div className="field">
          <label className="label">Stok</label>
          <input type="text" 
            className="input" 
            placeholder="stok barang" 
            value={stok} 
            onChange={(e) => setStok(e.target.value)} 
          />
        </div>
        <div className="field">
          <Button variant="primary" type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  );
};

export default AddBarang;
