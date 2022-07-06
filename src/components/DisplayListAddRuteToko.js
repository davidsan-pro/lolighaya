import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";
// import Text from "react-native";

const DisplayListAddRuteToko = ({ toko, idRute, selectedToko, onSelect, onSubmit }) => {
  // console.log("display toko", toko, idRute);
  // console.log("selected toko", selectedToko);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = toko.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mb-4">
      {
        // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
        // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
        toko.length > 0 
        ? (
          <div className="table-container">
            <Table striped bordered>
              <thead>
                <tr>
                  <th className="ps-3" style={{width:"90%"}}>Info Toko</th>
                  <th className="text-center" style={{width:"10%"}}>Action</th>
                </tr>
              </thead>
              <tbody className="fs-6">
                {toko.map((item, index) => {
                  // console.log('detail rute toko', index, item);
                  return (
                    <tr key={item.id}>
                      <td style={{width:"90%"}}>
                        <Link to={`/view_toko/${item.id}`}>
                          <label>{item.nama}</label>
                        </Link>
                        <div style={{ textOverflow:'ellipsis'}} className="fs-7">
                          {item.alamat}
                        </div>
                        <div style={{ textOverflow:'ellipsis'}} className="fs-7">
                          Kec. {fn.ucasefirst(item.kecamatan)}, {fn.ucasefirst(item.kota)}
                        </div>
                      </td>
                      <td style={{width:"10%"}}>
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
            totalItems={toko.length} 
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

export default DisplayListAddRuteToko;
