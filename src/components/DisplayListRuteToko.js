import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
// import Text from "react-native";

const DisplayListRuteToko = ({ toko, onDelete }) => {
  console.log("display toko", toko);

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
      <>
        {/* <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>admin1</strong> 
                  <br />
                  <small>admin@aa.com</small> 
                  <br />
                  <small>08123123123</small>
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item" aria-label="reply">
                    <button className='button is-small is-info'>Edit</button>
                  </a>
                  <a className="level-item" aria-label="retweet">
                    <button className='button is-small is-danger'>Delete</button>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div> */}
      </>

      <Table striped>
        <thead>
          <tr>
            <td>No</td>
            <td>Info Toko</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
            // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
            toko.length > 0 ? (
              toko.map((item, index) => (
                <tr key={item.id}>
                  <td>{index +1}.</td>
                  <td>
                    <label className="fs-5">{item.nama}</label>
                    <br />
                    <small style={{ textOverflow:'ellipsis'}} className="fs-7">{item.alamat}</small>
                    <br />
                    <small style={{ textOverflow:'ellipsis'}} className="fs-7">{item.kecamatan}, {item.kota}</small>
                  </td>
                  <td>
                    <Link to={`/edit_toko/${item.id_toko}`}>
                      <Button variant="primary" className="mb-2 me-2">Edit</Button>
                    </Link>
                    <br/>
                    <Button onClick={() => onDelete(item.id)} variant="danger" className="mb-2">Delete</Button>
                  </td>
                </tr>
              ))
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

    </>
  );
};

export default DisplayListRuteToko;
