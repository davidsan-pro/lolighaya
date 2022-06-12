import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const DisplayListTransaksi = ({ transaksi, onDelete }) => {
  console.log("display transaksi", transaksi);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = transaksi.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="simple-table">
        <Table striped bordered hover>
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
              transaksi.length > 0
              ? (
                transaksi.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{wordBreak:'break-word'}}>{item.nama}</td>
                    <td style={{wordBreak:'break-word'}}>
                      {item.created_at}
                    </td>
                    <td>{item.id_user}</td>
                    <td className="align-right">
                      Rp {fn.thousandSeparator(item.nilai_transaksi)}
                    </td>
                  </tr>
                ))
              )
              : (
                <tr>
                  <td colSpan="4">
                    Data transaksi masih kosong
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>

      <div>Total: {transaksi.length} transaksi</div>
      {
        // pagination hanya ditampilkan kalau ada datanya
        transaksi.length > 0 
        ? (
          <Pagination 
          itemsPerPage={itemsPerPage} 
          totalItems={transaksi.length} 
          paginate={paginate} 
          curPageNumber={currentPage} 
          />
        )
        : ''
      }

    </>
  );
};

export default DisplayListTransaksi;
