import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import * as fn from "../MyFunctions";
import SearchBar from "./SearchBar";
import DisplayMasterEditRuteListToko from "./DisplayMasterEditRuteListToko";

const MasterEditRuteListToko = () => {
  const [dRute, setDRute] = useState([]);
  const [infoRute, setInfoRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams(); // id rute
  console.log('mastereditrutelisttoko', id);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    getInfoRute(id);
    getDRuteById(id);
  }, []);

  const getInfoRute = async () => {
    let myurl = `${fn.getBaseUrl()}/Mrute`;
    let qsArr = [];
    qsArr.push(`qf[]=id&qv[]=${id}&qmode[]=exact`);
    if (qsArr.length > 0) {
      const qs = qsArr.join('&');
      myurl += `?${qs}`;
    }
    console.log('getinforute', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log('inforute', data);
    if (data.length > 0) {
      setInfoRute(data[0]);
    }
  };

  const getDRuteById = async (id, query = "") => {
    setIsLoading(true);
    let myurl = `${fn.getBaseUrl()}/Drute`;
    let qsArr = [];
    qsArr.push(`qf[]=id&qv[]=${id}&qmode[]=exact`);
    if (qsArr.length > 0) {
      const qs = qsArr.join('&');
      myurl += `?${qs}`;
    }
    console.log("getdrutebyid", myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log("datadrute", data);
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

    const myurl = `${fn.getBaseUrl()}/Drute/${id}`;
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
    <div className="container">
      <SearchBar onSearch={getDRuteById} keywordType="nama toko" />
      <div className="is-flex is-justify-content-space-between">
        <div className="me-3 mb-3 is-size-6">
          <span className="me-2">Rute <strong>{infoRute.nama_rute}</strong></span>
          <span>( 0/{parseInt(infoRute.jum_toko|0)} Toko)</span>
        </div>
        <div>
          <Link to={`/add_rute_list/${id}`}>
            <Button variant="primary">Tambah Toko</Button>
          </Link>
        </div>
      </div>
      {
        isLoading 
        ? <Spinner animation="border" /> 
        // : <div>Hello World</div>
        : <DisplayMasterEditRuteListToko dRute={dRute} onDelete={deleteRuteToko} />
      }
    </div>
  );
};

export default MasterEditRuteListToko;
