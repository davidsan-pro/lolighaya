import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

const DisplayAddTransaksiListBarang = ({ barang, idToko, idRute }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = barang.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const [cartList, setCartList] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  let arrCart = [];

  useEffect(() => {
    // get the 'cartList' localstorage
    arrCart = JSON.parse(localStorage.getItem('cartList') || '[]');
    console.log('arrcart', arrCart);
    // //load persisted cart into state if it exists
    // setCartList(localCart || []);
    // console.log('cartlist', cartList);
  }, []);

  const handleClick = (e, item) => {
    e.preventDefault();
    console.log('item', item, cartList);

    // kalau item tsb blm ada di localStorage 'cartList' maka tambahkan sbg item baru
    const exist = cartList.find((x) => x.id === item.id && x.id_toko === item.id_toko);
    console.log('arrcart0', arrCart);
    console.log(exist ? 'exist' : 'not exist')
    if ( ! exist) {
      item.id_toko = searchParams.get('id_toko');
      item.titip = 0 
      item.sisa = 0 
      item.laku = 0
      item.subtotal = 0
      arrCart.push(item);
      // console.log('arrcart1', arrCart);
      localStorage.setItem('cartList', JSON.stringify(arrCart));
    }
    const href = `/checkout_transaksi/${idRute}?id_toko=${idToko}`;
    console.log('href', href);
    // // const selected = e.target.id;
    // // const arr = e.target.id.split('-');
    // // const selectedID = arr[1];
    // // console.log(`id: ${selectedID}`);
    // // const tmp = JSON.parse(localStorage.getItem('cartList'));
    // // console.log('tmp', tmp);
    // // item.idToko = idToko;
    // // item.titip = 0;
    // // item.sisa = 0;
    // // item.laku = 0;
    // // arrCart.push(item);
    // // console.log('arr', arrCart, JSON.stringify(arrCart));
    // localStorage.setItem('cartList', JSON.stringify(cartList));
    // // setCartItem({...cartItem, id: selectedID});
    // // console.log('cart item', cartItem);
    navigate(href);
    // return;
    // setCartList({...cartList, cartItem});
    // console.log('cart list', cartList);

    // let cartCopy = [...cartList];
    // console.log('cartlist', cartCopy);
    
    // let itemIndex = -1;
    // for (let i=0; i<cartCopy.length; i++) {
    //   if (cartCopy[i].id === selectedID) {
    //     itemIndex = i;
    //   }
    // }
    // // kalau item tsb blm ada di localstorage 'cartList' maka tambahkan ke localstorage tsb
    // if (itemIndex < 0) {
    //   cartCopy.push(item);
    // } 
    // console.log('cartcopy', cartCopy);
    // //update app state
    // setCartList(cartCopy);
    
    // //make cart a string and store in local space
    // localStorage.setItem("cartList", JSON.stringify(cartCopy));

    // navigate(`/checkout_transaksi/${id}?id_toko=${idToko}`);
  }

  return (
    <div className="content-container">
      <div className="mb-3">
        {
          currentItems.length > 0
          ? (
            currentItems.map((item, index) => (
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
                      <a id={`item-${item.id}`} 
                      onClick={(e) => handleClick(e, item)}>
                        {item.nama}
                      </a>
                      {/* <Link to={`/add_transaksi_detail_barang/${idRute}?id_toko=${idToko}&id_barang=${item.id}`}>
                        {item.nama}
                      </Link> */}
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
      </div>

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