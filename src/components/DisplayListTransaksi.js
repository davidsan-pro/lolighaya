import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const DisplayListTransaksi = ({ transaksi, deleteTransaksi, handleClickRow }) => {
  console.log("display transaksi", transaksi);

  let total = 0;
  for (let i=0; i<transaksi.length; i++) {
    total += transaksi[i].nilai_transaksi;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transaksi.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="simple-table">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Nama Toko</th>
              <th>Tanggal</th>
              <th>Username</th>
              <th>Nilai Transaksi</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.length > 0
              ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} className="link" onClick={() => handleClickRow(item.id)}>
                    <td style={{wordBreak:'break-word'}}>{item.nama_toko}</td>
                    <td style={{wordBreak:'break-word'}}>
                      {item.created_at}
                    </td>
                    <td>{item.username}</td>
                    <td className="align-right">
                      Rp {fn.thousandSeparator(item.nilai_transaksi)}
                    </td>
                  </tr>
                ))
              )
              : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Data transaksi masih kosong
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>

      <div className="align-right">
        <span className="me-2">Total: Rp</span>
        <span className="fs-5 fw-bold">{fn.thousandSeparator(total)}</span>
      </div>
      <div className="align-right mb-3">{fn.thousandSeparator(transaksi.length)} transaksi</div>
      
      {
        // pagination hanya ditampilkan kalau ada datanya
        transaksi.length > 0 
        ? (
          <>
            <div className="mb-3">
              <Pagination 
              itemsPerPage={itemsPerPage} 
              totalItems={transaksi.length} 
              paginate={paginate} 
              curPageNumber={currentPage} 
              />
            </div>
            <div className="d-grid">
              <Button variant="primary" 
              size="lg" 
              onClick={() => fn.handleClickExportToExcel(transaksi)}>
                Export ke Excel
              </Button>
            </div>
          </>
        )
        : ''
      }

    </>
  );
};

export default DisplayListTransaksi;
