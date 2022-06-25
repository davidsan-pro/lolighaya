import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as fn from "../MyFunctions";

const DetailHistoriTransaksiToko = ({ id }) => {
  const [dataTransaksi, setDataTransaksi] = useState([]);

  const { id } = useParams(); // id transaksi

  const getData = async () => {
    let myurl = `${global.config.base_url}/Dtransaksi?qf=id&qv=${id}`;
    const response = await fetch(myurl);
    const data = await response.json();
    setDataTransaksi(data);
  }

  return (
    <div>
      <h2>
        Detail Histori Transaksi
      </h2>
      <div className='table-container'>
        <Table>
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
            {
              dataTransaksi.length > 0
              ? (
                dataTransaksi.map((item, index) => {
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{fn.thousandSeparator(item.titip)}</td>
                    <td>{fn.thousandSeparator(item.sisa)}</td>
                    <td>{fn.thousandSeparator(item.laku)}</td>
                    <td>{fn.thousandSeparator(item.harga)}</td>
                    <td>{fn.thousandSeparator(item.laku * item.harga)}</td>
                  </tr>
                })
              )
              : (
                <tr>
                  <td colSpan={6}>Tidak ada data</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default DetailHistoriTransaksiToko