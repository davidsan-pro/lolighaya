import { useState, useEffect } from "react";
import DisplayListUser from "./DisplayListUser";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Alert from "react-bootstrap/Alert";
import Pagination from "./Pagination";

const MasterUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (query = "") => {
    setIsLoading(true);
    try {
      let myurl = `${global.config.base_url}/users`;
      if (query) {
        myurl += `?q=${query}`;
      }
      const response = await fetch(myurl);
      const data = await response.json();
      setUsers(data);
      // setShowMsg(true);
    } catch (e) {
      console.log(e.getMessage());
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const myurl = `${global.config.base_url}/users/${id}`;
    await fetch(myurl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getUsers();
  };

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = users.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
      <SearchBar onSearch={getUsers} />
      <div>
        <Alert variant="success" show={showMsg} transition="Fade" dismissible>
          <p>Fetch data successful!</p>
        </Alert>
      </div>
      <div>
        <strong className="is-size-4 me-3">Data User</strong>
        <Link to="/add_user" className="button is-primary">
          Tambah Baru
        </Link>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListUser users={users} onDelete={deleteUser} />}
      <Pagination itemsPerPage={itemsPerPage} 
      totalItems={users.length} 
      paginate={paginate} 
      curPageNumber={currentPage} 
      />
    </div>
  );
};

export default MasterUser;
