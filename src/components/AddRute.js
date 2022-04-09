import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as fn from "../MyFunctions";

const listHari = [
  { nama: 'senin', nomor: 1 },
  { nama: 'selasa', nomor: 2 },
  { nama: 'rabu', nomor: 3 },
  { nama: 'kamis', nomor: 4 },
  { nama: 'jumat', nomor: 5 },
  { nama: 'sabtu', nomor: 6 },
  { nama: 'minggu', nomor: 7 },
];

const AddRute = () => {
  const [pilihHari, setPilihHari] = useState([]);

  const [checkedState, setCheckedState] = useState(
    new Array(listHari.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    let selected = [];
    updatedCheckedState.map((item, index) => {
      // console.log('updated', item, index, listHari[index].nomor);
      if (item) {
        selected.push(listHari[index].nomor);
      }
    });

    setPilihHari(selected);
  };

  const [namaRute, setNamaRute] = useState("");
  const [errNamaRute, setErrNamaRute] = useState("");
  const [errHariRute, setErrHariRute] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    let flag = true;

    setErrNamaRute("");
    setErrHariRute("");

    if (!namaRute) {
      setErrNamaRute("Nama Rute harus diisi");
      flag = false;
    }
    // if (!senin && !selasa && !rabu && !kamis && !jumat && !sabtu && !minggu) {
    if (!pilihHari) {
      setErrHariRute("Pilih minimal 1 hari");
      flag = false;
    }

    return flag; // true = valid, false = not valid
  };

  const saveRute = async (e) => {
    e.preventDefault();

    validateForm();

    let formData = { nama_rute:namaRute };
    formData['hari'] = pilihHari
    console.log("formdata", formData);
    // const barang = { nama, harga, stok };
    await fetch(`${global.config.base_url}/MRute`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // setelah selesai, redirect ke hal.master rute
    navigate("/master_rute");
  };

  return (
    <div className="container">
      <form onSubmit={saveRute}>
        <div className="field">
          <label className="label">Nama Rute</label>
          <input type="text" className="input" placeholder="nama rute" value={namaRute} onChange={(e) => setNamaRute(e.target.value)} />
          <div className="errmsg">{errNamaRute}</div>
        </div>
        {listHari.map(({nama, nomor}, index) => {
          return (
            <div className="field" key={index}>
              <label className="checkbox">
                <input 
                  type="checkbox" 
                  title="Senin" 
                  className="me-2" 
                  value={nomor} 
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)} 
                />
                {fn.ucasefirst(nama)}
              </label>
            </div>
            )
        })}
        {/* <div className="field">
          <label className="checkbox">
            <input type="checkbox" title="Senin" className="me-2" value={senin} onChange={(e) => setSenin(e.target.value)} />
            Senin
          </label>
        </div>
        <div className="field">
          <label className="checkbox">
            <input type="checkbox" title="Selasa" className="me-2" value={selasa} onChange={(e) => setSelasa(e.target.value)} />
            Selasa
          </label>
        </div>
        <div className="field">
          <label className="checkbox">
            <input type="checkbox" title="Rabu" className="me-2" value={rabu} onChange={(e) => setRabu(e.target.value)} />
            Rabu
          </label>
        </div>
        <div className="field">
          <label className="checkbox">
            <input type="checkbox" title="Kamis" className="me-2" value={kamis} onChange={(e) => setKamis(e.target.value)} />
            Kamis
          </label>
        </div>
        <div className="field">
          <label className="checkbox">
            <input type="checkbox" title="Jumat" className="me-2" value={jumat} onChange={(e) => setJumat(e.target.value)} />
            Jumat
          </label>
        </div>
        <div className="field">
          <label className="checkbox">
            <input type="checkbox" title="Sabtu" className="me-2" value={sabtu} onChange={(e) => setSabtu(e.target.value)} />
            Sabtu
          </label>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label className="checkbox">
            <input type="checkbox" title="Minggu" className="me-2" value={minggu} onChange={(e) => setMinggu(e.target.value)} />
            Minggu
          </label>
        </div> */}
        <div className="errmsg">{errHariRute}</div>
        <hr />
        <div className="field d-grid">
          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRute;
