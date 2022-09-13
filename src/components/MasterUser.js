import { useState, useEffect } from "react";
import DisplayListUser from "./DisplayListUser";
import { Link } from "react-router-dom";
import { Spinner, Button, Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";
import SearchBar from "./SearchBar";
import * as fn from "../MyFunctions";

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
      let myurl = `${fn.getBaseUrl()}/users`;
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

    const myurl = `${fn.getBaseUrl()}/users/${id}`;
    await fetch(myurl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(res => {
        
      });
    getUsers();
  };


  return (
    <div>
      <SearchBar onSearch={getUsers} keywordType="username" />
      <div className="is-flex is-justify-content-space-between mb-2">
        <strong className="fs-4 me-3">Data User</strong>
        <DropdownButton id="dropdown-basic-button" title="Menu">
          <Dropdown.Item>
            <Link className="link" to="/add_user">Tambah Baru</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <label 
              className="link" 
              onClick={() => fn.handleClickExportToExcel(users, 'data_user')}
            >
              Export to Excel
            </label>
          </Dropdown.Item>
        </DropdownButton>
      </div>
      {
        isLoading 
        ? <Spinner animation="border" /> 
        : <DisplayListUser users={users} onDelete={deleteUser} />
      }
    </div>
  );
};

export default MasterUser;
