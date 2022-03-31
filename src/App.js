import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import PilihHari from "./components/PilihHari";
import RuteListToko from "./components/RuteListToko";
import RuteDetailToko from "./components/RuteDetailToko";
import MenuDatabase from "./components/MenuDatabase";
import MasterUser from "./components/MasterUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import MasterBarang from "./components/MasterBarang";
import MasterToko from "./components/MasterToko";
import Test1 from "./components/Test1";
import Test2 from "./components/Test2";
import AddBarang from "./components/AddBarang";
import AddToko from "./components/AddToko";
import EditBarang from "./components/EditBarang";

const App = () => {
  const [showPrev, setShowPrev] = useState(false);

  return (
    <Router>
      <Header />

      <div className="container hero is-fullheight">
        {/* <BarangList /> */}
        <Routes>
          {/* <Route path="/asd" element={<Test2 />} />
          <Route path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/pilih_hari" element={<PilihHari />} />
          <Route path="/rute_list_toko" element={<RuteListToko />} />
          <Route path="/rute_detail_toko" element={<RuteDetailToko />} />
          <Route path="/master" element={<MenuDatabase />} />
          <Route path="/master_user" element={<MasterUser />} />
          <Route path="/add_user" element={<AddUser />} />
          <Route path="/edit_user/:id" element={<EditUser />} />
          <Route path="/master_barang" element={<MasterBarang />} />
          <Route path="/add_barang" element={<AddBarang />} />
          <Route path="/edit_barang/:id" element={<EditBarang />} />
          <Route path="/master_toko" element={<MasterToko />} />
          <Route path="/add_toko" element={<AddToko />} />
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
