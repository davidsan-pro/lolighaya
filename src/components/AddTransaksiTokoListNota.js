import { useState, useEffect } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { Button, Table, Spinner } from "react-bootstrap";
import * as fn from "../MyFunctions";

const AddTransaksiTokoListNota = () => {
  const [isLoadingInfoToko, setIsLoadingInfoToko] = useState(false);

  const [dataToko, setDataToko] = useState({});

  const { id } = useParams(); // id rute
  const [searchParams, setSearchParams] = useSearchParams();
  const idToko = searchParams.get("id_toko"); // id toko

  useEffect(() => {
    getTokoById();
  }, []);

  const getTokoById = async () => {
    setIsLoadingInfoToko(true);
    let kunjungan = localStorage.getItem('kunjungan') || '[]';
    kunjungan = JSON.parse(kunjungan);
    // kalo variabel kunjungan terakhir masih tersimpan di localStorage
    // artinya masih dlm proses transaksi
    // maka data toko langsung diambil dr data localStorage tsb
    if (kunjungan.length > 0) {
      setDataToko(kunjungan);
    }
    else {
      // kalo belum ada data kunjungan yg tersimpan di localStorage
      // artinya ini awal dari sebuah transaksi
      // maka ambil data toko dari API server
      // lalu simpan data tsb di localStorage
      const response = await fetch(`${fn.getBaseUrl()}/toko/${idToko}`);
      const data = await response.json();
      console.log('getdatatoko', data);
      setDataToko(data);
      localStorage.setItem('kunjungan', JSON.stringify(data));
    }
    setIsLoadingInfoToko(false);
  };

  const onClickRow = (e) => {
    console.log(e.target.id_rute, e.target.id_toko);
  }

  return (
    <div className="container">
      <div className="mb-3 fs-4">
        Nota baru untuk [
          {
            isLoadingInfoToko 
            ? <Spinner animation="border" /> 
            : <span className="fw-bold">{dataToko.nama}</span>
          }
        ]
      </div>
      <div>
        <Link to="/add_transaksi_pilih_barang">
          <Button variant="primary">Pilih Barang</Button>
        </Link>
      </div>
      <div className="simple-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Tanggal</th>
              <th>Jumlah Item</th>
              <th>Total Nilai</th>
            </tr>
          </thead>
          <tbody className="fs-6">
            <tr onClick={(e) => onClickRow(e)} id_rute={id} id_toko={idToko}>
              <td>1.</td>
              <td>{fn.formatDate(new Date(), 'datetime-std')}</td>
              <td>3 item</td>
              <td>Rp 500.000</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AddTransaksiTokoListNota;
