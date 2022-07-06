import { useState, useEffect } from "react";
import { useLocation, useParams, useSearchParams, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import * as fn from "../MyFunctions";
import DisplayEditRuteListToko from "./DisplayEditRuteListToko";

const EditRuteListToko = () => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams(); // id rute
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getRuteListToko();
  }, []);

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
    console.log('editrutelisttoko asd1', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log('data', data);
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
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <DisplayEditRuteListToko toko={toko} onDelete={onDelete} />
      )}
    </div>
  );
};

export default EditRuteListToko;
