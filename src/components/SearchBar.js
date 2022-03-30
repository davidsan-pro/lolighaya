import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [searchStr, setSearchStr] = useState('');

  return (
    <div className="is-flex flex-align-items-center mb-3">
      <input type="text" 
      className="input search-input" 
      placeholder="cari data" 
      id="query" 
      value={searchStr}
      onChange={(e) => setSearchStr(e.target.value)}
      />
      <Button className="search-btn ps-3 pe-3" 
      onClick={() => onSearch(searchStr)}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </div>
  );
};

export default SearchBar;
