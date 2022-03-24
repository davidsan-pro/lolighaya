import React, { useState, useEffect } from "react";
import DisplayUserList from "./DisplayUserList";
import { Link } from "react-router-dom";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";

const MasterUser = () => {
  console.log("base", global.config.base_url);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const users = await axios.get(`${global.config.base_url}/users`);
      console.log("get users", users.data);
      setUsers(users.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`${global.config.base_url}/${id}`);
    getUsers();
  };

  return (
    <div>
      <Link to="/add_user" className="button is-primary">
        Tambah Baru
      </Link>
      <div>
        <strong className="is-size-4">Data User</strong>
      </div>
      {isLoading ? <ReactBootstrap.Spinner animation="border" /> : <DisplayUserList users={users} onDelete={deleteUser} />}
    </div>
  );
};

export default MasterUser;
