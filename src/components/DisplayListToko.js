import { Link } from "react-router-dom";

const DisplayListToko = ({ toko, onDelete }) => {
  console.log("display toko", toko);
  return (
    <>
      <>
        {/* <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>admin1</strong> 
                  <br />
                  <small>admin@aa.com</small> 
                  <br />
                  <small>08123123123</small>
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item" aria-label="reply">
                    <button className='button is-small is-info'>Edit</button>
                  </a>
                  <a className="level-item" aria-label="retweet">
                    <button className='button is-small is-danger'>Delete</button>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div> */}
      </>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Foto Toko</th>
            <th>Info Toko</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            // kalo jumlah datanya 1 atau lebih maka tampilkan dlm bentuk tabel
            // tapi kalo datanya masih kosong maka tampilkan tulisan 'Data is empty'
            toko.length > 0 ? (
              toko.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}.</td>
                  <td>
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                  </td>
                  <td>
                    <div className="fs-5">{item.nama}</div>
                    <div>
                      <small>{item.stok}</small>
                    </div>
                  </td>
                  <td>
                    <Link to={`/edit_toko/${item.id}`} className="button is-success mr-2">
                      Edit
                    </Link>
                    <button onClick={() => onDelete(item.id)} className="button is-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={99}>
                  <em>Data masih kosong</em>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  );
};

export default DisplayListToko;
