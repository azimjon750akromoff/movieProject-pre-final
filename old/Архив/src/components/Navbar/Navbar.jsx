import "../Navbar/Navbar.scss";
import "../../styles/general.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/icons/Hulu_2019.svg";

import SearchBar from "@mkyy/mui-search-bar";

const Navbar = () => {
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", textFieldValue);
  };

  return (
    <div className="navbar container">
      <div className="left">
        <Link to="/">
          <img width="200px" height="150px" src={Logo} alt="" />
        </Link>
      </div>

      <div className="middle">
        <Link to="/home">Home</Link>
        <Link to="/genres">Genres</Link>
        <Link to="/country">Country</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tvseries">TV-Series</Link>
        <Link to="/imdb">Top IMDb</Link>
      </div>
      <div className="right">
        <SearchBar
          value={textFieldValue}
          width="250px"
          height="34px"
          onChange={(newValue) => setTextFieldValue(newValue)}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default Navbar;
