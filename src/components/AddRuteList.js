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
    try {
      let myurl = `${global.config.base_url}/toko`;
      if (query) {
        myurl += `?q=${query}`;
      }
      const response = await fetch(myurl);
      const data = await response.json();
      console.log('get toko', data);
      setToko(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addSelectedToko = (item) => {
    console.log('curtoko', selectedToko);
    console.log('additem', item);
    setToko([...toko, item]);

    const newToko = {
      id_rute: id,
      id_toko: item.id,
    }

    navigate(`/master_rute_list/${id}`);
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
      <div>
          <span className="is-size-6">
            Pilih Toko utk ditambahkan ke 
            rute <strong>{infoRute.nama_rute}</strong>
            , hari <strong>{fn.ucase(fn.getNamaHari(infoRute.hari))}</strong>
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
