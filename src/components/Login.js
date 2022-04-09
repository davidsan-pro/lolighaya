import { useState } from "react";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();

    const data = { username, password };
    const myurl = `${global.config.base_url}/login`;
    await fetch(myurl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
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
          <Button type="submit" variant="primary" size="lg">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
