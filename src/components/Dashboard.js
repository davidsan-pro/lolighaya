import { useState, useEffect } from "react";
import { Spinner, Button, Accordion, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import DisplayDashboard from "./DisplayDashboard";
import * as fn from "../MyFunctions";

const Dashboard = () => {
  const [rute, setRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRute();
  }, []);

  const getRute = async (query='') => {
    setIsLoading(true);
    // console.log('master rute getrute');
    let myurl = `${fn.getBaseUrl()}/Mrute`;
    if (query) {
      myurl += myurl.indexOf('?') > 0 ? '&' : '?';
      myurl += `q=${query}`;
    }
    // console.log('dashboard rute', myurl);
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

      {isLoading ? <Spinner animation="border" /> : <DisplayDashboard rute={rute}/>}

      {/* <div style={{ marginBottom: "5rem" }}> */}
        <hr/>
        <Link to="/master">
          <div className="d-grid fw-bold mb-5">
            <Button variant="primary" size="lg">
              Menu Master
            </Button>
          </div>
        </Link>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
