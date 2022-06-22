import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Spinner, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import * as fn from "../MyFunctions";

const AddTransaksiDetailBarang = () => {
  const [barang, setBarang] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams(); // id rute
  const [searchParams, setSearchParams] = useSearchParams();
  const idToko = searchParams.get("id_toko"); // id toko
  const idBarang = searchParams.get("id_barang"); // id barang
  let localCart = [];

  useEffect(() => {
    getBarang();
    // setCartItem(barang);
    // console.log('cart item', cartItem);
    
    //turn it into js
    if (localStorage.getItem("cartList")) {
      localCart = JSON.parse(localStorage.getItem("cartList"));
    }
    //load persisted cart into state if it exists
    setCartList(localCart);
  }, []);

  const getBarang = async (query='') => {
    setIsLoading(true);
    let myurl = `${global.config.base_url}/barang/${idBarang}`;
    let qsArr = [];
    qsArr.push(`id_toko=${idToko}`); // spy bs mendapatkan data barang dr trx terakhir di toko ini
    if (query) {
      qsArr.push(`q=${query}`);
    }
    if (qsArr) {
      const qs = qsArr.join('&');
      myurl += `?${qs}`;
    }
    const response = await fetch(myurl);
    let data = await response.json();
    console.log('cartlist', cartList);
    // data barang yg ditampilkan dipengaruhi oleh jumlah yg dititipkan dlm trx ini ke toko ini
    cartList.forEach(row => {
      if (row.id === data.id) {
        data.stok -= row.titip;
      }
    });
    data.titip = 0;
    data.sisa = 0;
    data.laku = 0;
    setBarang(data);
    setCartItem(data);
    setIsLoading(false);
  };

  const resetInput = (e) => {
    setCartItem({...cartItem, harga: barang.harga});
  }

  // func.utk meng-handle event ubah isian input box
  const handleChangeInput = (e) => {
    const arr = e.target.id.split('-'); // ['input_titip', '1']
    const targetID = arr.length > 0 ? arr[1] : ''; // 1 (integer)
    let value = e.target.value;
    console.log('target id', e.target.id, value);
    value = parseInt(value.replace(/\D/g,''));
    if (arr[0] === 'input_titip') {
      if (value > cartItem.stok) {
        value = cartItem.stok;
      }
      setCartItem({...cartItem, titip: value});
    } 
    else if (arr[0] === 'input_sisa') {
      setCartItem({...cartItem, sisa: value});
    } 
    else if (arr[0] === 'input_laku') {
      setCartItem({...cartItem, laku: value});
    } 
    else if (arr[0] === 'input_harga') {
      setCartItem({...cartItem, harga: value});
    }
  }
  // end const handleChangeInput 

  const selectAllText = (e) => {
    e.target.select();
  }

  const addCartItem = (item) => {
    item.idToko = idToko;
    //create a copy of our cart state, avoid overwritting existing state
    let cartCopy = [...cartList]
    console.log('cartlist', cartCopy, item);
    
    let itemIndex = -1;
    for (let i=0; i<cartCopy.length; i++) {
      if (cartCopy[i].id === item.id) {
        itemIndex = i;
      }
    }
    if (itemIndex < 0) {
      cartCopy.push(item);
    } else {
      cartCopy[itemIndex].jumlahTitip += item.jumlahTitip;
      cartCopy[itemIndex].stok -= item.jumlahTitip;
    }
    
    //update app state
    setCartList(cartCopy);
    
    //make cart a string and store in local space
    localStorage.setItem("cartList", JSON.stringify(cartCopy));

    navigate(`/add_transaksi_toko/${id}?id_toko=${idToko}`);
  }

  const editCartItem = (itemID, amount) => {
    let cartCopy = [...cartList];
    
    //find if item exists, just in case
    let existentItem = cartCopy.find(item => item.ID == itemID);
    
    //if it doesnt exist simply return
    if (!existentItem) return
    
    //continue and update quantity
    existentItem.jumlahTitip += amount;
    
    //validate result
    if (existentItem.jumlahTitip <= 0) {
      //remove item  by filtering it from cart array
      cartCopy = cartCopy.filter(item => item.ID != itemID)
    }
    
    //again, update state and localState
    setCartList(cartCopy);
    
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cartList', cartString);
  }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div className="container">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-5">{barang.nama}</p>
                  <div className="subtitle is-6">
                    <div className="mb-2">
                      Harga: Rp {fn.thousandSeparator(barang.harga)}, 
                      <br/>
                      Stok: {fn.thousandSeparator(barang.stok)}
                    </div>
                    <div className="mb-2">
                      <DropdownButton id="dropdown-basic-button" title="Actions" size="sm">
                        <Dropdown.Item as={Link} to={`/edit_barang/${barang.id}`}>Edit Barang</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </div>
                </div>
              </div>

              <div className="simple-table" style={{width:"100%"}}>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Titip</th>
                      <th>Sisa</th>
                      <th>Laku</th>
                      <th>Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{paddingLeft:".5rem"}}>
                        <input type="numeric" 
                        id={`input_titip-${idBarang}`}
                        value={cartItem.jumlahTitip | 0}
                        onFocus={selectAllText}
                        onChange={handleChangeInput}
                        />
                      </td>
                      <td>
                        <input type="numeric" 
                        id={`input_sisa-${idBarang}`}
                        value={cartItem.jumlahSisa | 0}
                        onFocus={selectAllText}
                        onChange={handleChangeInput}
                        />
                      </td>
                      <td>
                        <input type="numeric" 
                        id={`input_laku-${idBarang}`}
                        value={cartItem.jumlahLaku | 0}
                        onFocus={selectAllText}
                        onChange={handleChangeInput}
                        />
                      </td>
                      <td>
                        <input type="numeric" 
                        id={`input_harga-${idBarang}`}
                        value={cartItem.jumlahHarga | 0}
                        onFocus={selectAllText}
                        onChange={handleChangeInput}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="fs-6 fw-bold is-flex is-justify-content-flex-end is-align-items-baseline">
                <label className="me-2">Total Nilai</label>
                <label className="me-2">Rp</label>
                <label className="fs-4">2.500.000</label>
              </div>

            </div>
          </div>
        </div> // /.container
        // <div className="is-flex is-justify-content-space-between">
        // </div>
        // <div className="card">
        //   <div className="card-image">
        //     <figure className="image is-4by3">
        //       <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
        //     </figure>
        //   </div>
        //   <div className="card-content">
        //     <div className="media">
        //       <div className="media-left">
        //         <figure className="image is-48x48">
        //           <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
        //         </figure>
        //       </div>
        //       <div className="media-content">
        //         <p className="title is-5">{barang.nama}</p>
        //         <div className="subtitle is-6">
        //           <div className="mb-2">
        //             Harga: Rp {fn.thousandSeparator(barang.harga)}, 
        //             <br/>
        //             Stok: {fn.thousandSeparator(barang.stok)}
        //           </div>
        //           <div className="mb-2">
        //             <DropdownButton id="dropdown-basic-button" title="Actions" size="sm">
        //               <Dropdown.Item as={Link} to={`/edit_barang/${barang.id}`}>Edit Barang</Dropdown.Item>
        //             </DropdownButton>
        //           </div>
        //         </div>
        //       </div>
        //     </div>

        //     <div className="content">

        //       <div className="mb-2 is-flex is-justify-content-space-between">
        //         <label className="me-2">Harga</label>
        //         <div>
        //           <Button variant="dark" size="sm" className="me-2" onClick={resetInput}>
        //             <FontAwesomeIcon icon={faRotateLeft} />
        //           </Button>
        //           <span className="me-2">Rp</span>
        //           <input type="text"
        //           style={{width:"100px"}}
        //           id={`input_harga-${idBarang}`}
        //           value={cartItem.harga}
        //           onChange={handleChangeInput}
        //           onFocus={selectAllText}
        //           />
        //         </div>
        //       </div>
        //       <div className="mb-2 is-flex is-justify-content-space-between">
        //         <label className="me-2">Jumlah Titip</label>
        //         <input type="text"
        //         style={{width:"100px"}}
        //         id={`input_titip-${idBarang}`}
        //         value={cartItem.jumlahTitip}
        //         onChange={handleChangeInput}
        //         onFocus={selectAllText}
        //         />
        //       </div>
        //       <div className="mb-2 is-flex is-justify-content-space-between">
        //         <label className="me-2">Jumlah Sisa</label>
        //         <input type="text"
        //         style={{width:"100px"}}
        //         id={`input_sisa-${idBarang}`}
        //         value={cartItem.jumlahSisa}
        //         onChange={handleChangeInput}
        //         onFocus={selectAllText}
        //         />
        //       </div>
        //       <div className="mb-2 is-flex is-justify-content-space-between">
        //         <label className="me-2">Jumlah Laku</label>
        //         <input type="text"
        //         style={{width:"100px"}}
        //         id={`input_laku-${idBarang}`}
        //         value={cartItem.jumlahLaku}
        //         onChange={handleChangeInput}
        //         onFocus={selectAllText}
        //         />
        //       </div>
        //       <div className="mb-2">
        //         <label className="me-2">Keterangan</label>
        //         <br/>
        //         <textarea style={{width:"100%"}} 
        //         id={`keterangan-${idBarang}`}
        //         onFocus={selectAllText}></textarea>
        //       </div>

        //       <hr/>

        //       <div className="mb-2 fs-4 is-flex is-justify-content-flex-end">
        //         <label className="me-2">Subtotal</label>
        //         <strong>Rp {fn.thousandSeparator(cartItem.harga * cartItem.jumlahLaku)}</strong>
        //       </div>

        //       <div className="d-grid gap-2">
        //         <Button variant="primary" size="lg" onClick={() => addCartItem(cartItem)}>
        //           Submit
        //         </Button>
        //       </div>

        //     </div>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default AddTransaksiDetailBarang;
