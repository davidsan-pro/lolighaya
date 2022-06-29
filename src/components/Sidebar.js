import { useState, useEffect } from "react";
import { Button, Offcanvas, Table, Card, Figure } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionLogin, actionLogout } from "../actions";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({
    id: '',
    username: '',
    email: '',
    telepon: '',
    last_login: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  // const loginInfo = useSelector(state => state.isLogged)

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    let tmp = JSON.parse(localStorage.getItem('loginData') || '{}');
    if (tmp.id !== '') {
      setLoginData(tmp);
    }
    // let myurl = `${global.config.base_url}/users`;
    // let qsArr = [];
    // qsArr.push(`qf=username&qv=${loginInfo.username}&qmode=exact`);
    // if (qsArr.length > 0) {
    //   myurl += '?' + qsArr.join('&');
    // }
    // const response = await fetch(myurl);
    // const data = await response.json();
    // console.log('getuserinfo', myurl, data);
    // if (data.length > 0) {
    //   setLoginData(data[0]);
    // }
  }
  // console.log('logininfo', loginInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    const tmp = {
      id: '',
      username: '',
      email: '',
      telepon: '',
    }
    setLoginData(tmp);
    navigate('/');
  }

  return (
    <>
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
