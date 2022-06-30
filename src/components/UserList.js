/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DisplayListUser from "./DisplayListUser";
import * as ReactBootstrap from "react-bootstrap";
import * as fn from "../MyFunctions";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      // console.log(global.config.base_url);
      const users = await axios.get(`${fn.getBaseUrl()}/users`);
      // console.log("getusers", users.data);
      setUsers(users.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (id) => {
    if ( ! window.confirm('Data akan dihapus. Lanjutkan?')) {
      return false;
    }

    await axios.delete(`${fn.getBaseUrl()}/users/${id}`);
    getUsers();
  };

  return (
    <div>
      <Link to="/add" className="button is-primary">
        Tambah Baru
      </Link>
      <div>
        <strong className="is-size-4">Data User</strong>
      </div>
      {isLoading ? <ReactBootstrap.Spinner animation="border" /> : <DisplayListUser users={users} onDelete={deleteUser} />}
    </div>
  );
};

export default UserList;
