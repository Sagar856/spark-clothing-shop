import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Footer.scss";
// Importing react icons
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

// Using props in footer
const Footer = function (props) {
  let copyrightYear = 2022;

  const findUsIcons = [
    {
      id: 1,
      icon: <BsTwitter />,
    },
    {
      id: 2,
      icon: <BsInstagram />,
    },
    {
      id: 3,
      icon: <BsFacebook />,
    },
    {
      id: 4,
      icon: <BsWhatsapp />,
    },
  ];

  return (
    <div className="footer">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p
          className="col-md-4 mb-0 mx-4 text-muted"
          data-testid="copyrightYearElement"
        >
          {/* Using prop developerName received from App.js */}
          Copyright © {copyrightYear} | {props.developerName}
        </p>

        <ul className="nav col-md-4 justify-content">
          <div>
            {/* {navList.map((navItem) => ( */}
            <div>
              <Link
                to="/"
                className="footer-nav d-inline navbar-brand"
                data-testid="homeElement"
              >
                Home
              </Link>
              <Link
                to="/Products"
                className="footer-nav d-inline navbar-brand"
                data-testid="productsElement"
              >
                Products
              </Link>
              <Link
                to="/about-us"
                className="footer-nav d-inline navbar-brand"
                data-testid="aboutElement"
              >
                About
              </Link>
              <Link
                to="/contact-us"
                className="footer-nav d-inline navbar-brand"
                data-testid="contactElement"
              >
                Contact Us
              </Link>
            </div>
            {/* ))} */}
          </div>
        </ul>
        <div className="col-md-3 d-flex align-items-center justify-content-end mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          {/* Rendering React icons */}
          {findUsIcons.map((Icons) => (
            <div key={Icons.id}>
              <Link to="/" className="navbar-brand mx-2">
                {Icons.icon}
              </Link>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

// Validating received prop
Footer.propTypes = {
  developerName: PropTypes.string,
};

export default Footer;
