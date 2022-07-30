import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import * as fn from "../MyFunctions";
import SearchBar from "./SearchBar";
import DisplayDashboardRuteListToko from "./DisplayDashboardRuteListToko";

const RuteListToko = () => {
  const [dRute, setDRute] = useState([]);
  const [infoRute, setInfoRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams({});

  const { id } = useParams();
  console.log('rutelisttoko', id);
  // let myCart = localStorage.getItem('cartList');
  // console.log(new Date());

  const navigate = useNavigate();
  const backURL = searchParams.get('back_url') || `/rute_list_toko/${infoRute.id}`;

  useEffect(async () => {
    getInfoRute();
    getDRuteById();
  }, []);

  const getInfoRute = async () => {
    let myurl = `${fn.getBaseUrl()}/Mrute`;
    let qsArr = [];
    qsArr.push(`qf[]=id&qv[]=${id}&qmode[]=exact`);
    if (qsArr.length > 0) {
      const qs = qsArr.join('&');
      myurl += `?${qs}`;
    }
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
    let myurl = `${fn.getBaseUrl()}/Drute`;
    let qsArr = [];
    qsArr.push(`qf[]=id_rute&qv[]=${id}&qmode[]=exact`);
    if (query) {
      qsArr.push(`q=${query}`);
    }
    if (qsArr.length > 0) {
      const qs = qsArr.join('&');
      myurl += `?${qs}`;
    }
    console.log("get drute by id", myurl);
    const response = await fetch(myurl);
    const result = await response.json();
    console.log("data drute", result);
    setDRute(result.data);
    setIsLoading(false);
  };

  // id = id rute
  // string = nama toko
  const deleteTokoFromRute = async (id, string) => {
    // console.log('delete from inforute', infoRute);
    // const hariRute = fn.ucase(fn.getNamaHari(infoRute.hari));
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
        navigate(backURL);
      })
      .catch(err => console.log(err));
  }



  return (
    <div className="container">
      <div className="fs-5 text-center">
        Rute [<span className="fw-bold">{infoRute.nama_rute}</span>]
      </div>
      <SearchBar onSearch={getDRuteById} keywordType="nama toko" />
      <div className="is-flex is-justify-content-space-between is-align-items-baseline mb-2">
        <div className="me-3 mb-3 is-size-6">
          {
            dRute.length > 0 ? <span>( 0/{parseInt(infoRute.jum_toko|0)} Toko)</span> : ""
          }
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
        : <DisplayDashboardRuteListToko dRute={dRute} onDelete={deleteTokoFromRute} />
      }
    </div>
  );
};

export default RuteListToko;
