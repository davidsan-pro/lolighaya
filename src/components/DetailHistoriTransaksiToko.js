import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import * as fn from "../MyFunctions";

const DetailHistoriTransaksiToko = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);

  const { id } = useParams(); // id transaksi

  useEffect(() => {
    getData();
    console.log("datatrx", dataTransaksi);
  }, []);

  const getData = async () => {
    let myurl = `${global.config.base_url}/Dtransaksi?qf=id_transaksi&qv=${id}`;
    console.log("myurl", myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log("data", data);
    setDataTransaksi(data);
  };

  return (
    <div>
      <h2 className="text-center">
        [<strong>{dataTransaksi[0].nama_toko}</strong>]
      </h2>
      <div className="mb-3">
        Waktu Transaksi: {fn.formatDate(dataTransaksi[0].created_at)}
        <br />
        Username: {dataTransaksi[0].username}
      </div>
      <div className="table-container">
        <Table bordered>
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Titip</th>
              <th>Sisa</th>
              <th>Laku</th>
              <th>Harga</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {dataTransaksi.length > 0 ? (
              // <tr>
              //   <td colSpan={6}>{dataTransaksi.length}</td>
              // </tr>
              dataTransaksi.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.nama_barang}</td>
                  <td>{fn.thousandSeparator(item.titip)}</td>
                  <td>{fn.thousandSeparator(item.sisa)}</td>
                  <td>{fn.thousandSeparator(item.laku)}</td>
                  <td>Rp {fn.thousandSeparator(item.harga)}</td>
                  <td>Rp {fn.thousandSeparator(item.harga * item.laku)}</td>
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
    </div>
  );
};

export default DetailHistoriTransaksiToko;
