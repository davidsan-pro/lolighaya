import { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import * as fn from "../MyFunctions";
import SearchBar from "./SearchBar";
import DisplayMasterEditRute from "./DisplayMasterEditRute";

const MasterEditRute = () => {
  const [dRute, setDRute] = useState([]);
  const [infoRute, setInfoRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams(); // id rute
  console.log('mastereditrute', id);
  const location = useLocation();

  const loginData = fn.getCurrentLogin();

  const navigate = useNavigate();

  useEffect(() => {
    getInfoRute();
    getDRuteById();
  }, []);

  // dapatkan data utama utk rute ini
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

  // dapatkan list toko yg ada di rute ini
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
    console.log("getdrutebyid", myurl);
    const response = await fetch(myurl);
    const result = await response.json();
    console.log("datadrute", result);
    setDRute(result.data);
    setIsLoading(false);
  };

  // func.utk hapus toko dari rute
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
      .catch(err => console.log('error1', err));
  }

  const deleteTokoFromRute = async (id, string) => {
    // console.log('delete from toko', infoRute);
    let mode = parseInt(loginData.level|0) === 1 ? 'hapus' : 'menunggu_hapus';
    const strConfirm = mode === 'hapus'
      ? `Data Toko [${string}] akan dihapus dari rute [${infoRute.nama_rute}]. Lanjutkan?`
      : `Data Toko [${string}] akan dihapus dari rute [${infoRute.nama_rute}] (tunggu disetujui oleh admin). Lanjutkan?`
      ;
    if ( ! window.confirm(strConfirm)) {
      return false;
    }

    const myurl = `${fn.getBaseUrl()}/Drute/${id}`;
    if (mode === 'hapus') {
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
        .catch(err => console.log('error2', err));
    } else if (mode === 'menunggu_hapus') {
      const upd_data = {
        status: mode,
      }
      await fetch(`${fn.getBaseUrl()}/Drute/${id}`, {
        method: 'PUT',
        body: JSON.stringify(upd_data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(res => {
        console.log('res', res);
        if (res.status === 200) {
          // fn.showToastMsg(`Berhasil update data toko [${nama}]`);
        }
      });
    }
  }

  return (
    <div>
      <div className="text-center mb-2 fs-5">
        <span className="me-2">Rute <strong>{infoRute.nama_rute}</strong></span>
      </div>
      <div className="is-flex is-justify-content-space-between is-align-items-baseline mb-2">
        <div className="me-2">
          <SearchBar onSearch={getDRuteById} keywordType="nama toko" />
        </div>
        <div>
          <Link to={`/add_rute_list/${id}?back_url=/`}>
            <Button variant="primary" style={{ whiteSpace:"nowrap" }}>Tambah Toko</Button>
          </Link>
        </div>
      </div>
      {
        isLoading 
        ? <Spinner animation="border" /> 
        // : <div>Hello World</div>
        : <DisplayMasterEditRute dRute={dRute} onDelete={deleteRuteToko} />
      }
    </div>
  );
};

export default MasterEditRute;
