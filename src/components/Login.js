import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import * as fn from "../MyFunctions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['message']);

  const navigate = useNavigate();
  // console.log('login page');

  // useEffect(() => {
    localStorage.clear();
  // }, []);

  // useEffect(() => {
  //   // tiap kali masuk k hal.login ini, kosongkan localStorage 'loginData'nya
  //   localStorage.setItem('loginData', JSON.stringify(loginData));
  // }, [loginData]);
  // console.log('cookie', cookies.message || '');
  if (cookies.message) {
    setMessage(cookies.message); // display the cookie using 'message' state variable
    cookies.remove('message'); // delete the cookie after storing it in the state variable
  }

  const submitLogin = async () => {
    setIsLoading(true);
    const data = { 
      username: username, 
      password: password 
    };
    const myurl = fn.prepURL('/users/login');
    // console.log('submitlogin', myurl, data);
    await fetch(myurl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(res => {
        // console.log('res login', res);
        setCode(res.status);
        // if (res.messages.username) {
        //   setErrUsername(res.messages.username);
        // }
        // if (res.messages.password) {
        //   setErrPassword(res.messages.password);
        // }
        if (res.status === 201) {
          setMessage(res.message);
          const dateStr = fn.formatDate(null, 'full-std');
          let tmp = {
            id: res.id,
            level: res.data.level,
            username: res.data.username,
            email: res.data.email,
            telepon: res.data.telepon,
            last_login: dateStr,
          }
          // console.log('login tmp', tmp);
          // setLoginData(tmp);
          // tiap kali masuk k hal.login ini, kosongkan localStorage 'loginData'nya
          localStorage.setItem('loginData', JSON.stringify(tmp));

          fn.showToastMsg(res.message);
          navigate('/dashboard');
        } else {
          setMessage(res.messages.error);
        }
      })
      .catch(err => console.log('error', err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClickBtn = (e) => {
    if (e.target.id === 'forgot_password_btn') {
      navigate('/forgot_password');
    }
  }

  return (
    <div className="container">

      <form>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="errmsg">{errUsername}</div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="errmsg">{errPassword}</div>
        </div>

        <div className="mt-4">
          <div className="d-grid mb-3">
            <Button variant="primary" size="lg" onClick={(e) => submitLogin(e)}>
              Login
              {
                isLoading 
                ? <Spinner animation="border" size="sm" className="ms-2"/>
                : ''
              }
            </Button>
          </div>
        </div>

        <div>
          <Button variant="link"
          className="ps-0"
          id="forgot_password_btn" 
          onClick={(e) => handleClickBtn(e)}>
            Forgot Password?
          </Button>
        </div>

        <div className="errmsg">{message}</div>
      </form>
    </div>
  );
};

export default Login;
