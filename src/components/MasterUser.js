import { useState, useEffect } from "react";
import DisplayListUser from "./DisplayListUser";
import { Link } from "react-router-dom";
// import axios from "axios";
// import * as ReactBootstrap from "react-bootstrap";
import { Spinner, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";

const MasterUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch(`${global.config.base_url}/users`);
      const data = await response.json();
      setUsers(data);
      // const users = await axios.get(`${global.config.base_url}/users`);
      // console.log("get users", users.data);
      // setUsers(users.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e.getMessage());
    }
  };

  const deleteUser = async (id) => {
    console.log("delete user", id);
    // await axios.delete(`${global.config.base_url}/${id}`);
    // getUsers();
  };

  return (
    <div>
      <SearchBar />
      <div>
        <strong className="is-size-4 me-3">Data User</strong>
        <Link to="/add_user" className="button is-primary">
          Tambah Baru
        </Link>
      </div>
      {/* <DisplayListUser users={users} /> */}
      {/* {isLoading ? <ReactBootstrap.Spinner animation="border" /> : <DisplayListUser users={users} onDelete={deleteUser} />} */}
      {isLoading ? <Spinner animation="border" /> : <DisplayListUser users={users} onDelete={deleteUser} />}
    </div>
  );
};

export default MasterUser;
