import { useState, useEffect } from "react";
import DisplayListTransaksi from "./DisplayListTransaksi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import * as fn from "../MyFunctions";

const MasterTransaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nilaiTotal, setNilaiTotal] = useState(0);
  const [fStartDate, setFStartDate] = useState("");
  const [fEndDate, setFEndDate] = useState("");
  const [fUsername, setFUsername] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    getTransaksi();
  }, []);

  const getTransaksi = async (query='') => {
    setIsLoading(true);
    let myurl = `${fn.getBaseUrl()}/Mtransaksi`;
    let qsArr = [];
    if (query !== "") {
      qsArr.push(`q=${query}`);
    }
    if (fStartDate !== "") {
      let tmpStartDate = fn.formatDate(fStartDate, "date-std").replace("/", "-"); // dd-mm-yyyy
      const tgl = tmpStartDate.slice(0, 2);
      const bln = tmpStartDate.slice(3, 5);
      const thn = tmpStartDate.slice(-4);
      tmpStartDate = `${thn}-${bln}-${tgl}`;
      qsArr.push(`qf[]=start_date&qv[]=${tmpStartDate}`);
    }
    if (fEndDate !== "") {
      let tmpEndDate = fn.formatDate(fEndDate, "date-std").replace("/", "-");
      const tgl = tmpEndDate.slice(0, 2);
      const bln = tmpEndDate.slice(3, 5);
      const thn = tmpEndDate.slice(-4);
      tmpEndDate = `${thn}-${bln}-${tgl}`;
      qsArr.push(`qf[]=end_date&qv[]=${tmpEndDate}`);
    }
    if (fUsername !== "") {
      qsArr.push(`qf[]=username&qv[]=${fUsername}`);
    }
    if (searchParams.get("sbf")) {
      // sort by field
      qsArr.push(`sbf=${searchParams.get("sbf")}`);
    }
    if (searchParams.get("sbm")) {
      // sort by mode (exact)
      qsArr.push(`sbm=${searchParams.get("sbm")}`);
    }
    let qs = qsArr.join("&");
    if (qsArr.length > 0) {
      myurl += `?${qs}`;
    }
    // console.log('myurl', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log("data trx", data);
    setTransaksi(data);
    let total = 0;
    data.map((item) => {
      total += item.nilai_transaksi;
    });
    setNilaiTotal(total);

    setIsLoading(false);
  };

  const deleteTransaksi = async (id, string) => {
    if ( ! window.confirm(`Data Transaksi [${string}] akan dihapus. Lanjutkan?`)) {
      return false;
    }

    const myurl = `${fn.getBaseUrl()}/Mtransaksi/${id}`;
    await fetch(myurl, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          fn.showToastMsg(res.messages.success);
        } else {
          fn.showToastMsg('Gagal menghapus data transaksi', 'error');
        }
      })
      .catch(err => {
        fn.showToastMsg('Gagal menghapus data transaksi', 'error');
      })
      .finally(() => {
        getTransaksi();
      });
  };

  const handleClickRow = (idTransaksi) => {
    let href = `/detail_histori_transaksi_toko/${idTransaksi}`;
    // console.log("href", href);
    navigate(href);
  };


  return (
    <div>
      <SearchBar onSearch={getTransaksi} keywordType="nama toko atau barang"/>
      <div className="is-flex is-justify-content-space-between mb-2">
        <strong className="fs-4 me-3">Histori Transaksi</strong>
        <Link to="/dashboard">
          <Button variant="primary">Transaksi Baru</Button>
        </Link>
      </div>
      {
        isLoading 
          ? <div className="text-center"><Spinner animation="border" /> </div>
          : <DisplayListTransaksi transaksi={transaksi} 
            deleteTransaksi={deleteTransaksi} 
            handleClickRow={handleClickRow}
            />
      }
    </div>
  );
};

export default MasterTransaksi;
