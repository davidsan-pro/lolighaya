// import { useState } from "react";
import moment from "moment";
import "moment/locale/id";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";

const Header = () => {
  // const curday = moment().locale('id').format('dddd');
  // const curdate = moment().format("DD-MM-YYYY");
  // const curtime = moment().format("HH:mm:ss");
  const curdatetime = moment().locale("id").format("dddd, DD-MM-YYYY");
  const navigate = useNavigate();

  const location = useLocation();
  // console.log("location", location);
  let title = "";
  if (location.pathname === "/" || location.pathname === "") {
    title = "Dashboard";
  } else if (location.pathname.indexOf("/rute_list_toko") === 0) {
    title = "Detail Rute";
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
  }

  return (
    <>
      <header className="fs-2 fw-bold pb-1" style={{ backgroundColor: "royalblue", color: "#fff" }}>
        <div className="d-flex justify-content-between align-items-center">
          {
            // tombol Back hanya ditampilkan selain di hal.dashboard
            location.pathname !== "/" ? (
              <Button variant="primary" className="ms-3 btn-lg" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
              </Button>
            ) : (
              <Button className="ms-3 btn-lg" style={{ opacity: "0" }}></Button>
            )
          }
          <div>
            <span>
              LoliGhaya
            </span>
            {/* <Link to="/">
              LoliGhaya
            </Link> */}
          </div>
          <Sidebar />
        </div>
      </header>
      <div className="mb-1 ml-5">
        <small>{curdatetime}</small>
      </div>
      <h3 className="has-text-centered mb-3">
        <strong>{title.toUpperCase()}</strong>
      </h3>
    </>
  );
};

export default Header;
