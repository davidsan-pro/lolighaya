import { useState } from "react";
import Pagination from "./Pagination";

const DisplayPilihBarang = ({ barang }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
              <figure className="media-left">
                <div className="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png" />
                </div>
              </figure>
              <div className="media-content">
                <div className="content mb-2">

                  <strong>{item.nama}</strong>
                  <br/>
                  <small>
                    Harga: Rp<span className="ms-1">{item.harga}</span>
                    <br />
                    Stok: <span>{item.stok}</span>
                  </small>

                </div>
              </div>
              <div className="media-right">
                <button className="delete"></button>
              </div>
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

export default DisplayPilihBarang