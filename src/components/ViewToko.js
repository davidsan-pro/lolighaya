import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import * as fn from "../MyFunctions";

const ViewToko = ({ onDelete }) => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    getToko();
  }, []);

  const getToko = async (query = "") => {
    setIsLoading(true);

    let myurl = `${global.config.base_url}/toko/${id}`;
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
                <div className="is-flex is-justify-content-space-between">
                  <div className="mb-2">
                    <Link to={`/edit_toko/${toko.id}`}>
                      <Button variant="info" className="me-2">Edit</Button>
                    </Link>
                    <Button variant="danger" onClick={() => onDelete(toko.id, toko.nama)}>
                      Delete
                    </Button>
                  </div>
                  <div>
                    <Button variant="success">Histori Transaksi</Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
      }
    </div>
  )
};

export default ViewToko