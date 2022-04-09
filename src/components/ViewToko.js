import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const ViewToko = () => {
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    getToko();
  }, []);

  const getToko = async (query = "") => {
    setIsLoading(true);
    try {
      let myurl = `${global.config.base_url}/toko/${id}`;
      if (query) {
        myurl += `?q=${query}`;
      }
      console.log('view toko', myurl);
      const response = await fetch(myurl);
      const data = await response.json();
      console.log('data', data);
      setToko(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
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
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-5">{toko.nama}</p>
                  {/* <p className="subtitle is-6">@johnsmith</p> */}
                </div>
              </div>
          
              <div className="content">
                {toko.alamat}
                <br />
                {toko.kecamatan}, {toko.kota}
                <br />
                {toko.telepon}
              </div>
            </div>
          </div>
      }
    </div>
  )
};

export default ViewToko