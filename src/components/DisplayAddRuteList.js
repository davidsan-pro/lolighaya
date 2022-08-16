import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";
// import Text from "react-native";

const DisplayAddRuteList = ({ listToko, idRute, selectedToko, onSelect }) => {
  const location = useLocation();
  console.log("display list toko", listToko, idRute);
  // console.log("selected toko", selectedToko);

  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listToko.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentURL = location.pathname + location.search;

  return (
    <div className="mb-4">
      {
        // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
        // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
        currentItems.length > 0 
        ? (
          <div className="table-container">
            <Table bordered>
              <thead>
                <tr>
                  <th className="ps-0">No.</th>
                  <th>Info Toko</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="fs-6">
                {currentItems.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td className="ps-0">{index+1}.</td>
                      <td>
                        <Link to={`/view_toko/${item.id}?id_rute=${idRute}&back_url=${currentURL}`}>
                          {item.nama}
                        </Link>
                        <div style={{ textOverflow:'ellipsis'}} className="fs-7">
                          {item.alamat}
                        </div>
                        <div style={{ textOverflow:'ellipsis'}} className="fs-7">
                          Kec. {fn.ucasefirst(item.kecamatan)}, {fn.ucasefirst(item.kota)}
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          <Button onClick={() => onSelect(item.id)} variant="info" className="mb-2">Pilih</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Pagination itemsPerPage={itemsPerPage} 
            totalItems={listToko.length} 
            paginate={paginate} 
            curPageNumber={currentPage} 
            />
          </div>
        ) : (
          <div>
            <em>Tidak ada toko yg bisa ditambahkan ke rute</em>
          </div>
        )
      }
    </div>
  );
};

export default DisplayAddRuteList;
