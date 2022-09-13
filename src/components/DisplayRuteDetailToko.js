import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";
// import Text from "react-native";

const DisplayRuteDetailToko = ({ data, id }) => {
  // console.log("display data", data, onDelete);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {
        data.length > 0
        ? (
          <>
            <div className="table-container">
              <Table bordered className="is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th style={{width:"90%"}}>Ringkasan</th>
                    <th style={{width:"50%"}}>Menu</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item, index) => {
                      const mystyle = item.nilai_transaksi > 0
                        ? {backgroundColor:"rgba(160, 240, 160, 0.8)"}
                        : {}
                        ;
                      return (
                        <tr key={item.id}  style={mystyle}>
                          <td>{index+1}.</td>
                          <td className="has-text-left">
                            <div className="fs-6">
                              <Link to={`/transaksi_detail/${item.id}`}>
                                <strong className="me-2">
                                  {fn.formatNoNota(item.id)}
                                </strong>
                              </Link>
                            </div>
                            <div className="fs-7">
                              <span>{fn.formatDate(item.created_at, 'full-std')}</span>
                              <br/>
                              <span>Jumlah Jenis Item: {fn.thousandSeparator(item.jum_jenis_brg)}</span>
                              <br/>
                              <span>Total Nilai: Rp {fn.thousandSeparator(item.nilai_transaksi)}</span>
                            </div>
                          </td>
                          <td className="text-center">
                            <Dropdown className="no-arrow">
                              <Dropdown.Toggle id="dropdown-button-dark-example1" className="no-arrow">
                                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                              </Dropdown.Toggle>
      
                              <Dropdown.Menu>
                                <Dropdown.Item 
                                as={Link} 
                                to={`/checkout_transaksi/${id}?id_toko=${item.id_toko}&id_trx=${item.id}`} 
                                // disabled={item.nilai_transaksi > 0 ? "disabled" : ""}
                                >
                                  Lanjutkan Nota
                                </Dropdown.Item>
                                <Dropdown.Item 
                                as={Link} 
                                to={`/transaksi_detail/${item.id}`} 
                                // disabled={item.nilai_transaksi > 0 ? "disabled" : ""}
                                >
                                  Cetak Nota
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>

            <Pagination 
            itemsPerPage={itemsPerPage} 
            totalItems={data.length} 
            paginate={paginate} 
            curPageNumber={currentPage} 
            />
          </>
        )
        : (
          <div className="fst-italic">Data transaksi masih kosong</div>
        )
      }
    </>
  );
};

export default DisplayRuteDetailToko;
