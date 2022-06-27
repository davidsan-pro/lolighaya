import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import * as fn from "../MyFunctions";

const DetailHistoriTransaksiToko = () => {
  const [dataKunjungan, setDataKunjungan] = useState({});
  const [detailTransaksi, setDetailTransaksi] = useState([]);
  const [nilaiTotal, setNilaiTotal] = useState(0);

  const { id } = useParams();
  console.log("id trx", id);

  useEffect(() => {
    console.log("asd", id);
    getDataKunjungan(id);
  }, []);

  const getDataKunjungan = async (id) => {
    let myurl = `${global.config.base_url}/Dtransaksi?qf=id_transaksi&qv=${id}`;
    console.log("my url", myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log("data", data);
    if (data.length > 0) {
      setDataKunjungan(data[0]);
      setDetailTransaksi(data);
      let tmp = 0;
      data.map((item) => {
        tmp += item.harga * item.laku;
      });
      setNilaiTotal(tmp);
    }
  };

  return (
    <div>
      <h2 className="text-center">
        [<strong>{dataKunjungan.nama_toko}</strong>]
      </h2>
      <div className="mb-3 fs-6">
        Waktu Transaksi: {fn.formatDate(dataKunjungan.created_at)}
        <br />
        Username: {dataKunjungan.username}
      </div>
      <div className="table-container mb-0">
        <Table bordered className="mb-0">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Info Barang</th>
              {/* <th>Titip</th>
              <th>Sisa</th>
              <th>Laku</th>
              <th>Harga</th> */}
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {detailTransaksi.length > 0 ? (
              // <tr>
              //   <td colSpan={6}>{detailTransaksi.length}</td>
              // </tr>
              detailTransaksi.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ width: "50%" }}>
                    <div className="fw-bold">{item.nama_barang}</div>
                    <div>Titip: {fn.thousandSeparator(item.titip)}</div>
                    <div>Sisa: {fn.thousandSeparator(item.sisa)}</div>
                    <div>Laku: {fn.thousandSeparator(item.laku)}</div>
                    <div>Harga: Rp {fn.thousandSeparator(item.harga)}</div>
                  </td>
                  <td className="align-right">
                    Rp {fn.thousandSeparator(item.harga * item.laku)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="align-right me-2">
        <span className="me-2">Total: Rp</span>
        <span className="fs-5 fw-bold">{fn.thousandSeparator(nilaiTotal)}</span>
      </div>
    </div>
  );
};

export default DetailHistoriTransaksiToko;
