import { useState, useEffect } from "react";
import { useLocation, useParams, useSearchParams, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import * as fn from "../MyFunctions";
import DisplayEditRuteList from "./DisplayEditRuteList";

const EditRuteList = () => {
  const [rute, setRute] = useState({});
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  const { id } = useParams(); // id rute
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getRuteById(id);
    getRuteListToko();
  }, []);

  const getRuteById = async(id_rute) => {
    console.log('getrutebyid', id_rute);
    setIsLoading2(true);

    let myurl = `${fn.getBaseUrl()}/Mrute?qf[]=id&qv[]=${id}`;
    console.log('getrutebyid', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log('datarute', data);
    if (data.length > 0) {
      setRute(data[0]);
    }

    setIsLoading2(false);
  }

  const getRuteListToko = async (query = "") => {
    setIsLoading(true);

    let myurl = `${fn.getBaseUrl()}/Drute`;
    let qsArr = [];
    qsArr.push(`qf[]=id_rute&qv[]=${id}`);
    if (query) {
      qsArr.push(`q=${query}`);
    }
    if (qsArr.length > 0) {
      const qs = qsArr.join('&');
      myurl += `?${qs}`;
    }
    console.log('getrutelisttoko', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log('datarutelisttoko', data);
    setToko(data);

    setIsLoading(false);
  };

  const onDelete = async (id, string) => {
    if ( ! window.confirm(`Data Toko [${string}] akan dihapus dari Rute. Lanjutkan?`)) {
      return false;
    }

    const myurl = `${fn.getBaseUrl()}/toko/${id}`;
    await fetch(myurl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          fn.showToastMsg(res.messages.success);
        } else {
          fn.showToastMsg('Gagal menghapus data toko', 'error');
        }
      })
      .catch(err => {
        fn.showToastMsg('Gagal menghapus data toko', 'error');
      })
      .finally(() => {
        getRuteListToko();
      });
  }

  return (
    <div>
      <h2 className="text-center">
        [<strong>{rute.nama_rute}</strong>]
      </h2>
      <div className="mb-3">
        <Link to={`/`}>
          <Button>Tambahkan Toko</Button>
        </Link>
      </div>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <DisplayEditRuteList toko={toko} onDelete={onDelete} />
      )}
    </div>
  );
};

export default EditRuteList;
