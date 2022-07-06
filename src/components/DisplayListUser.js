import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { DropdownType, DropdownButton, SplitButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const DisplayListUser = ({ users, onDelete }) => {
  // console.log("display users", users);
  // console.log('login', fn.getCurrentLogin());

  const loginData = fn.getCurrentLogin();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="table-container">
        <Table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Foto User</th>
              <th>Info User</th>
            </tr>
          </thead>
          <tbody>
            {
              // kalo jumlah barangnya 1 atau lebih maka tampilkan dlm bentuk tabel
              // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
              currentItems.length > 0 ? (
                currentItems.map((user, index) => (
                  <tr key={user.id}>
                    <td>{indexOfFirstItem + index + 1}.</td>
                    <td>
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Image" />
                    </td>
                    <td>
                      <div className="mb-2">
                        <Link to={`/view_user/${user.id}`} className="fs-6">
                          {user.username}
                        </Link>
                        <br />
                        <small className="fs-7">{user.email}</small>
                      </div>
                      {
                        (
                          // user lv 1 bisa mengedit semua user yg bkn lv 1
                          // tp tdk bisa melihat user lain yg sama2 lv 1
                          (
                            parseInt(loginData.level) === 1
                            && (parseInt(user.level) !== 1 || user.id === loginData.id)
                          )
                          // selain user lv 1 hny bs mengedit data milik sendiri
                          || user.id === loginData.id
                        ) 
                        ? (
                            <div>
                              {[DropdownButton].map((DropdownType, idx) => (
                                <DropdownType
                                  as={ButtonGroup}
                                  key={idx}
                                  id={`dropdown-button-drop-${idx}`}
                                  size="sm"
                                  variant="info"
                                  title="Menu"
                                >
                                  <Dropdown.Item eventKey="1" as={Link} to={`/edit_user/${user.id}`}>
                                    Edit
                                  </Dropdown.Item>
                                  {
                                    // khusus utk menu delete hanya bs diakses oleh user lv 1
                                    loginData.level === '1' 
                                    ? <>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="3" 
                                        className="fc-danger" 
                                        onClick={() => onDelete(user.id)}>
                                          Hapus
                                        </Dropdown.Item>
                                      </>
                                    : ''
                                  }
                                </DropdownType>
                              ))}
                            </div>
                          )
                        : ''
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    <em>Data masih kosong</em>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>

        {
          // pagination hanya ditampilkan kalau ada datanya
          users.length > 0 ? (
            <>
              <div className="mb-3">
                <Pagination itemsPerPage={itemsPerPage} totalItems={users.length} paginate={paginate} curPageNumber={currentPage} />
              </div>
              <div className="d-grid">
                <Button variant="primary" size="lg" onClick={() => fn.handleClickExportToExcel(users, "Data Users")}>
                  Export ke Excel
                </Button>
              </div>
            </>
          ) : (
            ""
          )
        }
      </div>
    </>
  );
};

export default DisplayListUser;
