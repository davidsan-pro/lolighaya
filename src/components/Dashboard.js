import { useState, useEffect } from "react";
import { Spinner, Accordion, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import DisplayDashboard from "./DisplayDashboard";

const Dashboard = () => {
  const [rute, setRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRute();
  }, []);

  const getRute = async (query='') => {
    setIsLoading(true);
    // console.log('master rute getrute');
    let myurl = `${global.config.base_url}/Mrute`;
    if (query) {
      myurl += myurl.indexOf('?') > 0 ? '&' : '?';
      myurl += `q=${query}`;
    }
    // console.log('master rute getrute', myurl);
    // return;
    const response = await fetch(myurl);
    const data = await response.json(); 
    // console.log('data', data);
    setRute(data);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="mb-3 fs-4">
        <strong>Pilih Rute</strong>
      </div>

      {isLoading ? <Spinner animation="border" /> : <DisplayDashboard rute={rute} />}

      <div style={{ marginBottom: "5rem" }}>
        <Link to="/master">
          <div className="d-grid fw-bold">
            <button className="button is-link is-rounded is-medium is-fullwidth">
              Master Database
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
