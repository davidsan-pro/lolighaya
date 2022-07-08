import { useState, useEffect } from "react";
import DisplayListToko from "./DisplayListToko";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import * as fn from "../MyFunctions";

const MasterToko = () => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getToko();
  }, []);

  const getToko = async (query = "") => {
    setIsLoading(true);
    try {
      let myurl = `${fn.getBaseUrl()}/toko`;
      let qsArr = [];
      if (query) {
        qsArr.push(`q=${query}`);
      }
      if (qsArr.length > 0) {
        myurl += '?' + qsArr.join('&');
      }
      console.log('mastertoko gettoko', myurl);
      const response = await fetch(myurl);
      const result = await response.json();
      console.log('mastertoko data', result);
      setToko(result.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteToko = async (id, string) => {
    if ( ! window.confirm(`Data Toko [${string}] akan dihapus. Lanjutkan?`)) {
      return false;
    }

    const myurl = `${fn.getBaseUrl()}/toko/${id}`;
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
          fn.showToastMsg('Gagal menghapus data toko', 'error');
        }
      })
      .catch(err => {
        fn.showToastMsg('Gagal menghapus data toko', 'error');
      })
      .finally(() => {
        getToko();
      });
  };


  return (
    <div>
      <SearchBar onSearch={getToko} keywordType="nama toko" />
      <div className="is-flex is-justify-content-space-between mb-2">
        <div>
          <strong className="is-size-4 me-3">Data Toko</strong>
        </div>
        <div>
          <Link to="/add_toko">
            <Button variant="primary">Tambah Baru</Button>
          </Link>
        </div>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListToko toko={toko} onDelete={deleteToko} />}
    </div>
  );
};

export default MasterToko;
