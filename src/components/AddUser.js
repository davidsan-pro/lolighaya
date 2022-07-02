import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as fn from "../MyFunctions";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");

  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();

    const user = { username, password, nama, email, telepon };
    await fetch(`${fn.getBaseUrl()}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(res => {
      if (res.status === 201) {
        fn.showToastMsg(`Berhasil menambahkan data user [${username}]`);
      }
    });
    // await axios.post("https://lolighayabackend.herokuapp.com/users", {
    //   username: username,
    //   password: password,
    //   nama: nama,
    //   email: email,
    //   telepon: telepon,
    // });

    // setelah selesai, redirect ke hal.master user
    navigate("/master_user");
  };

  return (
    <div className="container">
      <form onSubmit={saveUser}>
        <div className="field">
          <label className="label">Username</label>
          <input type="text" 
            className="input" 
            placeholder="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input type="password" 
            className="input" 
            placeholder="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="field">
          <label className="label">Nama</label>
          <input type="text" 
            className="input" 
            placeholder="nama lengkap" 
            value={nama} 
            onChange={(e) => setNama(e.target.value)} 
          />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input type="text" 
            className="input" 
            placeholder="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="field">
          <label className="label">No.Telepon</label>
          <input type="text" 
            className="input" 
            placeholder="nomor telepon" 
            value={telepon} 
            onChange={(e) => setTelepon(e.target.value)} 
          />
        </div>
        <div className="field">
          <Button variant="primary" type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
