import { useState, useEffect } from "react";
import { useLocation, useParams, useSearchParams, Link } from "react-router-dom";
import { Table, Button, Spinner, Dropdown, DropdownButton, ButtonGroup, DropdownType } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import * as fn from "../MyFunctions";

const RuteDetailToko = ({ onDelete }) => {
  const [toko, setToko] = useState([]);
  const [nota, setNota] = useState([]);
  const [isLoadingToko, setIsLoadingToko] = useState(true);
  const [isLoadingNota, setIsLoadingNota] = useState(true);

  const { id } = useParams(); // id rute
  const [searchParams, setSearchParams] = useSearchParams();
  const idToko = searchParams.get("id_toko"); // id toko
  // console.log('id', id, idToko);

  useEffect(() => {
    getToko();
    getDataNota();
  }, []);

  const getToko = async (query = "") => {
    setIsLoadingToko(true);

    let myurl = `${fn.getBaseUrl()}/toko/${idToko}`;
    if (query) {
      myurl += `?q=${query}`;
    }
    // console.log('view toko', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('data', data);
    setToko(data);

    setIsLoadingToko(false);
  };

  const getDataNota = async () => {
    setIsLoadingNota(true);
    let myurl = "/Mtransaksi";
    let qsArr = [];
    qsArr.push(`qf[]=id_toko&qv[]=${idToko}`);
    qsArr.push(`gb[]=id`);
    qsArr.push(`sbf[]=id&sbm[]=desc`);
    // console.log(myurl, qsArr);
    myurl = fn.prepURL(myurl, qsArr);
    // console.log('getdatanota url', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log("getdatanota data1", data);
    setNota(data);
    setIsLoadingNota(false);
  }

  return (
    <div className="text-center">
      {isLoadingToko ? (
        <Spinner animation="border" className="mt-3"/>
      ) : (
        <>
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media mb-1">
                <div className="media-left">
                  <figure className="image is-48x48" style={{marginBottom:0}}>
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title fs-4">{toko.nama}</p>
                </div>
              </div>

              <div className="content fs-7">
                Alamat: {toko.alamat}
                <br />
                Lokasi: Kec.{toko.kecamatan}, {fn.ucasefirst(toko.kota)}
                <br />
                Telepon: {toko.telepon}
              </div>

            </div>
          </div>

          <div className="mt-3 ms-2 mb-2 fw-bold is-flex is-justify-content-space-between">
            <label>Daftar Transaksi</label>
            <Button size="sm" as={Link} to={`/checkout_transaksi/${id}?id_toko=${idToko}`}>
              Tambah Transaksi
            </Button>
          </div>

          {
            nota.length > 0
            ? (
              <Table bordered className="is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th style={{width:"90%"}}>Ringkasan</th>
                    <th style={{width:"50%"}}>Menu</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    nota.map((item, index) => {
                      const mystyle = item.nilai_transaksi > 0
                        ? {backgroundColor:"rgba(160, 240, 160, 0.8)"}
                        : {}
                        ;
                      return (
                        <tr key={item.id}  style={mystyle}>
                          <td>{index+1}.</td>
                          <td className="has-text-left">
                            <div className="fs-6">
                              <Link to={`/transaksi_detail/${item.id}`}>
                                <strong className="me-2">
                                  {fn.formatNoNota(item.id)}
                                </strong>
                              </Link>
                            </div>
                            <div className="fs-7">
                              <span>{fn.formatDate(item.created_at, 'full-std')}</span>
                              <br/>
                              <span>Jumlah Jenis Item: {fn.thousandSeparator(item.jum_jenis_brg)}</span>
                              <br/>
                              <span>Total Nilai: Rp {fn.thousandSeparator(item.nilai_transaksi)}</span>
                            </div>
                          </td>
                          <td className="text-center">
                            <Dropdown className="no-arrow">
                              <Dropdown.Toggle id="dropdown-button-dark-example1" className="no-arrow">
                                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                              </Dropdown.Toggle>
      
                              <Dropdown.Menu>
                                <Dropdown.Item 
                                as={Link} 
                                to={`/checkout_transaksi/${id}?id_toko=${item.id_toko}&id_trx=${item.id}`} 
                                // disabled={item.nilai_transaksi > 0 ? "disabled" : ""}
                                >
                                  Lanjutkan Nota
                                </Dropdown.Item>
                                <Dropdown.Item 
                                as={Link} 
                                to={`/transaksi_detail/${item.id}`} 
                                // disabled={item.nilai_transaksi > 0 ? "disabled" : ""}
                                >
                                  Cetak Nota
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            )
            : (
              <div className="ms-2 fst-italic">
                Belum ada data transaksi
              </div>
            )
          }
        </>

      )}
    </div>
  );
};

export default RuteDetailToko;
