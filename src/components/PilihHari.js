import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const PilihHari = () => {
  return (
    <div className="container has-text-centered">
      <Accordion defaultActiveKey="0" className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <strong>PILIH HARI</strong>
          </Accordion.Header>
          <Accordion.Body className="content-scroll">
            <ListGroup className="has-text-left">
              <Link to="/rute_list_toko?q=1">
                <ListGroup.Item>
                  <div>Senin</div>
                </ListGroup.Item>
              </Link>
              <Link to="/rute_list_toko?q=2">
                <ListGroup.Item>
                  <div>Selasa</div>
                </ListGroup.Item>
              </Link>
              <Link to="/rute_list_toko?q=3">
                <ListGroup.Item>
                  <div>Rabu</div>
                </ListGroup.Item>
              </Link>
              <Link to="/rute_list_toko?q=4">
                <ListGroup.Item>
                  <div>Kamis</div>
                </ListGroup.Item>
              </Link>
              <Link to="/rute_list_toko?q=5">
                <ListGroup.Item>
                  <div>Jumat</div>
                </ListGroup.Item>
              </Link>
              <Link to="/rute_list_toko?q=6">
                <ListGroup.Item>
                  <div>Sabtu</div>
                </ListGroup.Item>
              </Link>
              <Link to="/rute_list_toko?q=7">
                <ListGroup.Item>
                  <div>Minggu</div>
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default PilihHari;
