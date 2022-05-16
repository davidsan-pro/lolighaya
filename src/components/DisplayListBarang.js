import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const DisplayListBarang = ({ barang, onDelete }) => {
  console.log("display barang", barang);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = barang.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>

      <div className="table-container">
        <Table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Info Barang</th>
            </tr>
          </thead>
          <tbody>
            {
              // kalo jumlah barangnya 1 atau lebih maka tampilkan dlm bentuk tabel
              // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
              barang.length > 0 
              ? (
                barang.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}.</td>
                    <td>
                      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Image" />
                    </td>
                    <td>
                      <div className="mb-2">
                        <div className="fs-5">
                          <Link to={`/view_barang/${item.id}`} onDelete={onDelete}>
                            {item.nama}
                          </Link>
                        </div>
                        <div>
                          <small>Stok: {item.stok}</small>
                        </div>
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
          barang.length > 0 
          ? (
              <Pagination itemsPerPage={itemsPerPage} 
              totalItems={barang.length} 
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

export default DisplayListBarang;
