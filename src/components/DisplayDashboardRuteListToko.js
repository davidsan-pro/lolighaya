import { useState } from "react";
import { Button, Table, Dropdown, DropdownButton, DropdownItem, Accordion, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const DisplayDashboardRuteListToko = ({ dRute, onDelete }) => {
  console.log('drute', dRute);
  // const [ruteHari, setRuteHari] = useState(dRute);

  const { id } = useParams(); // id rute
  // console.log('id', id);
  const loginData = fn.getCurrentLogin();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dRute.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {
        dRute.length > 0
        ? (
          <>
            <Table bordered>
              <thead>
                <tr>
                  <th className="ps-0">No.</th>
                  <th>Info Toko</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="ps-0">{index + 1}.</td>
                    <td>
                      <div className="media">
                        <div className="media-left">
                          <div className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="title fs-5">
                            <Link to={`/rute_detail_toko/${id}?id_toko=${item.id}`}>{item.nama}</Link>
                            <br />
                            <div className="subtitle fs-7 mb-2 ellipsis">
                              {item.alamat}
                              <br />
                              Kec.{item.kecamatan}, {fn.ucasefirst(item.kota)}
                            </div>
                            <div className="subtitle mb-0">
                              <DropdownButton id="dropdown-basic-button" title="Actions" size="sm">
                                <Dropdown.Item className="link is-danger" onClick={() => onDelete(item.key_id, item.nama)}>
                                  Hapus dari Rute
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to={`/add_rute_list/${id}?id_toko=${item.id}&mode_urutan=before&urutan=${item.urutan}&index=${index}`}>
                                  Tambah Toko Sebelum Toko Ini
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to={`/add_rute_list/${id}?id_toko=${item.id}&mode_urutan=after&urutan=${parseInt(item.urutan)+1}&index=${index}`}>
                                  Tambah Toko Setelah Toko Ini
                                </Dropdown.Item>

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

            <Pagination itemsPerPage={itemsPerPage} 
            totalItems={dRute.length} 
            paginate={paginate} 
            curPageNumber={currentPage} 
            />
          </>
        )
        : (
          <div className="text-center fst-italic">
            Data masih kosong
          </div>
        )
      }
    </>
  );
};

export default DisplayDashboardRuteListToko;
