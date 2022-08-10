import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { Spinner, Button, Table } from "react-bootstrap";
import { DropdownType, DropdownButton, SplitButton, Dropdown, ButtonGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import Pagination from "./Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import * as fn from "../MyFunctions";

const HistoriTransaksiToko = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toko, setToko] = useState({});
  const [historiTransaksi, setHistoriTransaksi] = useState([]);
  const [nilaiTotal, setNilaiTotal] = useState(0);
  const [fStartDate, setFStartDate] = useState("");
  const [fEndDate, setFEndDate] = useState("");
  const [fUsername, setFUsername] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams(); // id toko

  const navigate = useNavigate();

  useEffect(() => {
    getTokoById();
    getHistoriTransaksi();
  }, []);

  const getTokoById = async () => {
    const response = await fetch(`${fn.getBaseUrl()}/toko/${id}`);
    const data = await response.json();
    // console.log("data toko", data);
    setToko(data);
  };

  const getHistoriTransaksi = async () => {
    setIsLoading(true);

    let myurl = `${fn.getBaseUrl()}/Mtransaksi`;
    let qsArr = [];
    qsArr.push(`qf[]=id_toko&qv[]=${id}`);
    if (fStartDate !== "") {
      let tmpStartDate = fn.formatDate(fStartDate, "date-std").replace("/", "-"); // dd-mm-yyyy
      const tgl = tmpStartDate.slice(0, 2);
      const bln = tmpStartDate.slice(3, 5);
      const thn = tmpStartDate.slice(-4);
      tmpStartDate = `${thn}-${bln}-${tgl}`;
      qsArr.push(`qf[]=start_date&qv[]=${tmpStartDate}`);
    }
    if (fEndDate !== "") {
      let tmpEndDate = fn.formatDate(fEndDate, "date-std").replace("/", "-");
      const tgl = tmpEndDate.slice(0, 2);
      const bln = tmpEndDate.slice(3, 5);
      const thn = tmpEndDate.slice(-4);
      tmpEndDate = `${thn}-${bln}-${tgl}`;
      qsArr.push(`qf[]=end_date&qv[]=${tmpEndDate}`);
    }
    if (fUsername !== "") {
      qsArr.push(`qf[]=username&qv[]=${fUsername}`);
    }
    if (searchParams.get("sbf")) {
      // sort by field
      qsArr.push(`sbf=${searchParams.get("sbf")}`);
    }
    if (searchParams.get("sbm")) {
      // sort by mode (exact)
      qsArr.push(`sbm=${searchParams.get("sbm")}`);
    }
    let qs = qsArr.join("&");
    myurl += `?${qs}`;
    // console.log('myurl', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log("data trx", data);
    setHistoriTransaksi(data);
    let total = 0;
    data.map((item) => {
      total += item.nilai_transaksi;
    });
    setNilaiTotal(total);

    setIsLoading(false);
  };

  const handleClickRow = (idTransaksi) => {
    let href = `/detail_histori_transaksi_toko/${idTransaksi}`;
    // console.log("href", href);
    navigate(href);
  };

  const handleClickReset = () => {
    setFStartDate("");
    setFEndDate("");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historiTransaksi.slice(indexOfFirstItem, indexOfLastItem);
  console.log('histori transaksi', currentItems);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="mb-3 fs-4 text-center">
        [<strong>{toko.nama}</strong>]
      </div>
      <div className="mb-2 fs-7">
        <div className="mb-3">
          <div className="mb-1">Tanggal Transaksi</div>
          <div className="mb-2 is-flex is-align-items-baseline">
            <DatePicker selected={fStartDate} className="date-picker me-2 text-center" placeholderText="dd/mm/yyyy" onChange={(date) => setFStartDate(date)} dateFormat="dd/MM/yyyy" maxDate={new Date()} />
            <span className="me-2">s/d</span>
            <DatePicker selected={fEndDate} className="date-picker text-center" placeholderText="dd/mm/yyyy" onChange={(date) => setFEndDate(date)} dateFormat="dd/MM/yyyy" maxDate={new Date()} />
          </div>
        </div>
        <div className="mb-3">
          <span className="me-2">Username</span>
          <input type="text" 
          style={{width:"150px"}} 
          placeholder="username pembuat nota"
          value={fUsername}
          onChange={(e) => setFUsername(e.target.value)}
          onFocus={(e) => e.target.select()}
          />
        </div>
        <div className="is-flex is-justify-content-space-between">
          <div>
            <Button variant="info" className="me-2" size="sm" onClick={() => getHistoriTransaksi()}>
              Terapkan
            </Button>
            <Button variant="warning" size="sm" onClick={() => handleClickReset()}>
              Reset
            </Button>
          </div>
          <div>
            {[DropdownButton].map((DropdownType, idx) => (
              <DropdownType
                as={ButtonGroup}
                key={idx}
                id={`dropdown-button-drop-${idx}`}
                size="sm"
                variant="info"
                title="Urutkan"
              >
                <Dropdown.Item eventKey="1" value="newest">Terbaru</Dropdown.Item>
                <Dropdown.Item eventKey="2" value="oldest">Terlama</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" value="highesttotal">Nilai Tertinggi</Dropdown.Item>
                <Dropdown.Item eventKey="4" value="leasttotal">Nilai Terendah</Dropdown.Item>
              </DropdownType>
            ))}
          </div>
        </div>
      </div>

      <hr className="mb-0" />

      {
        isLoading 
        ? (<Spinner animation="border" />) 
        : (
          <>
            <div className="table-container mb-0">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Username</th>
                    <th>Total</th>
                    <th>Menu</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={item.id} className="link" onClick={() => handleClickRow(item.id)}>
                        <td>{fn.formatDate(item.created_at)}</td>
                        <td>{item.username}</td>
                        <td className="align-right">
                          Rp {fn.thousandSeparator(item.nilai_transaksi)}
                        </td>
                        <td>
                          {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                              as={ButtonGroup}
                              key={idx}
                              id={`dropdown-button-drop-${idx}`}
                              size="sm"
                              variant="info"
                              className="no-arrow"
                              title={
                                <FontAwesomeIcon icon={faBars} />
                              }
                            >
                              <Dropdown.Item 
                                eventKey="1" 
                                value="newest"
                                className="no-arrow"
                              >
                                Kirim ke WhatsApp
                              </Dropdown.Item>
                            </DropdownType>
                          ))}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {historiTransaksi.length > 0 ? (
              <div className="align-right mb-3 me-2">
                <span className="me-2 fs-6">Total: Rp</span>
                <span className="fw-bold fs-4">{fn.thousandSeparator(nilaiTotal)}</span>
              </div>
            ) : (
              ""
            )}
          </>
        )
      }

      {
        // pagination hanya ditampilkan kalau ada datanya
        historiTransaksi.length > 0 
        ? <>
            <div className="mb-3">
              <Pagination itemsPerPage={itemsPerPage} 
                totalItems={historiTransaksi.length} 
                paginate={paginate} 
                curPageNumber={currentPage} 
              />
            </div>
            <div className="d-grid">
              <Button variant="primary" 
              size="lg" 
              onClick={() => fn.handleClickExportToExcel(historiTransaksi)}>
                Export ke Excel
              </Button>
            </div>
          </> 
        : ""
      }
    </div>
  );
};

export default HistoriTransaksiToko;
