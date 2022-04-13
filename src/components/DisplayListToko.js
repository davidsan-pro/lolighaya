import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
// import Text from "react-native";

const DisplayListToko = ({ toko, onDelete }) => {
  console.log("display toko", toko);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = toko.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>

      <div className="table-container">
        <Table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Foto Toko</th>
              <th>Info Toko</th>
            </tr>
          </thead>
          <tbody>
            {
              // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
              // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
              toko.length > 0 ? (
                toko.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}.</td>
                    <td>
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Image" />
                    </td>
                    <td>
                      <div className="mb-2">
                        <div className="fs-5">
                          <Link to={`/view_toko/${item.id}`}>{item.nama}</Link>
                        </div>
                        <div>
                          <small>{item.alamat}</small>
                        </div>
                        <div>
                          <small>
                            Kec.{item.kecamatan}, Kota {item.kota}
                          </small>
                        </div>
                      </div>
                      <div>
                        <Link to={`/edit_toko/${item.id}`}>
                          <Button variant="info" className="me-2">Edit</Button>
                        </Link>
                        <Button variant="danger" onClick={() => onDelete(item.id, item.nama)}>
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

        <Pagination 
          itemsPerPage={itemsPerPage} 
          totalItems={toko.length} 
          paginate={paginate} 
          curPageNumber={currentPage} 
        />
      </div>
    </>
  );
};

export default DisplayListToko;
