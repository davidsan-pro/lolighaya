import { useState, useEffect } from "react";
import DisplayListBarang from "./DisplayListBarang";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import * as fn from "../MyFunctions";

const MasterBarang = () => {
  const [barang, setBarang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async (query='') => {
    setIsLoading(true);
    try {
      let myurl = `${fn.getBaseUrl()}/barang`;
      let qsArr = [];
      if (query) {
        qsArr.push(`q=${query}`);
      }
      if (qsArr.length > 0) {
        myurl += '?' + qsArr.join('&');
      }
      const response = await fetch(myurl);
      const data = await response.json();
      setBarang(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBarang = async (id, string) => {
    if ( ! window.confirm(`Data Barang [${string}] akan dihapus. Lanjutkan?`)) {
      return false;
    }

    const myurl = `${fn.getBaseUrl()}/barang/${id}`;
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
          fn.showToastMsg('Gagal menghapus data barang', 'error');
        }
      })
      .catch(err => {
        fn.showToastMsg('Gagal menghapus data barang', 'error');
      })
      .finally(() => {
        getBarang();
      });
  };


  return (
    <div>
      <SearchBar onSearch={getBarang} keywordType="nama barang"/>
      <div className="is-flex is-justify-content-space-between">
        <div>
          <strong className="is-size-4 me-3">Data Barang</strong>
        </div>
        <div>
          <Link to="/add_barang">
            <Button variant="primary">Tambah Baru</Button>
          </Link>
        </div>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListBarang barang={barang} onDelete={deleteBarang} />}
    </div>
  );
};

export default MasterBarang;
