import { useState, useEffect } from "react";
import { useLocation, useParams, useSearchParams, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import * as fn from "../MyFunctions";

const RuteDetailToko = ({ onDelete }) => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams(); // id rute
  const [searchParams, setSearchParams] = useSearchParams();
  const idToko = searchParams.get("id_toko"); // id toko
  console.log('id', id, idToko);

  useEffect(() => {
    getToko();
  }, []);

  const getToko = async (query = "") => {
    setIsLoading(true);

    let myurl = `${fn.getBaseUrl()}/toko/${idToko}`;
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

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media mb-1">
              <div className="media-left">
                <figure className="image is-48x48" style={{marginBottom:0}}>
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title fs-4">{toko.nama}xxx</p>
              </div>
            </div>

            <div className="content fs-7">
              Alamat: {toko.alamat}
              <br />
              Lokasi: Kec.{toko.kecamatan}, {fn.ucasefirst(toko.kota)}
              <br />
              Telepon: {toko.telepon}
            </div>

            <div className="content">
              <div className="is-flex is-align-items-flex-start is-flex-wrap-wrap">
                <Link to={`/add_transaksi_toko/${id}?id_toko=${idToko}`}>
                  <Button variant="primary" className="me-2 mb-2">
                    Nota Baru
                  </Button>
                </Link>
                <Button variant="success" className="me-2 mb-2">
                  Histori Transaksi
                </Button>
                <Link to={`/edit_toko/${toko.id}?back_url=/view_toko/${toko.id}`}>
                  <Button variant="info" className="me-2 mb-2">
                    Edit Toko
                  </Button>
                </Link>
                <Button variant="danger" className="me-2 mb-2" onClick={() => onDelete(toko.id, toko.nama)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuteDetailToko;
