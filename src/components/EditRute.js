import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import * as fn from "../MyFunctions";

const listHari = [
  { nama: "senin", nomor: 1, isChecked: false },
  { nama: "selasa", nomor: 2, isChecked: false },
  { nama: "rabu", nomor: 3, isChecked: false },
  { nama: "kamis", nomor: 4, isChecked: false },
  { nama: "jumat", nomor: 5, isChecked: false },
  { nama: "sabtu", nomor: 6, isChecked: false },
  { nama: "minggu", nomor: 7, isChecked: false },
];

const AddRute = () => {
  const [pilihHari, setPilihHari] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [namaRute, setNamaRute] = useState("");
  const [errNamaRute, setErrNamaRute] = useState("");
  const [errHariRute, setErrHariRute] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const [checkedState, setCheckedState] = useState(
    // new Array(listHari.length).fill(false)
    listHari
  );

  const handleOnChange = (position) => {
    // console.log("position", position);
    const updatedCheckedState = checkedState.map(
      (item, index) => {
        if (index === position) {
          item.isChecked = !item.isChecked;
        }
        return item;
      }
    );
    // console.log('updated', updatedCheckedState);

    setCheckedState(updatedCheckedState);

    getAllSelected();
  };

  const getAllSelected = () => {
    let selectedHari = [];
    let selectedID = [];
    checkedState.forEach((item, index) => {
      console.log('selected', index, item);
      if (item.isChecked) {
        selectedHari.push(listHari[index].nomor);
      }
    });
    // console.log('selected', selected);

    setPilihHari(selectedHari);
  }

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

  const updateRute = async (e) => {
    e.preventDefault();

    validateForm();

    let formData = { nama_rute: namaRute };
    formData["hari"] = pilihHari;
    console.log("formdata", formData);
    
    await fetch(`${global.config.base_url}/MRute/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('after put', res);
      });

    // setelah selesai, redirect ke hal.master rute
    navigate("/master_rute");
  };

  useEffect(() => {
    getRuteById();
  }, []);

  const getRuteById = async () => {
    setIsLoading(true);

    const myurl = `${global.config.base_url}/MRute/${id}`;
    const response = await fetch(myurl);
    const data = await response.json();
    // const data = [
    //   {id: "2", nama: "selasa", hari: "2"}, 
    //   {id: "4", nama: "kamis", hari: "4"}, 
    //   {id: "5", nama: "jumat", hari: "5"}
    // ];
    console.log("get data", data);
    setNamaRute(data[0].nama_rute);

    const tmp1 = checkedState.map((item, index) => {
      console.log("index", index);

      data.forEach(function (row) {
        const rowHari = row.hari - 1;
        if (index === rowHari && parseInt(row.status|0) > 0) {
          item.isChecked = true;
        }
        console.log("hari", rowHari, item.isChecked);
      });

      return item;
    });
    console.log("temp", tmp1);

    setCheckedState(tmp1);

    getAllSelected();

    setIsLoading(false);
  };

  return (
    <>
    {isLoading 
      ? <Spinner animation="border" /> 
      : <div className="container">
          <form onSubmit={updateRute}>
            <div className="field">
              <label className="label">Nama Rute</label>
              <input type="text" className="input" placeholder="nama rute" value={namaRute} onChange={(e) => setNamaRute(e.target.value)} />
              <div className="errmsg">{errNamaRute}</div>
            </div>
            {listHari.map(({ nama, nomor }, index) => {
              return (
                <div className="field" key={index}>
                  <label className="checkbox">
                    <input type="checkbox" title="Senin" className="me-2" value={nomor} checked={checkedState[index].isChecked} onChange={() => handleOnChange(index)} />
                    {fn.ucasefirst(nama)}
                  </label>
                </div>
              );
            })}
            
            <div className="errmsg">{errHariRute}</div>
            <hr />
            <div className="field d-grid">
              <Button variant="primary" type="submit" size="lg">
                Update
              </Button>
            </div>
          </form>
        </div>
      }
    </>
  )
};

export default AddRute;
