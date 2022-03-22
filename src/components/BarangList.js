import React, { useState, useEffect } from 'react'
import axios from 'axios';

const BarangList = () => {
  const [barangMulti, setBarangMulti] = useState([]);

  useEffect(() => {
    getBarangMulti();
  }, []);

  const getBarangMulti = async () => {
    const barangMulti = await axios.get('http://localhost:8080/barang');
    console.log(barangMulti.data);
  }
  return (
    <div>
      {/* <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>admin1</strong> 
                <br />
                <small>admin@aa.com</small> 
                <br />
                <small>08123123123</small>
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item" aria-label="reply">
                  <button className='button is-small is-info'>Edit</button>
                </a>
                <a className="level-item" aria-label="retweet">
                  <button className='button is-small is-danger'>Delete</button>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div> */}
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Foto Barang</th>
            <th>Nama Barang</th>
            <th>Harga Barang</th>
            <th>Titip</th>
            <th>Sisa</th>
            <th>Laku</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {
            barangMulti.map((barang, index) => (
              <tr key={barang.id}>
                <td>{index+1}.</td>
                <td>
                  <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                </td>
                <td>{barang.nama}</td>
                <td>{(index+2)*20}</td>
                <td>{(index+2)*10}</td>
                <td>{(index+2)*30}</td>
                <td>175.000</td>
              </tr>
            ))
          }
          <tr>
            <td>2.</td>
            <td>
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
            </td>
            <td>Lolipop Rasa Jeruk</td>
            <td>50</td>
            <td>2</td>
            <td>40</td>
            <td>200.000</td>
          </tr>
        </tbody>
      </table>
      <div className='has-text-right has-text-right-mobile mr-3'>
        <span className='is-size-5 mr-2'>TOTAL</span>
        <strong className='is-size-4'>Rp375.000</strong>
      </div>
    </div>
  )
}

export default BarangList