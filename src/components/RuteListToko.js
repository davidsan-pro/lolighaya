import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import * as fn from "../MyFunctions";
import SearchBar from "./SearchBar";
import DisplayDashboardRuteListToko from "./DisplayDashboardRuteListToko";

const RuteListToko = () => {
  const [dRute, setDRute] = useState([]);
  const [infoRute, setInfoRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const location = useLocation();
  // console.log("rutelisttoko", id);

  const navigate = useNavigate();

  useEffect(() => {
    getInfoRute();
    getDRuteById();
  }, []);

  const getInfoRute = async () => {
    const myurl = `${global.config.base_url}/Mrute?qf=id&qv=${id}&qmode=exact`;
    // console.log('get info rute url', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('get info rute data', data[0]);
    if (data.length > 0) {
      setInfoRute(data[0]);
    }
  };

  const getDRuteById = async (query = "") => {
    setIsLoading(true);
    let myurl = `${global.config.base_url}/Drute?qf=id_rute&qv=${id}`;
    if (query) {
      myurl += location.search ? "?" : "&";
      myurl += `q=${query}`;
    }
    // console.log("get drute by id", myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log("data drute", data);
    setDRute(data);
    setIsLoading(false);
  };

  const deleteRuteToko = async (id, string) => {
    // console.log('delete from inforute', infoRute);
    const hariRute = fn.ucase(fn.getNamaHari(infoRute.hari));
    const strConfirm = `Data [${string}] akan dihapus dari daftar Rute ${infoRute.nama_rute}. Lanjutkan?`;
    if ( ! window.confirm(strConfirm)) {
      return false;
    }

    const myurl = `${global.config.base_url}/Drute/${id}`;
    await fetch(myurl, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((res) => {
        // console.log('res delete drute', res);
        // setelah selesai, redirect ke hal.master rute
        navigate(`/rute_list_toko/${infoRute.id}`);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <SearchBar onSearch={getDRuteById} keywordType="nama toko" />
      <div className="is-flex is-justify-content-space-between">
        <div className="me-3 mb-3 is-size-6">
          <span className="me-2">Rute <strong>{infoRute.nama_rute}</strong></span>
          <span>( 0/{parseInt(infoRute.jum_toko|0)} Toko)</span>
        </div>
        <div>
          <Link to={`/add_rute_list/${id}`}>
            <Button variant="primary">Tambah Data</Button>
          </Link>
        </div>
      </div>
      {
        isLoading 
        ? <Spinner animation="border" /> 
        : <DisplayDashboardRuteListToko dRute={dRute} onDelete={deleteRuteToko} />
      }
    </div>
  );
};

export default RuteListToko;
