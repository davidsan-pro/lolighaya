import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import * as fn from "../MyFunctions";

const HistoriTransaksiToko = () => {
  const [toko, setToko] = useState({});
  const [historiTransaksi, setHistoriTransaksi] = useState([]);
  // const [nama, setNama] = useState("");
  // const [alamat, setAlamat] = useState("");
  // const [telepon, setTelepon] = useState("");
  // const [foto, setFoto] = useState("");
  // const [kecamatan, setKecamatan] = useState("");
  // const [kota, setKota] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams(); // id toko

  const navigate = useNavigate();

  useEffect(() => {
    getTokoById();
    getHistoriTransaksi();
  }, []);

  // const saveToko = async (e) => {
  //   e.preventDefault();

  //   const toko = { nama, alamat, foto, kecamatan, kota, telepon };
  //   await fetch(`${global.config.base_url}/toko`, {
  //     method: 'POST',
  //     body: JSON.stringify(toko),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });

  //   // setelah selesai, redirect ke hal.master toko
  //   navigate("/master_toko");
  // };

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
      <div className="mb-3 fs-4">
        Histori Nota toko [<strong>{toko.nama}</strong>]
      </div>
      <div className="table-container">
        <Table striped hover>
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
                  <tr key={item.id}>
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
    </div>
  );
};

export default HistoriTransaksiToko;
