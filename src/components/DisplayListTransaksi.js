import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const DisplayListTransaksi = ({ transaksi, deleteTransaksi, handleClickRow }) => {
  // console.log("display transaksi", transaksi);

  let total = 0;
  for (let i=0; i<transaksi.length; i++) {
    total += parseInt(transaksi[i].nilai_transaksi);
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
    <div className="mb-3">
      {
        transaksi.length > 0
        ? (
          <>
            <div className="table-container mb-0">
              <Table bordered hover className="mb-1">
                <thead>
                  <tr>
                    <th style={{width:"1%"}} className="ps-1">No</th>
                    <th>Info Transaksi</th>
                    <th>Nilai Transaksi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentItems.length > 0
                    ? (
                      currentItems.map((item, index) => (
                        <tr 
                          key={item.id} 
                          className="fs-6" 
                          onClick={() => handleClickRow(item.id)}
                        >
                          <td style={{width:"1%"}} className="ps-1">{index+1}.</td>
                          <td style={{wordBreak:'break-word'}} className="fs-6">
                            <span>{fn.formatNoNota(item.id)}</span>
                            <div className="fs-7">
                              {fn.formatDate(new Date(item.created_at), 'datetime-std')}
                              <br />
                              {item.nama_toko}
                            </div>
                          </td>
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
              <span className="me-2">Total Nilai: Rp</span>
              <span className="fs-5 fw-bold">{fn.thousandSeparator(total)}</span>
            </div>
            <div className="align-right mb-3">
              dari {fn.thousandSeparator(transaksi.length)} transaksi
            </div>

            <div className="mb-3">
              <Pagination 
              itemsPerPage={itemsPerPage} 
              totalItems={transaksi.length} 
              paginate={paginate} 
              curPageNumber={currentPage} 
              />
            </div>

          </>
        )
        : <div className="fst-italic">Tidak ada data transaksi</div>
      }

    </div>
  );
};

export default DisplayListTransaksi;
