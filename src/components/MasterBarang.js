import { useState, useEffect } from "react";
import DisplayListBarang from "./DisplayListBarang";
import { Link } from "react-router-dom";
import axios from "axios";
// import * as ReactBootstrap from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const MasterBarang = () => {
  const [barang, setBarang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async () => {
    try {
      const barang = await axios.get(`${global.config.base_url}/barang`);
      console.log("get barang", barang.data);
      setBarang(barang.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e.getMessage());
    }
  };

  const deleteBarang = async (id) => {
    console.log("delete barang", id);
    // await axios.delete(`${global.config.base_url}/${id}`);
    // getUsers();
  };

  return (
    <div>
      <Link to="/add_barang" className="button is-primary">
        Tambah Baru
      </Link>
      <div>
        <strong className="is-size-4">Data Barang</strong>
      </div>
      {/* <DisplayListBarang users={users} /> */}
      {/* {isLoading ? <ReactBootstrap.Spinner animation="border" /> : <DisplayListBarang users={users} onDelete={deleteUser} />} */}
      {isLoading ? <Spinner animation="border" /> : <DisplayListBarang barang={barang} onDelete={deleteBarang} />}
    </div>
  );
};

export default MasterBarang;
