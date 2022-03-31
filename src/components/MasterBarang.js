import { useState, useEffect } from "react";
import DisplayListBarang from "./DisplayListBarang";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const MasterBarang = () => {
  const [barang, setBarang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async (query='') => {
    setIsLoading(true);
    try {
      let myurl = `${global.config.base_url}/barang`;
      if (query) {
        myurl += `?q=${query}`;
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

  const deleteBarang = async (id) => {
    console.log("delete barang", id);
    const myurl = `${global.config.base_url}/barang/${id}`;
    await fetch(myurl, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    getBarang();
  };

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = barang.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
      <SearchBar onSearch={getBarang}/>
      <div>
        <strong className="is-size-4 me-3">Data Barang</strong>
        <Link to="/add_barang" className="button is-primary">
          Tambah Baru
        </Link>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListBarang barang={barang} onDelete={deleteBarang} />}
      <Pagination itemsPerPage={itemsPerPage} 
      totalItems={barang.length} 
      paginate={paginate} 
      curPageNumber={currentPage} 
      />
    </div>
  );
};

export default MasterBarang;
