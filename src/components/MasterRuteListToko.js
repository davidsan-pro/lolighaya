import { useState, useEffect } from "react";
import DisplayListRuteToko from "./DisplayListRuteToko";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";
import * as fn from "../MyFunctions";

const listHari = []
const MasterRuteListToko = () => {
  const [dRute, setDRute] = useState([]);
  const [infoRute, setInfoRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getInfoRute();
    getDRuteById();
  }, []);

  const getInfoRute = async () => {
    const myurl = `${fn.getBaseUrl()}/Mrute?qf[]=id&qv[]=${id}&qmode=exact`;
    // console.log('get info rute url', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('get info rute data', data);
    if (data.length > 0) {
      setInfoRute(data[0]);
    }
  }

  const getDRuteById = async (query='') => {
    setIsLoading(true);
    let myurl = `${fn.getBaseUrl()}/Drute?qf=id_rute&qv=${id}`;
    if (query) {
      myurl += location.search ? '?' : '&';
      myurl += `q=${query}`;
    }
    console.log('get drute by id', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('data drute', data);
    setDRute(data);
    setIsLoading(false);
  };

  const deleteDRute = async (id, string) => {
    const hariRute = fn.ucase(fn.getNamaHari(infoRute.hari));
    const strConfirm = `Data [${string}] akan dihapus dari daftar Rute ${infoRute.nama_rute} utk hari ${hariRute}. Lanjutkan?`;
    if ( ! window.confirm(strConfirm)) {
      return false;
    }

    const myurl = `${fn.getBaseUrl()}/Drute/${id}`;
    await fetch(myurl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          fn.showToastMsg(res.messages.success);
        } else {
          fn.showToastMsg('Gagal menghapus data rute', 'error');
        }
      })
      .catch(err => {
        fn.showToastMsg('Gagal menghapus data rute', 'error');
      })
      .finally(() => {
        getDRuteById();
      });
  };

  return (
    <div>
      <SearchBar onSearch={getDRuteById} keywordType="nama toko" />
      <div className="is-flex is-align-content-space-between">
        <div className="me-3 mb-3">
          <strong className="is-size-4">Daftar Toko</strong>
          <br />
          {/* {console.log('info rute', infoRute)} */}
          <span className="is-size-6">
            Rute <strong>{infoRute.nama_rute}</strong>
            , hari <strong>{fn.ucase(fn.getNamaHari(infoRute.hari))}</strong>
          </span>
        </div>
        <div>
          <Link to={`/add_rute_list/${id}`} className="button is-primary">
            Tambah Data
          </Link>
        </div>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListRuteToko toko={dRute} onDelete={deleteDRute} />}
    </div>
  );
};

export default MasterRuteListToko;
