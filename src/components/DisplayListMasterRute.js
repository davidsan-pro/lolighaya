import { useState } from "react";
import { Table, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const DisplayListMasterRute = ({ rute, onDelete }) => {
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
      <div className="mb-3 table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width:"1%" }}>No.</th>
              <th style={{ width:"100%" }}>Data</th>
              {/* <th style={{ width:"1%" }}>Actions</th> */}
            </tr>
          </thead>
          <tbody>
          {
            // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
            // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
            rute.length > 0 
            ? (
              rute.map((item, index) => {
                if (index === 0 || rute[index].nama_rute !== rute[index-1].nama_rute) {
                  return (
                    <tr key={item.id} className="is-align-items-baseline">
                      <td style={{ verticalAlign:"top" }}>{index +1}.</td>
                      <td>
                        <Link to={`/master_edit_rute_list/${item.id}`}>
                          <div className="fw-bold">Rute {item.nama_rute}</div>
                          <div className="fs-6 fst-italic">{item.list_kota}</div>
                        </Link>
                      </td>
                      {/* <td>
                        <DropdownButton id="dropdown-basic-button" title="Actions" size="sm">
                          <Dropdown.Item as={Link} to={`/master_edit_rute_list/${item.id}`}>Edit Rute</Dropdown.Item>
                          <Dropdown.Item onClick={onDelete}>Hapus Rute</Dropdown.Item>
                        </DropdownButton>
                      </td> */}
                    </tr>
                  )
                }
              })
            ) : (
              <tr>
                <td colSpan={3}>No data</td>
              </tr>
            )
          }
          </tbody>
        </Table> 

        {
          // pagination hanya ditampilkan kalau ada datanya
          rute.length > 0 
          ? (
            <Pagination 
            itemsPerPage={itemsPerPage} 
            totalItems={rute.length} 
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

export default DisplayListMasterRute;
