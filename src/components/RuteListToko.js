import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
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

  useEffect(() => {
    getInfoRute();
    getDRuteById();
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
  };

  const getDRuteById = async (query = "") => {
    setIsLoading(true);
    let myurl = `${global.config.base_url}/Drute?qf=id_rute&qv=${id}`;
    if (query) {
      myurl += location.search ? "?" : "&";
      myurl += `q=${query}`;
    }
    console.log("get drute by id", myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log("data drute", data);
    setDRute(data);
    setIsLoading(false);
  };

  const deleteRuteToko = (id, string) => {
    const hariRute = fn.ucase(fn.getNamaHari(infoRute.hari));
    const strConfirm = `Data [${string}] akan dihapus dari daftar Rute ${infoRute.nama_rute} utk hari ${hariRute}. Lanjutkan?`;
    if ( ! window.confirm(strConfirm)) {
      return false;
    }
  }

  return (
    <div>
      <SearchBar onSearch={getDRuteById} keywordType="nama toko" />
      <div className="is-flex is-justify-content-space-between">
        <div className="me-3 mb-3">
          <span className="is-size-6">
            Rute <strong>{infoRute.nama_rute}</strong>
            , hari <strong>{fn.ucase(fn.getNamaHari(infoRute.hari))}</strong>
          </span>
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
