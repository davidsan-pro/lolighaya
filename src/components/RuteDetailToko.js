import { useState, useEffect } from "react";
import { useLocation, useParams, useSearchParams, Link } from "react-router-dom";
import { Table, Button, Spinner, Dropdown, DropdownButton, ButtonGroup, DropdownType } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import * as fn from "../MyFunctions";

const RuteDetailToko = ({ onDelete }) => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams(); // id rute
  const [searchParams, setSearchParams] = useSearchParams();
  const idToko = searchParams.get("id_toko"); // id toko
  console.log('id', id, idToko);

  useEffect(() => {
    getToko();
  }, []);

  const getToko = async (query = "") => {
    setIsLoading(true);

    let myurl = `${fn.getBaseUrl()}/toko/${idToko}`;
    if (query) {
      myurl += `?q=${query}`;
    }
    // console.log('view toko', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('data', data);
    setToko(data);

    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" />
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
                  <p className="title fs-4">{toko.nama}xxx</p>
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
            <Button size="sm">Tambah Transaksi</Button>
          </div>
          {/* <div className="table-container"> */}
            <Table bordered className="is-fullwidth">
              <thead>
                <tr>
                  <th>No</th>
                  <th style={{width:"90%"}}>Ringkasan</th>
                  <th style={{width:"50%"}}>Menu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>
                    <div>{fn.formatDate(new Date(), 'datetime-std')}</div>
                    <div className="fs-7">
                      <span>Jml item: 5</span>
                      <br/>
                      <span>Total Nilai: Rp 500.000</span>
                    </div>
                  </td>
                  <td className="text-center">
                    {/* <DropdownButton
                      as={ButtonGroup}
                      key="primary"
                      id={`dropdown-variants-primary`}
                      variant="primary"
                      title="primary"
                    >
                      <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                      <Dropdown.Item eventKey="3" active>
                        Active Item
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    </DropdownButton> */}


                    <Dropdown className="no-arrow">
                      <Dropdown.Toggle id="dropdown-button-dark-example1" className="no-arrow">
                        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/add_transaksi_toko/${id}?id_toko=${idToko}`}>
                          Lanjutkan Nota
                        </Dropdown.Item>
                        {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              </tbody>
            </Table>
          {/* </div> */}
        </>

      )}
    </div>
  );
};

export default RuteDetailToko;
