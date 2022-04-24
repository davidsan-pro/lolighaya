import { useState, useEffect } from "react";
import DisplayListTransaksi from "./DisplayListTransaksi";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";

const MasterTransaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTransaksi();
  }, []);

  const getTransaksi = async (query='') => {
    setIsLoading(true);

    let myurl = `${global.config.base_url}/Mtransaksi`;
    if (query) {
      myurl += `?q=${query}`;
    }
    const response = await fetch(myurl);
    const data = await response.json();
    setTransaksi(data);

    setIsLoading(false);
  };

  const deleteTransaksi = async (id, string) => {
    if ( ! window.confirm(`Data Transaksi [${string}] akan dihapus. Lanjutkan?`)) {
      return false;
    }

    const myurl = `${global.config.base_url}/Mtransaksi/${id}`;
    await fetch(myurl, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    getTransaksi();
  };


  return (
    <div>
      <SearchBar onSearch={getTransaksi} keywordType="nama toko atau barang"/>
      <div>
        <strong className="is-size-4 me-3">Histori Transaksi</strong>
        <Link to="/add_transaksi">
          <Button variant="primary">Tambah Baru</Button>
        </Link>
      </div>
      {
        isLoading 
          ? <Spinner animation="border" /> 
          : <DisplayListTransaksi transaksi={transaksi} onDelete={deleteTransaksi} />
      }
    </div>
  );
};

export default MasterTransaksi;
