import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import * as fn from "../MyFunctions";

const ViewToko = () => {
  const [toko, setToko] = useState([]);
  const [infoRute, setInfoRute] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams({});

  const { id } = useParams();
  const idRute = searchParams.get('id_rute');
  const navigate = useNavigate();

  let loginData = fn.getCurrentLogin();

  useEffect(() => {
    getInfoRute();
    getToko();
  }, []);

  const getInfoRute = async () => {
    let myurl = `${fn.getBaseUrl()}/Mrute`;
    let qsArr = [];
    qsArr.push(`qf[]=id&qv[]=${idRute}&qmode[]=exact`);
    if (qsArr.length > 0) {
      const qs = qsArr.join('&');
      myurl += `?${qs}`;
    }
    // console.log('get info rute url', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    console.log('get info rute data', data[0]);
    if (data.length > 0) {
      setInfoRute(data[0]);
    }
  };
  // end const getInfoRute

  const getToko = async (query = "") => {
    setIsLoading(true);

    let myurl = `${fn.getBaseUrl()}/toko/${id}`;
    if (query) {
      myurl += `?q=${query}`;
    }
    // console.log('view toko', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('data', data);
    setToko(data);

    setIsLoading(false);
  };
  // end const getToko

  const deleteTokoFromRute = async(id) => {
    const strConfirm = `Toko [${toko.nama}] akan dihapus dari rute [${infoRute.nama_rute}]. Lanjutkan?`;
    if ( ! window.confirm(strConfirm)) {
      return false;
    }

    const myurl = `${fn.getBaseUrl()}/Drute/${idRute}`;
    // kalo yg menekan tombol Delete From Rute ini adl user level admin
    // maka langsung hapus data toko tsb dari tabel
    if (parseInt(loginData.level) === 1) {
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
            navigate(-1);
          } else {
            fn.showToastMsg('Gagal menghapus data toko', 'error');
          }
        })
        .catch(err => {
          fn.showToastMsg('Gagal menghapus data toko', 'error');
        })
        .finally(() => {
          getToko();
        });
    }
    // tapi kalo yg menekan tombol Delete From Rute ini bukan level admin
    // maka update data toko tsb mjd status: 'hapus_dari_rute'
    else {
      const toko = { 
        status: 'menunggu_hapus',
        updated_by_user_id: loginData.id,
      };
      await fetch(myurl, {
        method: 'PUT',
        body: JSON.stringify(toko),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          fn.showToastMsg(`Anda telah mengajukan untuk hapus toko [${toko.nama}] dari rute [${infoRute.nama_rute}]`);
          navigate(-1);
        }
      });
    }
  };
  // end const deleteTokoFromRute


  return (
    <div>
      {isLoading 
        ? (<Spinner animation="border" />)
        : <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media mb-1">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title fs-4">{toko.nama}</p>
                  {/* <p className="subtitle is-6">@johnsmith</p> */}
                </div>
              </div>

              <div className="content fs-6">
                Alamat: {toko.alamat}
                <br />
                Lokasi: Kec.{toko.kecamatan}, {fn.ucasefirst(toko.kota)}
                <br />
                Telepon: {toko.telepon}
              </div>

              <div className='content'>
                  <div className="mb-2">
                    <Link to={`/edit_toko/${toko.id}?back_url=/view_toko/${toko.id}`}>
                      <Button variant="info" className="me-2">Edit</Button>
                    </Link>
                    {
                      infoRute
                      ? (
                        <Button variant="danger" onClick={() => deleteTokoFromRute(toko.id)}>
                          Delete
                        </Button>
                      )
                      : ""
                    }
                  </div>
                  <div>
                    {
                      parseInt(loginData.level) === 1
                      ? (<Button variant="success">Histori Transaksi</Button>)
                      : ''
                    }
                  </div>
              </div>

            </div>
          </div>
      }
    </div>
  )
};

export default ViewToko