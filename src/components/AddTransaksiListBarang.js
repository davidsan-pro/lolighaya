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

  const { id } = useParams(); // id rute
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
    </div>
  );
};

export default AddTransaksiListBarang;
