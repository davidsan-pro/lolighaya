import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import '../../node_modules/react-datepicker/dist/react-datepicker.css';
import Pagination from "./Pagination";
import * as fn from "../MyFunctions";

const HistoriTransaksiToko = () => {
  const [toko, setToko] = useState({});
  const [historiTransaksi, setHistoriTransaksi] = useState([]);
  const [nilaiTotal, setNilaiTotal] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [useFilter, setUseFilter] = useState(false);
  // const [nama, setNama] = useState("");
  // const [alamat, setAlamat] = useState("");
  // const [telepon, setTelepon] = useState("");
  // const [foto, setFoto] = useState("");
  // const [kecamatan, setKecamatan] = useState("");
  // const [kota, setKota] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams(); // id toko
  let total = 0;

  const navigate = useNavigate();

  useEffect(() => {
    getTokoById();
    getHistoriTransaksi();
  }, []);

  const handleClickFilter = (e) => {
    console.log('filter', e.target.id, e.target.value);
  }

  const getTokoById = async () => {
    const response = await fetch(`${global.config.base_url}/toko/${id}`);
    const data = await response.json();
    console.log('data toko', data);
    setToko(data);
  };

  const getHistoriTransaksi = async () => {
    let myurl = `${global.config.base_url}/Mtransaksi`;
    let qsArr = [];
    qsArr.push(`qf=id_toko&qv=${id}`);
    if (searchParams.get('sbf')) {
      qsArr.push(`sbf=${searchParams.get('sbf')}`);
    }
    if (searchParams.get('sbm')) {
      qsArr.push(`sbm=${searchParams.get('sbm')}`);
    }
    let qs = qsArr.join('&');
    myurl += `?${qs}`;
    const response = await fetch(myurl);
    const data = await response.json();
    console.log('data trx', data);
    setHistoriTransaksi(data);
    let total = 0;
    data.map(item => {
      total += item.nilai_transaksi;
    });
    setNilaiTotal(total);
  }

  const handleClickRow = (idTransaksi) => {
    let href = `/detail_histori_transaksi_toko/${idTransaksi}`
    console.log('href', href);
    navigate(href);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // get current item
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historiTransaksi.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="mb-3 fs-4 text-center">
        [<strong>{toko.nama}</strong>]
      </div>
      <div className="mb-2 fs-7">
        <div className="mb-2">Filter Tanggal Transaksi</div>
        <div className="mb-2 is-flex is-align-items-baseline">
          <DatePicker selected={startDate} 
          className="date-picker me-2 text-center"
          placeholderText="dd/mm/yyyy"
          onChange={(date) => setStartDate(date)} 
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
          />
          <span className="me-2">s/d</span>
          <DatePicker selected={endDate} 
          className="date-picker text-center"
          placeholderText="dd/mm/yyyy"
          onChange={(date) => setEndDate(date)} 
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
          />
        </div>
        <div>
          <Button variant="info" className="me-2" size="sm">Terapkan</Button>
          <Button variant="warning" size="sm">Reset</Button>
        </div>
      </div>

      <hr />

      <div className="table-container mb-0">
        <Table hover className="mb-0">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Username</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.length > 0
              ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} 
                  className="link"
                  onClick={() => handleClickRow(item.id)}>
                    <td>{fn.formatDate(item.created_at)}</td>
                    <td>{item.username}</td>
                    <td>Rp {fn.thousandSeparator(item.nilai_transaksi)}</td>
                  </tr>
                ))
              )
              : (
                <tr>
                  <td colSpan={3}>Tidak ada data</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>

      <div className="align-right mb-3 me-3">
        <span className="me-2 fs-6">Total: Rp</span>
        <span className="fw-bold fs-4">{fn.thousandSeparator(nilaiTotal)}</span>
      </div>

      {
        // pagination hanya ditampilkan kalau ada datanya
        historiTransaksi.length > 0 
        ? (
          <Pagination itemsPerPage={itemsPerPage} 
          totalItems={historiTransaksi.length} 
          paginate={paginate} 
          curPageNumber={currentPage} 
          />
        )
        : ''
      }

    </div>
  );
};

export default HistoriTransaksiToko;
