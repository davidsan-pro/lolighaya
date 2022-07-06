import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";
// import Text from "react-native";

const DisplayEditRuteList = ({ toko, onDelete }) => {
  console.log("display edit list toko", toko, onDelete);

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
        <Table striped bordered>
          <thead>
            <tr>
              <th style={{width:"5%"}}>No.</th>
              <th style={{width:"95%"}}>Info Toko</th>
            </tr>
          </thead>
          <tbody className="">
            {
              // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
              // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
              currentItems.length > 0 
              ? (
                currentItems.map((item, index) => (
                  <tr key={item.key_id}>
                    <td style={{width:"5%"}}>{indexOfFirstItem + index + 1}.</td>
                    <td style={{width:"95%"}}>
                      <div className="is-flex is-justify-content-flex start">
                        <div className="me-2">
                          <img src="https://bulma.io/images/placeholders/64x64.png" alt={`Foto ${item.nama}`} />
                        </div>
                        <div>
                          <div className="fs-6">
                            <Link to={`/view_toko/${item.id}`} onDelete={onDelete}>{item.nama}</Link>
                          </div>
                          <div className="fs-7">
                            {item.alamat}
                          </div>
                          <div className="fs-7">
                            Kec.{item.kecamatan}, Kota {item.kota}
                          </div>
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
          toko.length > 0 
          ? (
            <>
              <div class="mb-3">
                <Pagination 
                itemsPerPage={itemsPerPage} 
                totalItems={toko.length} 
                paginate={paginate} 
                curPageNumber={currentPage} 
                />
              </div>
              <div className="d-grid">
                <Button variant="primary" 
                size="lg" 
                onClick={() => fn.handleClickExportToExcel(toko, 'Data Toko')}>
                  Export ke Excel
                </Button>
              </div>
            </>
          )
          : ''
        }
      </div>
    </>
  );
};

export default DisplayEditRuteList;
