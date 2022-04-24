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
        <Link to="/master_toko">
          <Button className="btn-menu fw-bold" variant="primary" size="lg">
            MASTER TOKO
          </Button>
        </Link>
      </div>
      <div className="mb-3">
        <Link to="/master_rute">
          <Button className="btn-menu fw-bold" variant="primary" size="lg">
            MASTER RUTE
          </Button>
        </Link>
      </div>
      <hr/>
      <div className="mb-3">
        <Link to="/master_transaksi">
          <Button className="btn-menu fw-bold" variant="primary" size="lg">
            HISTORI TRANSAKSI
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MenuDatabase;
