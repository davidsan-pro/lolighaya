import { useState, useEffect } from "react";
import DisplayListToko from "./DisplayListToko";
import { Link } from "react-router-dom";
import axios from "axios";
// import * as ReactBootstrap from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const MasterToko = () => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getToko();
  }, []);

  const getToko = async () => {
    try {
      const toko = await axios.get(`${global.config.base_url}/toko`);
      console.log("get toko", toko.data);
      setToko(toko.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e.getMessage());
    }
  };

  const deleteToko = async (id) => {
    console.log("delete toko", id);
    // await axios.delete(`${global.config.base_url}/${id}`);
    // getUsers();
  };

  return (
    <div>
      <Link to="/add_toko" className="button is-primary">
        Tambah Baru
      </Link>
      <div>
        <strong className="is-size-4">Data Toko</strong>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListToko toko={toko} onDelete={deleteToko} />}
    </div>
  );
};

export default MasterToko;
