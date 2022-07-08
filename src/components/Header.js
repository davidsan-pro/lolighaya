import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
import * as fn from "../MyFunctions";

const Header = () => {
  // const curday = moment().locale('id').format('dddd');
  // const curdate = moment().format("DD-MM-YYYY");
  // const curtime = moment().format("HH:mm:ss");
  const curdatetime = fn.formatDate(null, 'date-long');
  const navigate = useNavigate();
  const location = useLocation();

  const loginData = fn.getCurrentLogin();

  // useEffect(() => {
  //   setLoginData(JSON.parse(localStorage.getItem('loginData') || '{}'));
  // }, []);

  // console.log("location", location);
  let title = "";
  if (location.pathname === "/" || location.pathname === "") {
    title = "Login";
  } else if (location.pathname === "/dashboard") {
    title = "Dashboard";
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
  } else if (location.pathname.indexOf("/master_edit_rute/") === 0) {
    title = "Master Edit Rute";
  } else if (location.pathname.indexOf("/master_transaksi") === 0) {
    title = "Master Transaksi";
  } else if (location.pathname.indexOf("/add_transaksi_toko/") === 0) {
    title = "Transaksi Baru";
  } else if (location.pathname.indexOf("/add_transaksi_list_barang/") === 0) {
    title = "Transaksi Baru<br/>Pilih Barang";
  } else if (location.pathname.indexOf("/add_transaksi_detail_barang/") === 0) {
    title = "Transaksi Baru<br/>Detail Barang";
  } else if (location.pathname.indexOf("/histori_transaksi_toko/") === 0) {
    title = "Histori Transaksi";
  } else if (location.pathname.indexOf("/detail_histori_transaksi_toko/") === 0) {
    title = "Detail Histori Transaksi";
  }

  return (
    <>
      <header className="fs-2 fw-bold pb-1 mb-2" style={{ backgroundColor: "royalblue", color: "#fff" }}>
        <Row className="is-flex is-align-items-center">
          <Col>
            {
              // tombol Back hanya ditampilkan selain di hal.dashboard
              !["/", "/dashboard"].includes(location.pathname) 
              ? (
                <Button variant="primary" className="ms-2 btn-lg" onClick={() => navigate(-1)}>
                  <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </Button>
              ) 
              : ''
            }
          </Col>
          <Col>
              LoliGhaya
            {/* <Link to="/">
              LoliGhaya
            </Link> */}
          </Col>
          {/*console.log('asd1', loginData.id, location.pathname)*/}
          <Col className="align-right">
            {loginData.id && !["/"].includes(location.pathname) ? <Sidebar /> : ''}
          </Col>
        </Row>
      </header>
      <div className="container pb-1">
        <div className="mb-1 fs-6">
          {curdatetime}
        </div>
        <h3 className="has-text-centered">
          <strong style={{whiteSpace:"pre-line"}}>
            {title.replace('<br/>', '\n').toUpperCase()}
          </strong>
        </h3>
      </div>
    </>
  );
};

export default Header;
