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
      <div className="mb-4">
        <Table striped bordered hover>
          <tbody>
            {
              rute.map((item, index) => {
                if (index === 0 || rute[index].nama_rute !== rute[index-1].nama_rute) {
                  return (
                    <tr key={item.id}>
                      <td>
                        <Link to={`/rute_list_toko/${item.id}`}>
                          <div className="fw-bold">{item.nama_rute}</div>
                          <em>{item.list_kota}</em>
                        </Link>
                      </td>
                    </tr>
                  )
                }
                // end if (index == 0 || rute[index].nama_rute != rute[index-1].nama_rute) 
              })
            }
          </tbody>
        </Table> 

        <div>
          <Pagination itemsPerPage={itemsPerPage} 
          totalItems={uniqueRute.length} 
          paginate={paginate} 
          curPageNumber={currentPage} 
          />
        </div>

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


    </>
  );
};

export default DisplayDashboard;
