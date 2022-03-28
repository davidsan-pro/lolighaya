import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import PilihHari from "./components/PilihHari";
import RuteListToko from "./components/RuteListToko";
import RuteDetailToko from "./components/RuteDetailToko";
import MenuDatabase from "./components/MenuDatabase";
import MasterUser from "./components/MasterUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import MasterBarang from "./components/MasterBarang";
import MasterToko from "./components/MasterToko";

const App = () => {
  const [showPrev, setShowPrev] = useState(false);

  return (
    <Router>
      <Header />

      <div className="container hero is-fullheight">
        {/* <BarangList /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pilih_hari" element={<PilihHari />} />
          <Route path="/rute_list_toko" element={<RuteListToko />} />
          <Route path="/rute_detail_toko" element={<RuteDetailToko />} />
          <Route path="/master" element={<MenuDatabase />} />
          <Route path="/master_user" element={<MasterUser />} />
          <Route path="/add_user" element={<AddUser />} />
          <Route path="/edit_user/:id" element={<EditUser />} />
          <Route path="/master_barang" element={<MasterBarang />} />
          <Route path="/master_toko" element={<MasterToko />} />
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
