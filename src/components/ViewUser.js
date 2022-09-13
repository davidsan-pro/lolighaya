import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import * as fn from "../MyFunctions";

const ViewUser = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (query = "") => {
    setIsLoading(true);

    // let myurl = `${fn.getBaseUrl()}/users/${id}`;
    // if (query) {
    //   myurl += `?q=${query}`;
    // }
    let myurl = fn.prepURL(`/users/${id}`);
    let qsArr = [];
    if (query) {
      qsArr.push(`q=${query}`);
    }
    // console.log('getuser myurl', myurl);
    const response = await fetch(myurl);
    const data = await response.json();
    // console.log('getuser data', data);
    setUser(data);

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
                {/* <div className="media-left">
                  <figure className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                  </figure>
                </div> */}
                <div className="media-content">
                  <p className="title fs-4">{user.username}</p>
                  <p className="subtitle is-6">{user.nama}</p>
                </div>
              </div>
          
              <div className="content fs-6">
                Email: {user.email}
                <br />
                Telepon: {user.telepon}
              </div>
            </div>
          </div>
      }
    </div>
  )
};

export default ViewUser