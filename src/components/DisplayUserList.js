import React from 'react'
import { Link } from "react-router-dom";

const DisplayUserList = ({ users, onDelete }) => {

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

      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Foto User</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { users.map((user, index) => (
            <tr key={user.id}>
              <td>{index+1}.</td>
              <td>
                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="button is-info mr-2">Edit</Link>
                <button onClick={() => onDelete(user.id)} className="button is-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default DisplayUserList