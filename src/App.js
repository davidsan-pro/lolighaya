import React from "react";
import { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import BarangList from "./components/BarangList";
import UserList from "./components/UserList";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import PilihHari from "./components/PilihHari";
import Rute_ListToko from "./components/Rute_ListToko";
import Rute_Detail_Toko from "./components/Rute_Detail_Toko";
import MenuDatabase from "./components/MenuDatabase";
import MasterUser from "./components/MasterUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import MasterBarang from "./components/MasterBarang";

const App = () => {
  const [showPrev, setShowPrev] = useState(false);

  return (
    <Router>
      <Header />
      <h1>Hello World</h1>

      <div className="container hero is-fullheight">
        {/* <BarangList /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pilih_hari" element={<PilihHari />} />
          <Route path="/rute_list_toko" element={<Rute_ListToko />} />
          <Route path="/rute_detail_toko" element={<Rute_Detail_Toko />} />
          <Route path="/master" element={<MenuDatabase />} />
          <Route path="/master_user" element={<MasterUser />} />
          <Route path="/add_user" element={<AddUser />} />
          <Route path="/edit_user/:id" element={<EditUser />} />
          <Route path="/master_barang" element={<MasterBarang />} />
        </Routes>

        <footer className="has-text-centered is-flex-align-items-flex-end mt-auto">
          <small>
            <span>Copyright @2022</span>
            <br />
            <a href="/about">About</a>
          </small>
        </footer>
      </div>
    </Router>
  );
};

export default App;
