import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { actionLogin } from "../actions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({
    id: '',
    username: '',
    email: '',
    telepon: '',
    last_login: '',
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log('login page');

  const resetAllStorage = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('kunjungan');
  }

  useEffect(() => {
    resetAllStorage();
  }, []);

  useEffect(() => {
    // tiap kali masuk k hal.login ini, kosongkan localStorage 'loginData'nya
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }, [loginData]);

  const submitLogin = async () => {
    const data = { 
      username: username, 
      password: password 
    };
    const myurl = `${global.config.base_url}/users/login`;
    await fetch(myurl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.status) {
          const dateOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }
          const dateStr = new Intl.DateTimeFormat('id-ID',dateOptions).format(new Date())
          let tmp = {
            id: res.id,
            username: res.data.username,
            email: res.data.email,
            telepon: res.data.telepon,
            last_login: dateStr,
          }
          setLoginData(tmp);
          // localStorage.setItem('loginData', JSON.stringify(loginData));
          navigate('/dashboard');
        }
      });
  };

  return (
    <div className="container">
      <form>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {/* <p className="help is-success">This username is available</p> */}
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ps-2">Remember me</span>
            </label>
          </div>
        </div>

        <hr />
        <div className="d-grid">
          <Button variant="primary" size="lg" onClick={(e) => submitLogin(e)}>
            Login
          </Button>
        </div>
        <div className="text-center">
          {message}
        </div>
      </form>
    </div>
  );
};

export default Login;
