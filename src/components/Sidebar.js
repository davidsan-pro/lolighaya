import { useState } from "react";
import { Button, Offcanvas, Table, Card, Figure } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="me-2 btn-lg" onClick={handleShow}>
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </Button>
      <Offcanvas show={show} placement="end" scroll="true">
        <Offcanvas.Header>
          <Button onClick={handleClose}>
            <FontAwesomeIcon icon="fa-solid fa-times fa-2xl" />
          </Button>
          <Offcanvas.Title>
            <Figure>
              <Figure.Image
              width="200"
              height="200"
              alt="foto user"
              src="../assets/img/nanas.jpg"
              style={{ borderRadius: '50%' }}
              />
            </Figure>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card className="is-fullwidth">
            <Card.Img variant="top" src="../assets/img/nanas.jpg" />
            <Card.Body style={{ textAlign: 'end' }}>
              <Card.Title>Budi Setiawan</Card.Title>
              <Card.Text>
                budisetiawan@gmail.com
                <br/>08111222333
              </Card.Text>
              <Card.Text>
                  <Link to="/edit_user/1">Edit Profile</Link>
              </Card.Text>
              <Link to="/">
                <Button variant="primary">
                  <FontAwesomeIcon icon="fa-solid fa-home" className="me-2"/>
                  Homepage
                </Button>
              </Link>
            </Card.Body>
          </Card>
          {/* <Table>
            <tr>
              <th>col1</th>
            </tr>
            <tr>
              <th>col2</th>
            </tr>
            <tr>
              <th>col3</th>
            </tr>
          </Table> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
