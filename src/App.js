import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PilihHari from "./components/PilihHari";
import RuteListToko from "./components/RuteListToko";
import RuteDetailToko from "./components/RuteDetailToko";
import MenuDatabase from "./components/MenuDatabase";
import ViewUser from "./components/ViewUser";
import MasterUser from "./components/MasterUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ViewBarang from "./components/ViewBarang";
import MasterBarang from "./components/MasterBarang";
import AddBarang from "./components/AddBarang";
import EditBarang from "./components/EditBarang";
import ViewToko from "./components/ViewToko";
import MasterToko from "./components/MasterToko";
import AddToko from "./components/AddToko";
import EditToko from "./components/EditToko";
import MasterRute from "./components/MasterRute";
import AddRute from "./components/AddRute";
import EditRute from "./components/EditRute";
import MasterRuteListToko from "./components/MasterRuteListToko";
import AddRuteList from "./components/AddRuteList";
import MasterTransaksi from "./components/MasterTransaksi";

const App = () => {
  const [showPrev, setShowPrev] = useState(false);

  return (
    <Router>
      <Header />

      <div className="container hero is-fullheight">
        {/* <BarangList /> */}
        <Routes>
          {/* <Route path="/asd" element={<Test2 />} />
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/pilih_hari" element={<PilihHari />} /> */}
          <Route path="/rute_list_toko/:id" element={<RuteListToko />} />
          <Route path="/rute_detail_toko/:id" element={<RuteDetailToko />} />
          <Route path="/master" element={<MenuDatabase />} />
          <Route path="/view_user/:id" element={<ViewUser />} />
          <Route path="/master_user" element={<MasterUser />} />
          <Route path="/add_user" element={<AddUser />} />
          <Route path="/edit_user/:id" element={<EditUser />} />
          <Route path="/view_barang/:id" element={<ViewBarang />} />
          <Route path="/master_barang" element={<MasterBarang />} />
          <Route path="/add_barang" element={<AddBarang />} />
          <Route path="/edit_barang/:id" element={<EditBarang />} />
          <Route path="/view_toko/:id" element={<ViewToko />} />
          <Route path="/master_toko" element={<MasterToko />} />
          <Route path="/add_toko" element={<AddToko />} />
          <Route path="/edit_toko/:id" element={<EditToko />} />
          <Route path="/master_rute" element={<MasterRute />} />
          <Route path="/add_rute" element={<AddRute />} />
          <Route path="/edit_rute/:id" element={<EditRute />} />
          <Route path="/master_rute_list/:id" element={<MasterRuteListToko />} />
          <Route path="/add_rute_list/:id" element={<AddRuteList />} />
          <Route path="/master_transaksi" element={<MasterTransaksi />} />
        </Routes>
      </div>

      <footer className="has-text-centered is-flex-align-items-flex-end mt-auto">
        <small>
          <span>Copyright @2022</span>
          <br />
          <a href="/about">About</a>
        </small>
      </footer>
    </Router>
  );
};

export default App;
