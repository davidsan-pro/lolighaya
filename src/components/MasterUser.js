import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MasterUser = () => {
  return (
    <div className="container">
      <div className="mb-2">
        <Link to="/add_user">
          <Button variant="primary">Tambah User</Button>
        </Link>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No.</th>
            <th>Foto User</th>
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
              <div className="fs-6 fw-bold">UsernameAdmin1</div>
              <div className="fs-7">
                <div>
                  <small>Nama Lengkap Admin</small>
                </div>
                <div>
                  <small>admin1@gmail.com</small>
                </div>
                <div>
                  <small>08123123123</small>
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
              <div className="fs-6 fw-bold">budisales</div>
              <div className="fs-7">
                <div>
                  <small>Budi Wirawan</small>
                </div>
                <div>
                  <small>budiw@gmail.com</small>
                </div>
                <div>
                  <small>08123123222</small>
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
              <div className="fs-6 fw-bold">susisusanti</div>
              <div className="fs-7">
                <div>
                  <small>Susi Susanti</small>
                </div>
                <div>
                  <small>susi_indo@gmail.com</small>
                </div>
                <div>
                  <small>08123123333</small>
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
              <div className="fs-6 fw-bold">budimulianto</div>
              <div className="fs-7">
                <div>
                  <small>Budi Mulianto</small>
                </div>
                <div>
                  <small>budimul@gmail.com</small>
                </div>
                <div>
                  <small>08123123444</small>
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
              <div className="fs-6 fw-bold">Susanto</div>
              <div className="fs-7">
                <div>
                  <small>Susanto Hartawan</small>
                </div>
                <div>
                  <small>susanto123@gmail.com</small>
                </div>
                <div>
                  <small>08123123555</small>
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

export default MasterUser;
