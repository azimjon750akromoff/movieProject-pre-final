import React from "react";
import "../Footer/Footer.scss";
// import logo from "../assets/Group 1-2.svg";
// import { Link } from "react-router-dom";
import "../../styles/general.scss";

import logo from "../../assets/icons/Hulu_2019.svg";
// import facebook from "../assets/image 106.svg";
// import insta from "../assets/image 107.svg";
// import twitter from "../assets/image 108.svg";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="left container">
          <div className="logo-image">
            <img src={logo} alt="" />
          </div>
          <div className="tf">
            <p>
              Hulu - Free movies online, here you can watch movies online in
              high quality for free without annoying of advertising, just come
              and enjoy your movies online. fmovie, fmovies, bmovies
            </p>
            <p>
              Disclaimer: This site does not store any files on its server. All
              contents are provided by non-affiliated third parties.
            </p>
          </div>
        </div>

        <div className="middle">
          <div className="link">
            <span>MOVIES</span>
            <h5>Action</h5>
            <h5>Adventure</h5>
            <h5>Crime</h5>
            <h5>Comedy</h5>
            <h5>Drama</h5>
          </div>
          <div className="link">
            <span>COUNTRY</span>
            <h5>United States</h5>
            <h5>Canada</h5>
            <h5>United Kingdom</h5>
            <h5>France</h5>
            <h5>New Zealand</h5>
          </div>

          <div className="link">
            <span>FREE MOVIES</span>

            <h5>Movies</h5>
            <h5>TV-series</h5>
            <h5>Top IMDb</h5>
          </div>
          <div className="link">
            <span>HELP</span>

            <h5>FAQ's</h5>
            <h5>DMCA</h5>
          </div>
        </div>
    
      </div>

       <div className="copyright">
            <span>Copyright © 2024 Hulu.uz. All Rights Reserved</span>
        </div> 
    </>
  );
}

export default Footer;
