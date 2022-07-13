import { useState, useEffect } from "react";
import { Button, Offcanvas, Table, Card, Figure } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  // const [loginData, setLoginData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  let tmp = JSON.parse(localStorage.getItem('loginData') || '{}');
  // console.log('sidebar tmp', tmp);
  let loginData = tmp;

  // useEffect(() => {
  //   // let isMounted = true; 
  //   // if (isMounted) {
  //   // }
  //   // return () => {isMounted = false}
  // }, []);

  const handleLogout = () => {
    if ( ! window.confirm(`Anda ingin Logout?`)) {
      return false;
    }

    setShow(false);
    localStorage.removeItem('loginData');
    navigate('/');
  }

  return (
    <>
      {/* {console.log('logindata', loginData)} */}
      <Button variant="primary" className="me-2 btn-lg" onClick={handleShow}>
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </Button>
      <Offcanvas show={show} placement="end" scroll="true" style={{ maxWidth:'75%'}} onHide={() => setShow(false)}>
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
              <Card.Title>{loginData.username}</Card.Title>
              <Card.Text>
                {loginData.email}
                <br/>
                {loginData.telepon}
              </Card.Text>
              <Card.Text>
                <Link to="/edit_user/1" onClick={() => setShow(false)}>
                  <Button variant="success" className="mb-2">
                    <FontAwesomeIcon icon="fas fa-edit" className="me-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Link to={loginData.id !== '' ? '/dashboard' : '/'} onClick={() => setShow(false)}>
                  <Button variant="primary">
                    <FontAwesomeIcon icon="fa-solid fa-home" className="me-2"/>
                    Homepage
                  </Button>
                </Link>
              </Card.Text>
              <Button variant="link" 
              className="fc-danger link" 
              onClick={() => handleLogout()}>
                <FontAwesomeIcon icon="fa-solid fa-times" className="me-2"/>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
