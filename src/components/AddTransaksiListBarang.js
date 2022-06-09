import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";
// import Pagination from "./Pagination";
import DisplayAddTransaksiListBarang from "./DisplayAddTransaksiListBarang";

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

  // const addCartItem = (item) => {
  //   item.id_toko = idToko;
  //   //create a copy of our cart state, avoid overwritting existing state
  //   let cartCopy = [...cartList];
  //   console.log('cartlist', cartList)
    
  //   //assuming we have an ID field in our item
  //   let {ID} = item;
  //   console.log(item, cartItem);
    
  //   //look for item in cart array
  //   let existingItem = cartCopy.find(cartItem => cartItem.ID == ID);
    
  //   //if item already exists
  //   if (existingItem) {
  //     existingItem.jumlahTitip += item.jumlahTitip; //update item
  //   } else { //if item doesn't exist, simply add it
  //     cartCopy.push(item);
  //   }
    
  //   //update app state
  //   setCartList(cartCopy);
    
  //   //make cart a string and store in local space
  //   let stringCart = JSON.stringify(cartCopy);
  //   localStorage.setItem("cartList", stringCart);
  // }

  // const editCartItem = (itemID, amount) => {
  //   let cartCopy = [...cartList];
    
  //   //find if item exists, just in case
  //   let existentItem = cartCopy.find(item => item.ID == itemID);
    
  //   //if it doesnt exist simply return
  //   if (!existentItem) return
    
  //   //continue and update quantity
  //   existentItem.jumlahTitip += amount;
    
  //   //validate result
  //   if (existentItem.jumlahTitip <= 0) {
  //     //remove item  by filtering it from cart array
  //     cartCopy = cartCopy.filter(item => item.ID != itemID)
  //   }
    
  //   //again, update state and localState
  //   setCartList(cartCopy);
    
  //   let cartString = JSON.stringify(cartCopy);
  //   localStorage.setItem('cartList', cartString);
  // }

  // const getTokoById = async (id) => {
  //   let myurl = `${global.config.base_url}/toko/${id}`;
  //   const response = await fetch(myurl);
  //   const data = await response.json();
  //   setToko(data);
  // }

  const getBarang = async (query='') => {
    setIsLoading(true);
    let myurl = `${global.config.base_url}/barang`;
    if (query) {
      myurl += `?q=${query}`;
    }
    const response = await fetch(myurl);
    let data = await response.json();
    data.forEach((item, index) => {
      cartList.forEach(row => {
        if (row.id === item.id) {
          item.stok -= row.jumlahTitip;
        }
      });
      item.jumlahTitip = 0;
      item.isChecked = false;
    });
    setBarang(data);
    setIsLoading(false);
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);

  // // get current item
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItem = barang.slice(indexOfFirstItem, indexOfLastItem);

  // // change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // const saveToko = async (e) => {
  //   e.preventDefault();

  //   const toko = { nama, alamat, foto, kecamatan, kota, telepon };
  //   await fetch(`${global.config.base_url}/toko`, {
  //     method: 'POST',
  //     body: JSON.stringify(toko),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });

  //   // setelah selesai, redirect ke hal.master toko
  //   navigate("/master_toko");
  // };

  return (
    <div className="container">
      <div>
        <SearchBar onSearch={getBarang} keywordType="nama barang"/>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayAddTransaksiListBarang barang={barang} idToko={idToko} idRute={id} />}
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
