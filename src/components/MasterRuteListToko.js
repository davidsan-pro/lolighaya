import { useState, useEffect } from "react";
import DisplayListRuteToko from "./DisplayListRuteToko";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";

const MasterRuteListToko = () => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTokoById();
  }, []);

  const getTokoById = async (query='') => {
    setIsLoading(true);
    let myurl = `${global.config.base_url}/drute?qf=id_rute&qv=${id}`;
    if (query) {
      myurl += location.search ? '?' : '&';
      myurl += `q=${query}`;
    }
    console.log("url", myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log("data", data);
    setToko(data);
    setIsLoading(false);
  };

  const deleteToko = async (id) => {
    if ( ! window.confirm('Data akan dihapus. Lanjutkan?')) {
      return false;
    }

    // const myurl = `${global.config.base_url}/toko/${id}`;
    // await fetch(myurl, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // getToko();
  };

  return (
    <div>
      <SearchBar onSearch={getTokoById} keywordType="nama toko" />
      <div className="is-flex is-align-content-space-between">
        <div className="me-3 mb-3">
          <strong className="is-size-4">Daftar Toko</strong>
          <br />
          <strong className="is-size-6">Rute SEMAMPIR hari SELASA</strong>
        </div>
        <div>
          <Link to="/" className="button is-primary">
            Tambah Data
          </Link>
        </div>
      </div>
      {console.log('asd', toko)}
      {isLoading ? <Spinner animation="border" /> : <DisplayListRuteToko toko={toko} onDelete={deleteToko}/>}
    </div>
  );
};

export default MasterRuteListToko;
