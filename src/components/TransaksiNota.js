import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Spinner, Button, Table } from "react-bootstrap";
import * as fn from "../MyFunctions";

const TransaksiNota = () => {
  const [dataToko, setDataToko] = useState({});
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [isLoadingInfoToko, setIsLoadingInfoToko] = useState(false);
  const [isLoadingDataNota, setIsLoadingDataNota] = useState(false);

  const { id } = useParams(); // id transaksi
  let idToko = '';
  const navigate = useNavigate();

  useEffect(() => {
    getDataToko();
    getDataNota();
  }, []);

  const getDataNota = async () => {
    setIsLoadingDataNota(true);
    let qsArr = [];
    qsArr.push(`qf=id_transaksi&qv=${id}`);
    let myurl = fn.prepURL('/Dtransaksi', qsArr);
    console.log('getdatanota myurl', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    data.forEach(item => {
      item.nama = item.nama_barang;
      item.subtotal = (item.titip - item.sisa) * item.harga;
    });
    console.log('getdatanota data', data);
    setDataTransaksi(data);
    setIsLoadingDataNota(false);
  }

  const getDataToko = async () => {
    setIsLoadingInfoToko(true);
    // const response = await fetch(`${fn.getBaseUrl()}/toko/${idToko}`);
    // const data = await response.json();
    // console.log('getdatatoko', data);
    // setDataToko(data);
    setIsLoadingInfoToko(false);
  };

  const handleClickBtn = () => {
    // convert table mjd image
    // kirim image tsb ke no.wa toko
  }

  return (
    <div className='container'>
      <Button variant="success" onClick={() => handleClickBtn()}>
        Kirim ke WhatsApp Toko
      </Button>
      <div className='simple-table'>
        <Table bordered>
          <thead>
            <tr>
              <th>No.</th>
              <th>Info Barang</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              dataTransaksi.map((item, index) => {
                <tr key={item.id}>
                  <td>{index+1}.</td>
                  <td>
                    <div className='fw-bold'>
                      {item.nama}
                    </div>
                    <div className='fs-6 fst-italic'>
                      {fn.thousandSeparator(item.titip - item.sisa)} x Rp {fn.thousandSeparator(item.harga)}
                    </div>
                  </td>
                  <td>
                    <div className='fw-bold'>Rp {fn.thousandSeparator(item.subtotal)}</div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default TransaksiNota