// import { useState } from "react";
import moment from "moment";
import "moment/locale/id";
import { useLocation, useNavigate } from "react-router-dom";
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
  } else if (location.pathname === "/pilih_hari") {
    title = "Pilih Hari";
  } else if (location.pathname === "/master") {
    title = "Menu Database";
  } else if (location.pathname === "/master_user") {
    title = "Master User";
  } else if (location.pathname === "/add_user") {
    title = "Tambah User";
  } else if (location.pathname === "/edit_user") {
    title = "Edit User";
  } else if (location.pathname === "/master_barang") {
    title = "Master Barang";
  } else if (location.pathname === "/add_barang") {
    title = "Tambah Barang";
  } else if (location.pathname === "/edit_barang") {
    title = "Edit Barang";
  } else if (location.pathname === "/master_toko") {
    title = "Master Toko";
  } else if (location.pathname === "/add_toko") {
    title = "Tambah Toko";
  } else if (location.pathname === "/edit_toko") {
    title = "Edit Toko";
  } else if (location.pathname.indexOf("/edit_user") === 0) {
    title = "Edit User";
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
          <span>LoliGhaya</span>
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
