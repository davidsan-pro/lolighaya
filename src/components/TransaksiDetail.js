import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button, Spinner, Table } from "react-bootstrap";
import * as html2canvas from "html2canvas";
import * as fn from "../MyFunctions";
import img from '../logo-002.png';

const TransaksiDetail = () => {
  const [dataToko, setDataToko] = useState({});
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [nilaiTotal, setNilaiTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  console.log('transaksi detail', id);

  useEffect(() => {
    getDataTransaksi(id);
  }, []);

  const getDataTransaksi = async (id) => {
    setIsLoading(true);
    console.log('get data transaksi', id);
    let qsArr = [];
    qsArr.push(`qf[]=id_transaksi&qv[]=${id}&qmode[]=exact`);
    let myurl = fn.prepURL('/Dtransaksi', qsArr);
    console.log('getdatanota myurl', myurl);
    fetch(myurl)
      .then(response => response.json())
      .then(res => {
        setDataTransaksi(res);
        let temp = 0;
        res.forEach((item, index) => {
          const subtotal = fn.removeNonNumeric(item.laku) * fn.removeNonNumeric(item.harga);
          temp += subtotal;
          console.log(index, item.laku, item.harga, subtotal, temp);
        });
        setNilaiTotal(temp);
        setDataToko(res[0]);
      })
      .catch((error) => {
        console.log('error', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  console.log('data toko', dataToko);

  const handleClickBtn = (e) => {
    handleDownloadImage(e);
    
    const target = e.target.getAttribute('data-action');
    if (target === 'kirim_nota_wa') {
      const kodeNota = fn.formatNoNota(id);
      const tanggal = fn.formatDate(new Date(), 'full-std');
      let msg = `Tanggal: ${tanggal} 
      Kode Nota: ${kodeNota} 
      Nama Toko: ${dataToko.nama_toko} 
      Catatan: `
      ;
      fn.sendWhatsApp(dataToko.telepon, msg);
      // let qsArr = [];
      // qsArr.push()
      // qsArr.push(`action=${target}`); // action=kirim_nota_wa
      // qsArr.push(`kode_nota=${fn.formatNoNota(id)}`); // kode_nota=0008
      // qsArr.push(`nama_toko=${dataToko.nama_toko}`);
      // qsArr.push(`tanggal=${fn.formatDate(new Date(dataToko.created_at), 'full-std')}`);
      // let myurl = fn.prepURL('/Mtransaksi', qsArr);
      // console.log('click', myurl);
      // // return;
      // fetch(myurl)
      //   .then(response => response.json())
      //   .then(res => {
      //     console.log('res', res);
      //     // return;
      //     fn.sendWhatsApp(dataToko.telepon, res.message);
      //   })
      //   .catch(error => console.log('error', myurl, error))
      //   ;
    }
  }

  // sumber: https://www.wisdomgeek.com/development/web-development/react/how-to-convert-a-react-component-to-an-image/
  const handleDownloadImage = async (e) => {
    const idElem = e.target.getAttribute('data-targetElem');
    const tanggal = fn.formatDate(new Date(), 'datetime-std');
    console.log('tanggal', tanggal, tanggal.replaceAll(':', '_'));
    const noNota = fn.formatNoNota(id);
    const namaToko = dataToko.nama_toko.replaceAll(' ', '_');
    const targetName = `Lolighaya-${tanggal.replaceAll(':', '_')}-${noNota}-${namaToko}.jpg`;
    fn.saveElementAsImage(idElem, targetName);
    // const element = document.getElementById(idElem);
    // console.log(e.target.dataset, idElem, element);
    // if (!element) {
    //   alert('Elemen yang akan dicetak tidak ditemukan');
    //   return;
    // }
    // const canvas = await html2canvas(element),
    // data = canvas.toDataURL('image/jpg'),
    // link = document.createElement('a');
 
    // link.href = data;
    // link.download = `Lolighaya-${fn.formatNoNota(id)}-${dataToko.nama_toko.replaceAll(' ', '_')}.jpg`;
    // // link.download = 'downloaded-image.jpg';

    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  return (
    <div>
      <div className='mb-3 is-flex is-justify-content-space-between'>
        <Button variant="success" 
        disabled={isLoading ? 'disabled' : ''} 
        data-action="save_pic"
        data-targetElem="detail_transaksi"
        onClick={(e) => handleClickBtn(e)}>
          Simpan Gambar
        </Button>

        <Button variant="success" 
        disabled={isLoading ? 'disabled' : ''} 
        data-action="kirim_nota_wa"
        data-targetElem="detail_transaksi"
        onClick={(e) => handleClickBtn(e)}>
          Kirim ke WhatsApp Toko
        </Button>
      </div>
      <div id="detail_transaksi" className='ms-0 m-2 watermarked'>
        <div className="mb-3">
          <span>Tanggal: {fn.formatDate(dataToko.created_at, 'full-std')}</span>
          <br />
          <span>Nama Toko: <strong>{dataToko.nama_toko}</strong></span>
          <br />
          <span>No Transaksi: <strong>{fn.formatNoNota(id)}</strong></span>
        </div>
        {
          isLoading
          ? ( <Spinner animation="border" /> )
          : (
            <div>
              <div className='table-container mb-0'>
                <Table bordered>
                  <thead>
                    <tr>
                      <th className='ps-0' rowSpan={2}>No.</th>
                      <th colSpan={4}>Detail Item</th>
                      <th rowSpan={2}>Subtotal</th>
                    </tr>
                    <tr bordered>
                      <th>Titip</th>
                      <th>Sisa</th>
                      <th>Laku</th>
                      <th style={{borderRightWidth:"1px"}}>Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataTransaksi.map((item, index) => (
                        <React.Fragment key={item.id}>
                          <tr>
                            <td className='has-text-left ps-0' rowSpan={2}>{index+1}.</td>
                            <td colSpan={4}>
                              <strong>{item.nama_barang}</strong>
                            </td>
                            <td className='has-text-right' rowSpan={2}>
                              <strong>
                                Rp{
                                  fn.thousandSeparator(
                                    fn.removeNonNumeric(item.laku) * fn.removeNonNumeric(item.harga)
                                  )
                                }
                              </strong>
                            </td>
                          </tr>
                          <tr className='fs-7 align-right'>
                            <td style={{width:"1%"}}>{fn.thousandSeparator(item.titip)}</td>
                            <td style={{width:"1%"}}>{fn.thousandSeparator(item.sisa)}</td>
                            <td style={{width:"1%"}}>{fn.thousandSeparator(item.laku)}</td>
                            <td style={{width:"50%"}}>{fn.thousandSeparator(item.harga)}</td>
                          </tr>
                        </React.Fragment>
                      ))
                    }
                  </tbody>
                </Table>
              </div>

              <div className='has-text-right fs-5'>
                Total: <strong>Rp{fn.thousandSeparator(nilaiTotal)}</strong>
              </div>
            </div>
          )
        }
        <img src={img} />
      </div>
    </div>
  )
}

export default TransaksiDetail