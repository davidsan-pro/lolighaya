import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const updateUser = async (e) => {
    e.preventDefault();

    const user = { username, password, nama, email, telepon };
    await fetch(`${global.config.base_url}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // await axios.put(`${global.config.base_url}/users/${id}`, {
    //   username: username,
    //   password: password,
    //   nama: nama,
    //   email: email,
    //   telepon: telepon,
    // });

    navigate("/master_user");
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const myurl = `${global.config.base_url}/users/${id}`; // http://localhost:8080/users/2
    const response = await fetch(myurl);
    const data = await response.json();
    setUsername(data.username);
    setPassword(data.password);
    setNama(data.nama);
    setEmail(data.email);
    setTelepon(data.telepon);
  };

  return (
    <div className="container">
      <form onSubmit={updateUser}>
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
        <Button variant="primary" type="submit">Update</Button>
      </form>
    </div>
  );
};

export default EditUser;
