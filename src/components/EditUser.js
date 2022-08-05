import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as fn from "../MyFunctions";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const updateUser = async (e) => {
    e.preventDefault();

    const user = { username, nama, email, telepon };
    
    await fetch(`${fn.getBaseUrl()}/users/${id}`, {
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
    const myurl = fn.prepURL(`/users/${id}`); // http://localhost:8080/users/2
    const response = await fetch(myurl);
    const data = await response.json();
    setUsername(data.username);
    setNama(data.nama);
    setEmail(data.email);
    setTelepon(data.telepon);
  };

  return (
    <div className="ms-2 me-2">
      <form onSubmit={updateUser}>
        <div className="field">
          <label className="label">Username</label>
          <label>{username}</label>
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
        <hr />
        <div className="field">
          <label className="label">Password Baru</label>
          <input type="password" className="input" placeholder="password baru" onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">Ulangi Password Baru</label>
          <input type="password" className="input" placeholder="ulangi password baru" onChange={(e) => setNewPasswordConfirmation(e.target.value)} />
        </div>
        <hr />
        <div className="field">
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="password saat ini" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <Button variant="primary" type="submit">Update</Button>
      </form>
    </div>
  );
};

export default EditUser;
