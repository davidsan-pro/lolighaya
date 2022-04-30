import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import * as fn from "../MyFunctions";
import SearchBar from "./SearchBar";
import DisplayListAddRuteToko from "./DisplayListAddRuteToko";

const AddRuteList = () => {
  const [toko, setToko] = useState([]);
  const [selectedToko, setSelectedToko] = useState([]);
  const [infoRute, setInfoRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getInfoRute();
    getToko();
  }, []);

  const getInfoRute = async () => {
    const myurl = `${global.config.base_url}/Mrute?qf=id&qv=${id}&qmode=exact`;
    // console.log('get info rute url', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('get info rute data', data);
    if (data.length > 0) {
      setInfoRute(data[0]);
    }
  }

  const getToko = async (query = "") => {
    setIsLoading(true);

    let myurl = `${global.config.base_url}/toko`;
    if (query) {
      myurl += `?q=${query}`;
    }
    let separator = myurl.indexOf('?') > 0 ? '&' : '?';
    myurl += `${separator}qt_not_in=rute`;
    // console.log('get toko url', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('get toko', data);
    setToko(data);

    setIsLoading(false);
  };

  const addSelectedToko = async (item) => {
    console.log('curtoko', selectedToko);
    console.log('additem', item);
    // setToko([...toko, item]);

    const newRuteToko = {
      id_rute: id,
      id_toko: item,
    }
    // console.log('new toko', newRuteToko);
    const myurl = `${global.config.base_url}/Drute`;
    // console.log('myurl', myurl);
    await fetch(myurl, {
      method: 'POST',
      body: JSON.stringify(newRuteToko),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    navigate(`/rute_list_toko/${id}`);
  }

  const saveRuteToko = async (e) => {
    e.preventDefault();

    console.log('save', toko);
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
      <SearchBar onSearch={getToko} keywordType="nama toko"/>
      <div className="mb-2">
          <span className="is-size-6">
            Pilih Toko utk ditambahkan ke 
            rute <strong>{infoRute.nama_rute}</strong>
          </span>
      </div>
      {isLoading 
        ? <Spinner animation="border" /> 
        : <DisplayListAddRuteToko 
            toko={toko} 
            idRute={id}
            selectedToko={selectedToko} 
            onSelect={addSelectedToko} 
            onSubmit={saveRuteToko} 
          />
      }
    </div>
  );
};

export default AddRuteList;
