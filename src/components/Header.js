import React, { useState } from "react";
import moment from "moment";
import "moment/locale/id";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  // const curday = moment().locale('id').format('dddd');
  // const curdate = moment().format("DD-MM-YYYY");
  // const curtime = moment().format("HH:mm:ss");
  const curdatetime = moment().locale("id").format("dddd, DD-MM-YYYY");
  const navigate = useNavigate();

  const location = useLocation();
  // console.log("location", location);
  let title = "";
  if (location.pathname === "/") {
    title = "Dashboard";
  } else if (location.pathname === "/pilih_hari") {
    title = "Pilih Hari";
  } else if (location.pathname === "/master") {
    title = "Menu Database";
  } else if (location.pathname === "/master_user") {
    title = "Master User";
  } else if (location.pathname === "/add_user") {
    title = "Tambah User";
  } else if (location.pathname.indexOf("/edit_user") === 0) {
    title = "Edit User";
  }

  return (
    <>
      <header className="fs-2 fw-bold pb-1" style={{ backgroundColor: "royalblue", color: "#fff" }}>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" className="ms-3 btn-lg" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          </Button>
          <span>LoliGhaya</span>
          <Button variant="primary" className="me-2 btn-lg">
            <FontAwesomeIcon icon="fa-solid fa-bars" />
          </Button>
        </div>
      </header>
      <div className="mb-1 ml-3">
        <small>{curdatetime}</small>
      </div>
      <h3 className="has-text-centered mb-3">
        <strong>{title.toUpperCase()}</strong>
      </h3>
    </>
  );
};

export default Header;
