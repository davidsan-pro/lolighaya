import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";

const Header = () => {
  const [loginData, setLoginData] = useState({
    id: '',
    username: '',
    email: '',
    telepon: '',
    last_login: '',
  });

  useEffect(() => {
    let tmp = JSON.parse(localStorage.getItem('loginData') || '{}');
    if (typeof tmp.id != 'undefined') {
      setLoginData(tmp);
    }
  }, [loginData]);
  
  // const curday = moment().locale('id').format('dddd');
  // const curdate = moment().format("DD-MM-YYYY");
  // const curtime = moment().format("HH:mm:ss");
  const curdatetime = moment().locale("id").format("dddd, DD-MM-YYYY");
  const navigate = useNavigate();

  const location = useLocation();
  // console.log("location", location);
  let title = "";
  if (location.pathname === "/" || location.pathname === "") {
    if (loginData.id !== '') {
      title = "Dashboard";
    } else {
      title = "Halaman Login";
    }
  } else if (location.pathname.indexOf("/rute_list_toko") === 0) {
    title = "Daftar Toko di Rute";
  } else if (location.pathname.indexOf("/rute_detail_toko") === 0) {
    title = "Detail Rute - Toko";
  } else if (location.pathname === "/pilih_hari") {
    title = "Pilih Hari";
  } else if (location.pathname === "/master") {
    title = "Menu Master";
  } else if (location.pathname.indexOf("/view_user") === 0) {
    title = "Detail User";
  } else if (location.pathname === "/master_user") {
    title = "Master User";
  } else if (location.pathname === "/add_user") {
    title = "Tambah User";
  } else if (location.pathname.indexOf("/edit_user") === 0) {
    title = "Edit User";
  } else if (location.pathname.indexOf("/view_barang") === 0) {
    title = "Detail Barang";
  } else if (location.pathname === "/master_barang") {
    title = "Master Barang";
  } else if (location.pathname === "/add_barang") {
    title = "Tambah Barang";
  } else if (location.pathname.indexOf("/edit_barang") === 0) {
    title = "Edit Barang";
  } else if (location.pathname.indexOf("/view_toko") === 0) {
    title = "Detail Toko";
  } else if (location.pathname === "/master_toko") {
    title = "Master Toko";
  } else if (location.pathname === "/add_toko") {
    title = "Tambah Toko";
  } else if (location.pathname.indexOf("/edit_toko") === 0) {
    title = "Edit Toko";
  } else if (location.pathname === "/master_rute") {
    title = "Master Rute";
  } else if (location.pathname === "/add_rute") {
    title = "Tambah Rute";
  } else if (location.pathname.indexOf("/edit_rute") === 0) {
    title = "Edit Rute";
  } else if (location.pathname.indexOf("/master_rute_list") === 0) {
    title = "List Rute";
  } else if (location.pathname.indexOf("/add_rute_list") === 0) {
    title = "Tambah Rute - Toko";
  } else if (location.pathname.indexOf("/master_transaksi") === 0) {
    title = "Master Transaksi";
  } else if (location.pathname.indexOf("/add_transaksi_toko/") === 0) {
    title = "Transaksi Baru";
  } else if (location.pathname.indexOf("/add_transaksi_list_barang/") === 0) {
    title = "Transaksi Baru<br/>Pilih Barang";
  } else if (location.pathname.indexOf("/add_transaksi_detail_barang/") === 0) {
    title = "Transaksi Baru<br/>Detail Barang";
  }

  return (
    <>
      <header className="fs-2 fw-bold pb-1" style={{ backgroundColor: "royalblue", color: "#fff" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {
              // tombol Back hanya ditampilkan selain di hal.dashboard
              location.pathname !== "/" ? (
                <Button variant="primary" className="ms-3 btn-lg" onClick={() => navigate(-1)}>
                  <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </Button>
              ) : 
              ''
            }
          </div>
          <div>
            <span>
              LoliGhaya
            </span>
            {/* <Link to="/">
              LoliGhaya
            </Link> */}
          </div>
          <div>
            {loginData.id !== '' ? <Sidebar /> : ''}
          </div>
        </div>
      </header>
      <div className="mb-1 ml-5">
        <small>{curdatetime}</small>
      </div>
      <h3 className="has-text-centered mb-3">
        <strong style={{whiteSpace:"pre-line"}}>
          {title.replace('<br/>', '\n').toUpperCase()}
        </strong>
      </h3>
    </>
  );
};

export default Header;
