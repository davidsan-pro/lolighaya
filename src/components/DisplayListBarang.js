import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const DisplayListBarang = ({ barang, onDelete }) => {
  console.log("display barang", barang);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = barang.slice(indexOfFirstItem, indexOfLastItem);

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

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Foto</th>
            <th>Info Barang</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            // kalo jumlah barangnya 1 atau lebih maka tampilkan dlm bentuk tabel
            // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
            barang.length > 0 ? (
              barang.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}.</td>
                  <td>
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                  </td>
                  <td>
                    <div className="fs-5">{item.nama}</div>
                    <div>
                      <small>Stok: {item.stok}</small>
                    </div>
                  </td>
                  <td>
                    <Link to={`/edit_barang/${item.id}`} className="button is-success mr-2">
                      Edit
                    </Link>
                    <button onClick={() => onDelete(item.id)} className="button is-danger">
                      Delete
                    </button>
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
      </table>

      <Pagination itemsPerPage={itemsPerPage} 
      totalItems={barang.length} 
      paginate={paginate} 
      curPageNumber={currentPage} 
      />

    </>
  );
};

export default DisplayListBarang;
