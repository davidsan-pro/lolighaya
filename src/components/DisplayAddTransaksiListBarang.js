import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const DisplayAddTransaksiListBarang = ({ barang, idToko, idRute }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  console.log('display list', idRute, idToko);
  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = barang.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content-container">
      {
        barang.length > 0
        ? (
          barang.map((item, index) => (
            <article className="media" key={item.id}>
              {index+1}. 
              <figure className="media-left ms-2">
                <div className="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/48x48.png" />
                </div>
              </figure>
              <div className="media-content">
                <div className="content mb-2">

                  <strong>
                    <Link to={`/add_transaksi_detail_barang/${idRute}?id_toko=${idToko}&id_barang=${item.id}`}>
                      {item.nama}
                    </Link>
                  </strong>
                  <div className="fs-7">
                    <span className="me-1">
                      Harga: Rp {item.harga}, 
                    </span>
                    <span>
                      Stok: {item.stok}
                    </span>
                  </div>

                </div>
              </div>

              {/* <div className="media-right">
                <button className="delete"></button>
              </div> */}
            </article>
          ))
        )
        : (
          <div>
            <em>Tidak ada data</em>
          </div>
        )
      }

      {
        // pagination hanya ditampilkan kalau ada datanya
        barang.length > 0 
        ? (
          <Pagination 
          itemsPerPage={itemsPerPage} 
          totalItems={barang.length} 
          paginate={paginate} 
          curPageNumber={currentPage} 
          />
        )
        : ''
      }

    </div>
  )
}

export default DisplayAddTransaksiListBarang;