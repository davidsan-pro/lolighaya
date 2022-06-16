import { useState, useEffect } from "react";
import DisplayListUser from "./DisplayListUser";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";

const MasterUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (query = "") => {
    setIsLoading(true);
    try {
      let myurl = `${global.config.base_url}/users`;
      let qsArr = [];
      if (query) {
        qsArr.push(`q=${query}`);
      }
      if (qsArr.length > 0) {
        myurl += '?' + qsArr.join('&');
      }
      const response = await fetch(myurl);
      const data = await response.json();
      setUsers(data);
      // setShowMsg(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if ( ! window.confirm('Data akan dihapus. Lanjutkan?')) {
      return false;
    }

    const myurl = `${global.config.base_url}/users/${id}`;
    await fetch(myurl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getUsers();
  };


  return (
    <div>
      <SearchBar onSearch={getUsers} keywordType="username" />
      <div className="is-flex is-justify-content-space-between">
        <div>
          <strong className="is-size-4 me-3">Data User</strong>
        </div>
        <div>
          <Link to="/add_user">
            <Button variant="primary">Tambah Baru</Button>
          </Link>
        </div>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListUser users={users} onDelete={deleteUser} />}
    </div>
  );
};

export default MasterUser;
