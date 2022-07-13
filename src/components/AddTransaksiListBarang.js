import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";
// import Pagination from "./Pagination";
import DisplayAddTransaksiListBarang from "./DisplayAddTransaksiListBarang";
import * as fn from "../MyFunctions";

const AddTransaksiListBarang = () => {
  const [toko, setToko] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [barang, setBarang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams(); // id toko
  const [searchParams, setSearchParams] = useSearchParams();
  const idToko = searchParams.get("id_toko")
  let localCart = localStorage.getItem("cartList");

  useEffect(() => {
    // getTokoById(id);
    getBarang();

    if (localStorage.getItem("cartList")) {
      localCart = JSON.parse(localStorage.getItem("cartList"));
    }
    //load persisted cart into state if it exists
    setCartList(localCart);
  }, []);

  const getBarang = async (query='') => {
    setIsLoading(true);
    let myurl = `${fn.getBaseUrl()}/barang`;
    let qsArr = [];
    if (query) {
      qsArr.push(`q=${query}`);
    }
    if (qsArr) {
      const qs = qsArr.join('&');
      myurl += `?${qs}`;
    }
    const response = await fetch(myurl);
    let data = await response.json();
    data.forEach((item, index) => {
      cartList.forEach(row => {
        if (row.id === item.id) {
          item.stok -= (row.jumlahTitip || 0);
        }
      });
      // item.jumlahTitip = 0;
      // item.isChecked = false;
    });
    setBarang(data);
    setIsLoading(false);
  };


  return (
    <div className="container">
      <div>
        <SearchBar onSearch={getBarang} keywordType="nama barang"/>
      </div>
      {
        isLoading 
          ? <Spinner animation="border" /> 
          : <DisplayAddTransaksiListBarang barang={barang} idToko={idToko} idRute={id} />
      }
      {/* <div className="content-container">
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
      </div> */}
      {/* <div className="simple-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Info Barang</th>
              <th>Harga</th>
              <th>Titip</th>
            </tr>
          </thead>
          <tbody>
            {
              barang.length > 0
              ? (
                barang.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <label onClick={() => handleClickCbBarang(item.id)}>
                          <input type="checkbox" 
                          className="me-2"
                          id={`cb_barang-${item.id}`}
                          title={item.nama} 
                          value={item.nama}
                          checked={item.isChecked ? true : false}
                          onChange={() => handleClickCbBarang(item.id)}
                          />
                          {item.nama}
                        </label>
                      </div>
                      <div>
                        <em className="fs-7">Stok: {item.stok}</em>
                      </div>
                    </td>
                    <td>
                      <div>Rp {item.harga}</div>
                      <div>
                        <span className="me-1">Rp</span>
                        <input type="text"
                        style={{width:"65px"}}
                        id={`input_harga-${item.id}`}
                        title="harga spesial"
                        placeholder="harga spesial"
                        value={item.harga}
                        />
                      </div>
                    </td>
                    <td>
                      <input type="text"
                      style={{width:"75px"}}
                      className="input"
                      id={`input_titip-${item.id}`}
                      name="jumlahTitip"
                      value={item.jumlahTitip}
                      onChange={handleChangeInput}
                      onFocus={handleFocus}
                      />
                    </td>
                  </tr>
                ))
              )
              : (
                <tr>
                  <td colSpan="3">
                    <em>Data masih kosong</em>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>

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

      </div> */}
    </div>
  );
};

export default AddTransaksiListBarang;
