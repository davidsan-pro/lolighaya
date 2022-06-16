import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
// import Text from "react-native";

const DisplayListToko = ({ toko, onDelete }) => {
  // console.log("display toko", toko, onDelete);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = toko.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="table-container">
        <Table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No.</th>
              <th>Foto Toko</th>
              <th>Info Toko</th>
            </tr>
          </thead>
          <tbody>
            {
              // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
              // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
              currentItems.length > 0 
              ? (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{indexOfFirstItem + index + 1}.</td>
                    <td>
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Image" />
                    </td>
                    <td>
                      <div className="fs-5">
                        <Link to={`/view_toko/${item.id}`} onDelete={onDelete}>{item.nama}</Link>
                      </div>
                      <div>
                        <small>{item.alamat}</small>
                      </div>
                      <div>
                        <small>
                          Kec.{item.kecamatan}, Kota {item.kota}
                        </small>
                      </div>
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
          toko.length > 0 
          ? (
            <Pagination 
            itemsPerPage={itemsPerPage} 
            totalItems={toko.length} 
            paginate={paginate} 
            curPageNumber={currentPage} 
            />
          )
          : ''
        }
      </div>
    </>
  );
};

export default DisplayListToko;
