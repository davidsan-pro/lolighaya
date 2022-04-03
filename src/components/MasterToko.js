import { useState, useEffect } from "react";
import DisplayListToko from "./DisplayListToko";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";

const MasterToko = () => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getToko();
  }, []);

  const getToko = async (query = "") => {
    setIsLoading(true);
    try {
      let myurl = `${global.config.base_url}/toko`;
      if (query) {
        myurl += `?q=${query}`;
      }
      const response = await fetch(myurl);
      const data = await response.json();
      setToko(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteToko = async (id) => {
    const myurl = `${global.config.base_url}/toko/${id}`;
    await fetch(myurl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getToko();
  };


  return (
    <div>
      <SearchBar onSearch={getToko} keywordType="nama toko" />
      <div>
        <strong className="is-size-4 me-3">Data Toko</strong>
        <Link to="/add_toko" className="button is-primary">
          Tambah Baru
        </Link>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListToko toko={toko} onDelete={deleteToko} />}
    </div>
  );
};

export default MasterToko;
