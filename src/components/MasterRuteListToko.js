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
  const [namaRute, setNamaRute] = useState('');
  const [namaHari, setNamaHari] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getInfoRute();
    getDRuteById();
  }, []);

  const getInfoRute = async () => {
    const myurl = `${global.config.base_url}/mrute/${id}`;
    console.log('get info rute url', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log('get info rute data', data);
    setInfoRute(data);
    if (data.length > 0) {
      setNamaRute(data[0].nama_rute);
      setNamaHari(fn.getNamaHari(data[0].hari));
    }
  }

  const getDRuteById = async (query='') => {
    setIsLoading(true);
    let myurl = `${global.config.base_url}/drute?qf=id_rute&qv=${id}`;
    if (query) {
      myurl += location.search ? '?' : '&';
      myurl += `q=${query}`;
    }
    const response = await fetch(myurl);
    const data = await response.json();
    setDRute(data);
    setIsLoading(false);
  };

  const deleteDRute = async (id, string) => {
    if ( ! window.confirm(`Data Rute utk [${string}] akan dihapus. Lanjutkan?`)) {
      return false;
    }

    const myurl = `${global.config.base_url}/drute/${id}`;
    await fetch(myurl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getDRuteById();
  };

  return (
    <div>
      <SearchBar onSearch={getDRuteById} keywordType="nama toko" />
      <div className="is-flex is-align-content-space-between">
        <div className="me-3 mb-3">
          <strong className="is-size-4">Daftar Toko</strong>
          <br />
          <span className="is-size-6">
            Rute <strong>{infoRute.nama_rute}</strong>
            , hari <strong>{fn.ucase(infoRute.hari)}</strong>
          </span>
        </div>
        <div>
          <Link to={`/add_rute_list/${id}`} className="button is-primary">
            Tambah Data
          </Link>
        </div>
      </div>
      {/* {console.log('asd', toko)} */}
      {isLoading ? <Spinner animation="border" /> : <DisplayListRuteToko toko={dRute} onDelete={deleteDRute} />}
    </div>
  );
};

export default MasterRuteListToko;
