import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/id";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
import * as fn from "../MyFunctions";

const Header = () => {
  // const curday = moment().locale('id').format('dddd');
  // const curdate = moment().format("DD-MM-YYYY");
  // const curtime = moment().format("HH:mm:ss");
  const [searchParams] = useSearchParams({});
  const curdatetime = fn.formatDate(new Date(), 'full-date');
  const navigate = useNavigate();
  const location = useLocation();

  console.log('header location', location);
  // const { id } = useParams();
  const id = location.pathname.split('/').pop();
  const idRute = searchParams.get('id_rute');
  const idToko = searchParams.get('id_toko');
  console.log('header asd1', id, idRute);

  const loginData = fn.getCurrentLogin();

  // const prevPath = props.location.state || '/dashboard';
  // console.log('prevpath', prevPath);

  // console.log("location", location);
  const pathurl = window.location.hash || window.location.pathname;
  const arrHash = pathurl.split('/');
  let curPageName = arrHash.length > 0 ? arrHash[1] : '';
  curPageName = curPageName.split('?')[0];
  // console.log('asd1', arrHash, curPageName);
  let title = "";
  let prevPage = "";
  if (curPageName === "" || !window.location.hash) {
    title = "Login";
  } else if (curPageName === "forgot_password") {
    title = "Reset Password User";
  } else if (curPageName === "dashboard") {
    title = "Dashboard";
  } else if (curPageName === "rute_list_toko") {
    title = "Daftar Toko di Rute";
    prevPage = "/dashboard";
  } else if (curPageName === "rute_detail_toko") {
    title = "Detail Toko di Rute";
    prevPage = `/rute_list_toko/${id}`;
    // } else if (curPageName === "pilih_hari") {
      //   title = "Pilih Hari";
  } else if (curPageName === "checkout_transaksi") {
    title = "Ringkasan Nota";
    prevPage = `/rute_detail_toko/${id}?id_toko=${idToko}`;
  } else if (curPageName === "transaksi_detail") {
    title = "Detail Transaksi";
  } else if (curPageName === "master") {
    title = "Menu Master";
  } else if (curPageName === "view_user") {
    title = "Detail User";
  } else if (curPageName === "master_user") {
    title = "Master User";
  } else if (curPageName === "add_user") {
    title = "Tambah User";
  } else if (curPageName === "edit_user") {
    title = "Edit User";
  } else if (curPageName === "view_barang") {
    title = "Detail Barang";
  } else if (curPageName === "master_barang") {
    title = "Master Barang";
  } else if (curPageName === "add_barang") {
    title = "Tambah Barang";
  } else if (curPageName === "edit_barang") {
    title = "Edit Barang";
  } else if (curPageName === "view_toko") {
    title = "Detail Toko";
    prevPage = `/rute_list_toko/${idRute}`;
  } else if (curPageName === "master_toko") {
    title = "Master Toko";
  } else if (curPageName === "add_toko") {
    title = "Tambah Toko";
  } else if (curPageName === "edit_toko") {
    title = "Edit Toko";
  } else if (curPageName === "master_rute") {
    title = "Master Rute";
  } else if (curPageName === "add_rute") {
    title = "Tambah Rute";
  } else if (curPageName === "edit_rute") {
    title = "Edit Rute";
  } else if (curPageName === "master_rute_list") {
    title = "List Rute";
  } else if (curPageName === "add_rute_list") {
    title = "Ubah Rute - Tambah Toko";
    prevPage = `/rute_list_toko/${id}`;
  } else if (curPageName === "master_edit_rute") {
    title = "Master Edit Rute";
  } else if (curPageName === "master_transaksi") {
    title = "Master Transaksi";
  } else if (curPageName === "add_transaksi_toko") {
    title = "Transaksi Baru";
    prevPage = `/rute_list_toko/${id}`;
  } else if (curPageName === "add_transaksi_toko_nota") {
    title = "Transaksi Baru";
    prevPage = `/rute_list_toko/${id}`;
  } else if (curPageName === "add_transaksi_list_barang") {
    title = "Transaksi Baru<br/>Pilih Barang";
    prevPage = `/checkout_transaksi/${id}`;
    if (searchParams.get('id_toko')) {
      prevPage += `?id_toko=${searchParams.get('id_toko')}`;
    }
  } else if (curPageName === "add_transaksi_detail_barang") {
    title = "Transaksi Baru<br/>Detail Barang";
  } else if (curPageName === "histori_transaksi_toko") {
    title = "Histori Transaksi";
  } else if (curPageName === "detail_histori_transaksi_toko") {
    title = "Detail Histori Transaksi";
  }
  // console.log('title', title);
  // {console.log('pathname', window.location.pathname)}
  // {console.log('hash', window.location.hash)}
  // {console.log('hasharr', window.location.hash.split('/'))}

  const gotoPrevPage = () => {
    console.log('backurl', searchParams.get('back_url'));
    let goto = -1;
    const backURL = searchParams.get('back_url');
    if (backURL) {
      goto = backURL;
    } else if (prevPage) {
      goto = prevPage;
    }
    navigate(goto);
  }

  return (
    <>
      <header className="fs-2 fw-bold pb-1 mb-2" style={{ backgroundColor: "royalblue", color: "#fff" }}>
        <div className="is-flex is-justify-content-space-between">
          <div>
            {
              // tombol Back hanya ditampilkan selain di hal.dashboard
              !["/", "/dashboard"].includes(location.pathname) 
              ? (
                <Button variant="primary" className="ms-2 btn-lg" onClick={() => gotoPrevPage()}>
                  <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </Button>
              ) 
              : <Button style={{opacity:"0"}} className="btn-lg hidden">
                  <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </Button>
            }
          </div>
          <div>
            <span>LoliGhaya</span>
          </div>
          <div>
            {loginData.id && !["/"].includes(location.pathname) ? <Sidebar /> : ''}
          </div>
        </div>
        {/* <Row className="is-flex is-align-items-center">
          <Col xs={4}>
            {
              // tombol Back hanya ditampilkan selain di hal.dashboard
              !["/", "/dashboard"].includes(location.pathname) 
              ? (
                <Button variant="primary" className="ms-2 btn-lg" onClick={() => gotoPrevPage()}>
                  <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </Button>
              ) 
              : <div>&nbsp;</div>
            }
          </Col>
          <Col xs={4}>
            LoliGhaya
          </Col>
          <Col className="align-right" xs={4}>
            {loginData.id && !["/"].includes(location.pathname) ? <Sidebar /> : ''}
          </Col>
        </Row> */}
      </header>
      <div className="container pb-1">
        <div className="ms-2 mb-1 fs-6">
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
