import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import DisplayListMasterRute from "./DisplayListMasterRute";
import { useLocation } from "react-router-dom";
import * as fn from "../MyFunctions";
// import AccordionItem from "react-bootstrap/esm/AccordionItem";
// import { ListGroup, Accordion } from "react-bootstrap";

const MasterRute = () => {
  const [rute, setRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    getRute();
  }, []);

  const getRute = async (query='') => {
    setIsLoading(true);
    // console.log('master rute getrute');
    let myurl = `${fn.getBaseUrl()}/Mrute`;
    if (query) {
      myurl += myurl.indexOf('?') > 0 ? '&' : '?';
      myurl += `q=${query}`;
    }
    // console.log('master rute getrute', myurl);
    // return;
    const response = await fetch(myurl);
    const data = await response.json(); 
    // console.log('data', data);
    setRute(data);
    setIsLoading(false);
  };

  const deleteRute = async (id, string) => {
    if ( ! window.confirm(`Data Rute [${string}] akan dihapus. Lanjutkan?`)) {
      return false;
    }

    const myurl = `${fn.getBaseUrl()}/Mrute/${id}`;
    await fetch(myurl, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      }
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
        getRute();
      });
  };


  return (
    <div className="container">
      <SearchBar onSearch={getRute} keywordType="nama toko"/>
      <div className="mb-3 is-flex is-justify-content-space-between">
        <div>
          <strong className="is-size-4 me-3">Data Rute</strong>
        </div>
        <div>
          <Link to="/add_rute">
            <Button variant="primary">Rute Baru</Button>
          </Link>
        </div>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListMasterRute rute={rute} onDelete={deleteRute} />}
    </div>
  );
};

export default MasterRute;
