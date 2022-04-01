import { useState, useEffect } from "react";
// import DisplayListRute from "./DisplayListRute";
import { Link } from "react-router-dom";
import { ListGroup, Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";

const MasterRute = () => {
  // const [barang, setBarang] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getBarang();
  // }, []);

  const getRute = async (query='') => {
  //   setIsLoading(true);
  //   try {
  //     let myurl = `${global.config.base_url}/barang`;
  //     if (query) {
  //       myurl += `?q=${query}`;
  //     }
  //     const response = await fetch(myurl);
  //     const data = await response.json();
  //     setBarang(data);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  };

  // const deleteBarang = async (id) => {
  //   const myurl = `${global.config.base_url}/barang/${id}`;
  //   await fetch(myurl, {
  //     method: 'DELETE', 
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   getBarang();
  // };


  return (
    <div>
      <SearchBar onSearch={getRute}/>
      <div>
        <strong className="is-size-4 me-3">Data Barang</strong>
        <Link to="/add_barang" className="button is-primary">
          Tambah Baru
        </Link>
      </div>
      {/* {isLoading ? <Spinner animation="border" /> : <DisplayListBarang barang={barang} onDelete={deleteBarang} />} */}
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Rute A</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              <ListGroup.Item>
                <div>
                  <label className="fw-bold">Toko Makmur</label>
                </div>
                <div>
                  <span>Jalan Kenjeran no.20, Kota Surabaya</span>
                </div>
                <div>
                  <span>08111222333</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>
                  <label className="fw-bold">Toko Sinar Terang</label>
                </div>
                <div>
                  <span>Jalan Sudirman no.1, Kota Surabaya</span>
                </div>
                <div>
                  <span>08111222444</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>
                  <label className="fw-bold">Toko Barokah</label>
                </div>
                <div>
                  <span>Jalan Merpati no.123, Kota Sidoarjo</span>
                </div>
                <div>
                  <span>08123123123</span>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Rute B</Accordion.Header>
          <Accordion.Body>
          <ListGroup>
              <ListGroup.Item>
                <div>
                  <label className="fw-bold">Toko Makmur</label>
                </div>
                <div>
                  <span>Jalan Kenjeran no.20, Kota Surabaya</span>
                </div>
                <div>
                  <span>08111222333</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>
                  <label className="fw-bold">Toko Sinar Terang</label>
                </div>
                <div>
                  <span>Jalan Sudirman no.1, Kota Surabaya</span>
                </div>
                <div>
                  <span>08111222444</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>
                  <label className="fw-bold">Toko Barokah</label>
                </div>
                <div>
                  <span>Jalan Merpati no.123, Kota Sidoarjo</span>
                </div>
                <div>
                  <span>08123123123</span>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default MasterRute;
