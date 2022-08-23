import React, { useState, useEffect } from "react";
import { Button, Offcanvas, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
// import imgDefault from "../assets/img/nanas.jpg";
import DzUploadBtn from "./DzUploadBtn";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [profilePic, setProfilePic] = useState('../assets/img/nanas.jpg');
  const [selectedFile, setSelectedFile] = useState('nanas.jpg');
  const [isLoadingProfilePic, setIsLoadingProfilePic] = useState(false);
  const [imageSource, setImageSource] = useState('file');
  // const [loginData, setLoginData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  let tmp = JSON.parse(localStorage.getItem('loginData') || '{}');
  console.log('sidebar tmp', tmp);
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
      <Offcanvas 
      show={show} 
      placement="end" 
      scroll="true" 
      className="pe-2"
      style={{ maxWidth:'75%'}} 
      onHide={() => setShow(false)}
      >
        <Offcanvas.Header>
          <Button onClick={handleClose}>
            <FontAwesomeIcon icon="fa-solid fa-times fa-2xl" />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
          <Card className="is-fullwidth">
            <Card.Img variant="top" src={`../assets/img/${selectedFile}`} size="sm"/>
            <div className="mt-2 align-center">
              <DzUploadBtn />
            </div>
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
                <br />
                <Link to={loginData.id !== '' ? '/dashboard' : '/'} onClick={() => setShow(false)}>
                  <Button variant="primary">
                    <FontAwesomeIcon icon="fa-solid fa-home" className="me-2"/>
                    Homepage
                  </Button>
                </Link>
              </Card.Text>
              <Button variant="link" 
              className="text-danger link" 
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
