import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
// import { Button } from "react-bootstrap";

const Pagination = ({ itemsPerPage, totalItems, paginate, curPageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="is-flex justify-content-center align-items-center">
      <ul className="pagination">
        <li className="me-2">
          <a onClick={() => paginate(pageNumbers[0])} 
          href={`${window.location.href}`} 
          className="page-link">
            <FontAwesomeIcon icon="fas fa-angle-double-left" />
          </a>
        </li>
        {pageNumbers.map((number) => (
          (number === curPageNumber) 
            ? <li key={number} className="page-item active">
                <a onClick={() => paginate(number)} href={`${window.location.href}`} className="page-link">
                  {number}
                </a>
              </li>
            : <li key={number} className="page-item">
                <a onClick={() => paginate(number)} href={`${window.location.href}`} className="page-link">
                  {number}
                </a>
              </li>
        ))}
        <li className="ms-2">
          <a onClick={() => paginate(pageNumbers[pageNumbers.length - 1])} 
          href={`${window.location.href}`} 
          className="page-link">
            <FontAwesomeIcon icon="fas fa-angle-double-right" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
