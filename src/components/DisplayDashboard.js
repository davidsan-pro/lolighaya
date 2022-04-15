import { useState } from "react";
import { Button, Table, Accordion, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const DisplayDashboard = ({ rute }) => {
  const [ruteHari, setRuteHari] = useState(rute);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const uniqueRute = [...new Set(rute.map(item => item.nama_rute))];

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = uniqueRute.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="mb-3">
        <Accordion>
          {
            rute.map((item, index) => {
              if (index === 0 || rute[index].nama_rute !== rute[index-1].nama_rute) {
                return (
                  <Accordion.Item key={item.id} eventKey={item.id}>
                    <Accordion.Header>
                      <label className="fw-bold">Rute {item.nama_rute}</label>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Table striped size="sm">
                        <tbody>
                          {ruteHari.map((subitem) => {
                            // if (subitem.)
                            if (item.nama_rute === subitem.nama_rute && parseInt(subitem.status|0)) {
                              console.log('subitem', index, item, subitem);
                              return (
                                <tr key={subitem.id} className="mb-2">
                                  <td className="ps-3">
                                    <Link to={`/rute_list_toko/${subitem.id}`}>
                                      <span className="fs-5">
                                        {fn.getNamaHari(subitem.hari)}
                                      </span>
                                      <br/>
                                      <em className="fs-7">{subitem.list_kota}</em>
                                    </Link>
                                  </td>
                                </tr>
                              )
                            }
                          })}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                )
              }
              // end if (index == 0 || rute[index].nama_rute != rute[index-1].nama_rute) 
            })
          }
        </Accordion> 
      </div>
      {/* 
      <Table striped hover>
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Rute</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {rute.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}.</td>
              <td>Rute {item.nama_rute}</td>
              <td>
                <Link to={`/master_rute_hari?nama_rute=${item.nama_rute}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> 
      */}

      <div className="mb-5">
        <Pagination itemsPerPage={itemsPerPage} 
        totalItems={uniqueRute.length} 
        paginate={paginate} 
        curPageNumber={currentPage} 
        />
      </div>

    </>
  );
};

export default DisplayDashboard;
