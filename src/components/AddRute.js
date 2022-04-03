import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const AddRute = () => {
  const [namaRute, setNamaRute] = useState("");
  const [senin, setSenin] = useState(false);
  const [selasa, setSelasa] = useState(false);
  const [rabu, setRabu] = useState(false);
  const [kamis, setKamis] = useState(false);
  const [jumat, setJumat] = useState(false);
  const [sabtu, setSabtu] = useState(false);
  const [minggu, setMinggu] = useState(false);
  // const [harga, setHarga] = useState("");
  // const [stok, setStok] = useState("");

  const navigate = useNavigate();

  const saveRute = async (e) => {
    e.preventDefault();

    const formData = { namaRute };
    let hari = [];
    if (senin) {
      hari.push(1);
    }
    if (selasa) {
      hari.push(2);
    }
    if (rabu) {
      hari.push(3);
    }
    if (kamis) {
      hari.push(4);
    }
    if (jumat) {
      hari.push(5);
    }
    if (sabtu) {
      hari.push(6);
    }
    if (minggu) {
      hari.push(7);
    }
    formData['hari'] = hari;
    console.log('formdata', formData);
    // const barang = { nama, harga, stok };
    // await fetch(`${global.config.base_url}/barang`, {
    //   method: 'POST',
    //   body: JSON.stringify(barang),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // // setelah selesai, redirect ke hal.master barang
    // navigate("/master_barang");
  };

  return (
    <div className="container">
      <form obSubmit={saveRute}>
        <div className="field">
          <label className="label">Nama Rute</label>
          <input type="text" className="input" placeholder="nama rute" value={namaRute} onChange={(e) => setNamaRute(e.target.value)} />
        </div>
        <div className="field">
          <label class="checkbox">
            <input type="checkbox" title="Senin" className="me-2" value={senin} onChange={(e) => setSenin(e.target.value)} />
            Senin
          </label>
        </div>
        <div className="field">
          <label class="checkbox">
            <input type="checkbox" title="Selasa" className="me-2" value={selasa} onChange={(e) => setSelasa(e.target.value)} />
            Selasa
          </label>
        </div>
        <div className="field">
          <label class="checkbox">
            <input type="checkbox" title="Rabu" className="me-2" value={rabu} onChange={(e) => setRabu(e.target.value)} />
            Rabu
          </label>
        </div>
        <div className="field">
          <label class="checkbox">
            <input type="checkbox" title="Kamis" className="me-2" value={kamis} onChange={(e) => setKamis(e.target.value)} />
            Kamis
          </label>
        </div>
        <div className="field">
          <label class="checkbox">
            <input type="checkbox" title="Jumat" className="me-2" value={jumat} onChange={(e) => setJumat(e.target.value)} />
            Jumat
          </label>
        </div>
        <div className="field">
          <label class="checkbox">
            <input type="checkbox" title="Sabtu" className="me-2" value={sabtu} onChange={(e) => setSabtu(e.target.value)} />
            Sabtu
          </label>
        </div>
        <div className="field">
          <label class="checkbox">
            <input type="checkbox" title="Minggu" className="me-2" value={minggu} onChange={(e) => setMinggu(e.target.value)} />
            Minggu
          </label>
        </div>
        <hr />
        <div className="field">
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRute;
