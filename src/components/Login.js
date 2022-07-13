import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import * as fn from "../MyFunctions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // console.log('login page');

  // useEffect(() => {
    localStorage.clear();
  // }, []);

  // useEffect(() => {
  //   // tiap kali masuk k hal.login ini, kosongkan localStorage 'loginData'nya
  //   localStorage.setItem('loginData', JSON.stringify(loginData));
  // }, [loginData]);

  const submitLogin = async () => {
    setIsLoading(true);
    const data = { 
      username: username, 
      password: password 
    };
    const myurl = `${fn.getBaseUrl()}/users/login`;
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

  return (
    <div className="container">
      {/* <div>
        <Button onClick={() => fn.sendWhatsApp('081382522328', 'test pesan wa timestamp:'+fn.formatDate(null, 'full-std'))}>
          test WA {fn.formatDate(null, 'full-std')}
        </Button>
      </div> */}
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

        {/* <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="ps-2">Remember me</span>
            </label>
          </div>
          <hr />
        </div> */}

        <div className="mt-4">
          <div className="d-grid mb-3">
            <Button variant="primary" size="lg" onClick={(e) => submitLogin(e)}>
              Login
            </Button>
          </div>
          <div className="text-center">
            {
              isLoading 
              ? <Spinner animation="border" />
              : (
                code >= 200 && code < 400
                ? <span>{message}</span>
                : <span className="errmsg">{message}</span>
              )
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
