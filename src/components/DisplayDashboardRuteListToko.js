import { useState } from "react";
import { Button, Table, Dropdown, DropdownButton, DropdownItem, Accordion, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const DisplayDashboardRuteListToko = ({ dRute, onDelete }) => {
  // console.log('drute', dRute);
  const [ruteHari, setRuteHari] = useState(dRute);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const uniqueRute = [...new Set(dRute.map((item) => item.nama_rute))];

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = uniqueRute.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container">
        <div className="table-container">
          <Table striped bordered>
            <thead>
              <tr>
                <th>No.</th>
                <th>Info Toko</th>
              </tr>
            </thead>
            <tbody>
              {dRute.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}.</td>
                  <td>
                    <div className="media">
                      <div className="media-left">
                        <div className="image is-48x48">
                          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="title fs-5">
                          <Link to={`/rute_detail_toko/${item.id}`}>{item.nama}</Link>
                          <br />
                          <div className="subtitle fs-7 mb-2 ellipsis">
                            {item.alamat}
                            <br />
                            Kec.{item.kecamatan}, {fn.ucasefirst(item.kota)}
                          </div>
                          <div className="subtitle mb-0">
                            <DropdownButton id="dropdown-basic-button" title="Actions" size="sm">
                              <Dropdown.Item as={Link} to={`/add_transaksi_toko/${item.id}`}>Nota Baru</Dropdown.Item>
                              {/* <Dropdown.Item href="/histori_trx">Histori Nota</Dropdown.Item>
                              <Dropdown.Item href={`/edit_toko/${item.id}`}>Edit Toko</Dropdown.Item>
                              <Dropdown.Item onClick={() => onDelete(item.key_id, item.nama)}>
                                Hapus dari Rute
                              </Dropdown.Item> */}
                            </DropdownButton>
                          </div>
                        </div>
                        {/* <div className="subtitle is-7">No.Urut {item.urutan}</div> */}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Pagination itemsPerPage={itemsPerPage} totalItems={uniqueRute.length} paginate={paginate} curPageNumber={currentPage} />
      </div>
    </>
  );
};

export default DisplayDashboardRuteListToko;
