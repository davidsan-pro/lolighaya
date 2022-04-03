import { useState } from "react";
import { Button, Table, Accordion, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const DisplayListMasterRute = ({ rute }) => {
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
              if (index == 0 || rute[index].nama_rute != rute[index-1].nama_rute) {
                return (
                  <Accordion.Item key={item.id} eventKey={item.id}>
                    <Accordion.Header>
                      <label className="fw-bold">Rute {item.nama_rute}</label>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="mb-2">
                        <Button className="fs-6">Edit Rute {item.nama_rute}</Button>
                      </div>
                      <Table striped size="sm">
                        <tbody>
                          {ruteHari.map((subitem) => {
                            console.log('subitem', subitem.id, subitem.nama_rute, subitem.list_kota);
                            if (item.nama_rute == subitem.nama_rute) {
                              return (
                                <tr key={subitem.id}>
                                  <td>
                                    <label className="fs-5">{fn.getNamaHari(subitem.hari)}</label>
                                    <br/>
                                    <em className="fs-7">{subitem.list_kota}</em>
                                  </td>
                                  <td style={{ textAlign:'center' }}>
                                    <Link to={`/master_rute_list/${subitem.id}`}>
                                      <Button variant="primary">Edit</Button>
                                    </Link>
                                  </td>
                                </tr>
                                // <ListGroup.Item key={subitem.id}>
                                //   <div className="fs-5 is-flex is-justify-content-space-between is-align-content-flex-start" style={{ maxWidth: '100%' }}>
                                //     <label>
                                //       {fn.getNamaHari(subitem.hari)}
                                //       <br/>
                                //       <small className="fs-7" style={{ lineHeight:'1em' }}>
                                //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, iste.
                                //       </small>
                                //     </label>
                                //     <label>
                                //       <Button variant="primary">Edit</Button>
                                //     </label>
                                //   </div>
                                // </ListGroup.Item>
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

      <Pagination itemsPerPage={itemsPerPage} 
      totalItems={uniqueRute.length} 
      paginate={paginate} 
      curPageNumber={currentPage} 
      />

    </>
  );
};

export default DisplayListMasterRute;
