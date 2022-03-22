import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom";

const Rute_ListToko = () => {
  return (
    <div className='container has-text-centered'>

      <Accordion defaultActiveKey="0" className='mb-3'>
        <Accordion.Item eventKey="0">
          <Accordion.Header><strong>DAFTAR TOKO</strong></Accordion.Header>
          <Accordion.Body className='content-scroll'>

            <table className='table'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nama Toko</th>
                  <th>Tanggal Terakhir</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>1.</td>
                    <td className='has-text-left'>
                      <Link to='/rute_detail_toko?id=1'>
                        Toko Makmur
                      </Link>
                    </td>
                    <td>10-01-2022</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td className='has-text-left'>
                      <Link to='/rute_detail_toko?id=2'>
                        Toko Barokah
                      </Link>
                    </td>
                    <td>10-01-2022</td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td className='has-text-left'>
                      <Link to='/rute_detail_toko?id=3'>
                        Toko Sinar Jaya
                      </Link>
                    </td>
                    <td>15-02-2022</td>
                  </tr>
                  <tr>
                    <td>4.</td>
                    <td className='has-text-left'>
                      <Link to='/rute_detail_toko?id=4'>
                        Toko Sumber Rejeki
                      </Link>
                    </td>
                    <td>20-02-2022</td>
                  </tr>
                  <tr>
                    <td>5.</td>
                    <td className='has-text-left'>
                      <Link to='/rute_detail_toko?id=5'>
                        Toko Mainan ABC
                      </Link>
                    </td>
                    <td>20-02-2022</td>
                  </tr>
              </tbody>
              
            </table>

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div>
  )
}

export default Rute_ListToko