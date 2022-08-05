import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as fn from "../MyFunctions";

const ForgotUserPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();

    try
    {
      const data = { 
        username: username, 
        email: email,
        action: 'reset_password',
      };
      console.log('data', data);
      const response = await fetch(
        `${fn.getBaseUrl()}/users/reset_password`
        , {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const res = await response.json();
      console.log('res', res);

      fn.showToastMsg(res.message);

      if (res.status < 400) {
        navigate("/");
      }
    }
    catch (error)
    {
      setErrMsg(error);
    }
  };

  return (
    <div className="ms-2 me-2">
      <form onSubmit={resetPassword}>
        <div className="field">
          <label className="label">Username</label>
          <input type="text" className="input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input type="text" className="input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <Button variant="primary" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ForgotUserPassword;
