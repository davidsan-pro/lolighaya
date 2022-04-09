import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import ViewToko from "./ViewToko";
// import Text from "react-native";

const DisplayListRuteToko = ({ toko, idRute, selectedToko, onSelect, onSubmit }) => {
  // console.log("display toko", toko);
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
    <>
      <div className="mb-4">
        <Table striped>
          <thead>
            <tr>
              {/* <th>No</th> */}
              <th className="ps-3">Info Toko</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
              // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
              toko.length > 0 ? (
                toko.map((item, index) => {
                  console.log('detail rute toko', index, item);
                  return (
                  <tr key={index}>
                    {/* <td>{index +1}.</td> */}
                    <td>
                      <Link to={`/view_toko/${item.id}`}>
                        <label className="fs-5">{item.nama}</label>
                      </Link>
                      <br />
                      <small style={{ textOverflow:'ellipsis'}} className="fs-7">{item.alamat}</small>
                      <br />
                      <small style={{ textOverflow:'ellipsis'}} className="fs-7">{item.kecamatan}, {item.kota}</small>
                    </td>
                    <td>
                      <div className="text-center">
                        {/* <label>
                          <input
                            type="checkbox"
                            id="rute_toko"
                            name="rute_toko"
                            value={item.id}
                          />
                          <span className="ms-2">Pilih</span>
                        </label> */}
                        <Button onClick={() => onSelect(item.id)} variant="info" className="mb-2">Pilih</Button>
                      </div>
                    </td>
                  </tr>
                )})
              ) : (
                <tr>
                  <td colSpan={99}>
                    <em>Data masih kosong</em>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>

        <Pagination itemsPerPage={itemsPerPage} 
        totalItems={toko.length} 
        paginate={paginate} 
        curPageNumber={currentPage} 
        />
      </div>
    </>
  );
};

export default DisplayListRuteToko;
