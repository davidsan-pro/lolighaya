import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import { Button, Spinner } from "react-bootstrap";
import * as fn from "../MyFunctions";
import SearchBar from "./SearchBar";
import DisplayAddRuteList from "./DisplayAddRuteList";

const AddRuteList = () => {
  const [toko, setToko] = useState([]);
  const [selectedToko, setSelectedToko] = useState([]);
  const [infoRute, setInfoRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams({});

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // id rute
  console.log('add rute list', id);

  useEffect(() => {
    getInfoRute();
    getListToko();
  }, []);

  const getInfoRute = async () => {
    const myurl = `${fn.getBaseUrl()}/Mrute?qf[]=id&qv[]=${id}&qmode[]=exact`;
    // console.log('get info rute url', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('get info rute data', data);
    if (data.length > 0) {
      setInfoRute(data[0]);
    }
  }

  const getListToko = async (query = "") => {
    setIsLoading(true);

    let myurl = `${fn.getBaseUrl()}/toko`;
    let qsArr = [];
    qsArr.push(`qf_not_in[]=id_rute&qv_not_in[]=${id}`);
    if (query) {
      qsArr.push(`q=${query}`);
    }
    if (qsArr.length > 0) {
      const qs = qsArr.join('&');
      myurl += `?${qs}`;
    }
    // console.log('get toko url', myurl);
    const response = await fetch(myurl);
    const result = await response.json();
    // console.log('get toko', result);
    setToko(result.data);

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
    console.log('new toko', newRuteToko);
    const myurl = `${fn.getBaseUrl()}/Drute`;
    console.log('myurl', myurl);
    await fetch(myurl, {
      method: 'POST',
      body: JSON.stringify(newRuteToko),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(res => {
        console.log('addselectedtoko res', res);
        const backURL = searchParams.get('back_url') || `/rute_list_toko/${id}`;
        console.log('backurlasd1', backURL);
        if (parseInt(res.status) === 201) {
          navigate(backURL);
        } else {
          console.log('errmsg', res.messages);
        }
      })
      .catch(err => console.log('errorasd1', err));

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

  const currentURL = location.pathname + location.search;

  return (
    <div className="container">
      <div className="is-flex is-justify-content-space-between">
        <div className="me-2">
        <SearchBar onSearch={getListToko} keywordType="nama toko"/>
        </div>
        <Link to={`/add_toko?back_url=${currentURL}`}>
          <Button style={{ whiteSpace:"nowrap" }}>Toko Baru</Button>
        </Link>
      </div>
      <div className="mb-2 fs-6">
        Pilih Toko utk ditambahkan ke rute <strong>{infoRute.nama_rute}</strong>
      </div>
      {isLoading 
        ? <Spinner animation="border" /> 
        : <DisplayAddRuteList 
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
