import React from "react";
import moment from "moment";
import "moment/locale/id";
import { useLocation, useNavigate } from "react-router-dom";

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
      <header className="is-size-3 is-flex is-justify-content-space-between is-align-items-center">
        <span className="icon clickable" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </span>
        <span>LoliGhaya</span>
        <span style={{ opacity: 0 }}>
          <i className="fas fa-arrow-left"></i>
        </span>
      </header>
      <div className="mb-1">
        <small>{curdatetime}</small>
      </div>
      <h3 className="has-text-centered mb-3">
        <strong>{title.toUpperCase()}</strong>
      </h3>
    </>
  );
};

export default Header;
