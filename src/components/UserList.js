/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import DisplayUserList from './DisplayUserList';
import * as ReactBootstrap from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const users = await axios.get('http://localhost:8080/users');
      console.log(users.data);
      setUsers(users.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/users/${id}`);
    getUsers();
  }

  return (
    <div>
      <Link to='/add' className='button is-primary'>Tambah Baru</Link>
      <div>
        <strong className='is-size-4'>Data User</strong>
      </div>
      {isLoading ? <ReactBootstrap.Spinner animation="border" /> : <DisplayUserList users={users} onDelete={deleteUser} />}
    </div>
  )
}

export default UserList