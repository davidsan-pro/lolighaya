import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MenuDatabase = () => {
  return (
    <div className="container has-text-centered">
      <div className="mb-3">
        <Link to="/master_user">
          <Button className="btn-menu fw-bold" variant="primary" size="lg">
            MASTER USER
          </Button>
        </Link>
      </div>
      <div className="mb-3">
        <Link to="/master_barang">
          <Button className="btn-menu fw-bold" variant="primary" size="lg">
            MASTER BARANG
          </Button>
        </Link>
      </div>
      <div className="mb-3">
        <Button className="btn-menu fw-bold" variant="primary" size="lg">
          MASTER TOKO
        </Button>
      </div>
      <div className="mb-3">
        <Button className="btn-menu fw-bold" variant="primary" size="lg">
          MASTER RUTE
        </Button>
      </div>
    </div>
  );
};

export default MenuDatabase;
