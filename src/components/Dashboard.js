import React from "react";
import { Button, Accordion, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container has-text-centered">
      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <strong>PILIH RUTE</strong>
          </Accordion.Header>
          <Accordion.Body className="content-scroll">
            <ListGroup className="has-text-left">
              <Link to="/pilih_hari">
                <ListGroup.Item>
                  <strong className="is-size-5 mr-2">Rute A</strong>
                  <em>
                    <small>Probolinggo, Surabaya</small>
                  </em>
                </ListGroup.Item>
              </Link>
              <Link to="/pilih_hari">
                <ListGroup.Item>
                  <strong className="is-size-5 mr-2">Rute B</strong>
                  <em>
                    <small>Surabaya Utara, Surabaya Timur</small>
                  </em>
                </ListGroup.Item>
              </Link>
              <Link to="/pilih_hari">
                <ListGroup.Item>
                  <strong className="is-size-5 mr-2">Rute C</strong>
                  <em>
                    <small>Surabaya Selatan, Sidoarjo, Bangkalan</small>
                  </em>
                </ListGroup.Item>
              </Link>
              <Link to="/pilih_hari">
                <ListGroup.Item>
                  <strong className="is-size-5 mr-2">Rute D</strong>
                  <em>
                    <small>Madura, Surabaya Utara, Surabaya Barat</small>
                  </em>
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div style={{ marginBottom: "5rem" }}>
        <Link to="/master">
          <Button variant="info" size="lg" className="has-text-weight-bold">
            Master Database
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
