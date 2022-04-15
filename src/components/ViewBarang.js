import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";

const ViewBarang = ({ onDelete }) => {
  const [barang, setBarang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async (query = "") => {
    setIsLoading(true);

    let myurl = `${global.config.base_url}/barang/${id}`;
    if (query) {
      myurl += `?q=${query}`;
    }
    // console.log('view toko', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('data', data);
    setBarang(data);

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
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-5">{barang.nama}</p>
                <p className="subtitle is-6">Sisa stok: {barang.stok}</p>
              </div>
            </div>

            <div className="content">
              <div className="is-flex is-justify-content-space-between">
                <div className="mb-2">
                  <Link to={`/edit_barang/${barang.id}`}>
                    <Button variant="info" className="me-2">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => onDelete(barang.id, barang.nama)}>
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
      )}
    </div>
  );
};

export default ViewBarang;
