import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const DisplayListUser = ({ users, onDelete }) => {
  console.log("display users", users);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = users.slice(indexOfFirstItem, indexOfLastItem);

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
              users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}.</td>
                    <td>
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Image" />
                    </td>
                    <td>
                      <div className="mb-2">
                        <label className="fs-6">{user.username}</label>
                        <br/>
                        <small className="fs-7">{user.email}</small>
                      </div>
                      <div>
                        <Link to={`/edit_user/${user.id}`}>
                          <Button variant="info" className="me-2">
                            Edit
                          </Button>
                        </Link>
                        <Button variant="danger" onClick={() => onDelete(user.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={99}>
                    <em>Data masih kosong</em>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>

        <Pagination itemsPerPage={itemsPerPage} 
        totalItems={users.length} 
        paginate={paginate} 
        curPageNumber={currentPage} 
        />
      </div>

    </>
  );
};

export default DisplayListUser;