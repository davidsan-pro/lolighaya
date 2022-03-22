import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");

  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/users", {
      username: username,
      password: password,
      nama: nama,
      email: email,
      telepon: telepon,
    });

    navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={saveUser}>
        <div className="field">
          <label className="label">Username</label>
          <input type="text" className="input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Nama</label>
          <input type="text" className="input" placeholder="nama lengkap" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input type="text" className="input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">No.Telepon</label>
          <input type="text" className="input" placeholder="nomor telepon" value={telepon} onChange={(e) => setTelepon(e.target.value)} />
        </div>
        <div className="field">
          <Button variant="primary">Simpan</Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
