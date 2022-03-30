import { useState, useEffect } from "react";
import DisplayListToko from "./DisplayListToko";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const MasterToko = () => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
      console.log(e.getMessage());
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

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = toko.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
      <SearchBar onSearch={getToko} />
      <div>
        <strong className="is-size-4 me-3">Data Toko</strong>
        <Link to="/add_toko" className="button is-primary">
          Tambah Baru
        </Link>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListToko toko={toko} onDelete={deleteToko} />}
      <Pagination itemsPerPage={itemsPerPage} 
      totalItems={toko.length} 
      paginate={paginate} 
      curPageNumber={currentPage} 
      />
    </div>
  );
};

export default MasterToko;
