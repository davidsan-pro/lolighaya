import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MasterBarang = () => {
  return (
    <div className="container">
      <div className="mb-2">
        <Link to="/add_barang">
          <Button variant="primary">Tambah Barang</Button>
        </Link>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No.</th>
            <th>Foto Barang</th>
            <th>Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
            </td>
            <td>
              <div className="fs-6 fw-bold">Lolipop Vanilla</div>
              <div className="fs-6">
                <div>
                  <small>Stok: 120</small>
                </div>
              </div>
            </td>
            <td>
              <Button className="me-2 mb-2" variant="info">
                Edit
              </Button>
              <Button className="me-2 mb-2" variant="danger">
                Hapus
              </Button>
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
            </td>
            <td>
              <div className="fs-6 fw-bold">Lolipop Strawberry</div>
              <div className="fs-6">
                <div>
                  <small>Stok: 90</small>
                </div>
              </div>
            </td>
            <td>
              <Button className="me-2 mb-2" variant="info">
                Edit
              </Button>
              <Button className="me-2 mb-2" variant="danger">
                Hapus
              </Button>
            </td>
          </tr>
          <tr>
            <td>3.</td>
            <td>
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
            </td>
            <td>
              <div className="fs-6 fw-bold">Lolipop Apel Jeruk</div>
              <div className="fs-6">
                <div>
                  <small>Stok: 100</small>
                </div>
              </div>
            </td>
            <td>
              <Button className="me-2 mb-2" variant="info">
                Edit
              </Button>
              <Button className="me-2 mb-2" variant="danger">
                Hapus
              </Button>
            </td>
          </tr>
          <tr>
            <td>4.</td>
            <td>
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
            </td>
            <td>
              <div className="fs-6 fw-bold">Permen Coklat</div>
              <div className="fs-6">
                <div>
                  <small>Stok: 120</small>
                </div>
              </div>
            </td>
            <td>
              <Button className="me-2 mb-2" variant="info">
                Edit
              </Button>
              <Button className="me-2 mb-2" variant="danger">
                Hapus
              </Button>
            </td>
          </tr>
          <tr>
            <td>5.</td>
            <td>
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
            </td>
            <td>
              <div className="fs-6 fw-bold">Balon Kecil Isi 12</div>
              <div className="fs-6">
                <div>
                  <small>Stok: 100</small>
                </div>
              </div>
            </td>
            <td>
              <Button className="me-2 mb-2" variant="info">
                Edit
              </Button>
              <Button className="me-2 mb-2" variant="danger">
                Hapus
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MasterBarang;
