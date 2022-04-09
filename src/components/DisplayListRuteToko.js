import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
// import Text from "react-native";

const DisplayListRuteToko = ({ toko, onDelete }) => {
  console.log("display list rute toko", toko);

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
      <Table striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Info Toko</th>
            <th style={{ textAlign:'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
            // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
            toko.length > 0 ? (
              toko.map((item, index) => {
                // console.log('detail rute toko', index, item);
                return (
                <tr key={item.id}>
                  <td>{index +1}.</td>
                  <td>
                    <label className="fw-bold">{item.nama}</label>
                    <br />
                    <small style={{ textOverflow:'ellipsis'}} className="fs-7">{item.alamat}</small>
                    <br />
                    <small style={{ textOverflow:'ellipsis'}} className="fs-7">{item.kecamatan}, {item.kota}</small>
                  </td>
                  <td>
                    <div className="is-flex is-justify-content-center">
                      {/* <label>
                        <input
                          type="checkbox"
                          id="rute_toko"
                          name="rute_toko"
                          value={item.id}
                        />
                        <span className="ms-2">Pilih</span>
                      </label> */}
                      <Button onClick={() => onDelete(item.id, item.nama)} variant="danger" className="mb-2">Hapus</Button>
                    </div>
                  </td>
                </tr>
              )})
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
      totalItems={toko.length} 
      paginate={paginate} 
      curPageNumber={currentPage} 
      />
    </>
  );
};

export default DisplayListRuteToko;
