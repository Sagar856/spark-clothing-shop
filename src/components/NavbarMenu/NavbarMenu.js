import React from "react";
import { NavLink } from "react-router-dom";
import "./NavbarMenu.scss";

const NavbarMenu = () => {
  const navList = [
    {
      id: "11",
      url: "/",
      src: process.env.PUBLIC_URL + "/assets/icons/Home.png",
      alt: "Home",
      title: "Home",
    },
    {
      id: "22",
      url: "/products",
      src: process.env.PUBLIC_URL + "/assets/icons/Product.png",
      alt: "Products",
      title: "Products",
    },
    {
      id: "33",
      url: "/about-us",
      src: process.env.PUBLIC_URL + "/assets/icons/AboutUs.png",
      alt: "About Us",
      title: "About Us",
    },
    {
      id: "44",
      url: "/contact-us/",
      src: process.env.PUBLIC_URL + "/assets/icons/ContactUs.png",
      alt: "ContactUs",
      title: "Contact Us",
    },
  ];

  return (
    <div>
      <ul
        className="nav navbar-nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small"
        data-testid="navbarClassTest"
      >
        {/* Mapping Navbar icons */}
        {navList.map((navItem) => (
          <li className="active fw-bold" key={navItem.id}>
            {/* Using navlink for header */}
            <NavLink
              to={navItem.url}
              className="nav-link navbar__link px-3 py-0"
              aria-current="page"
            >
              <img
                src={navItem.src}
                className="nav-img-icons bi d-block mx-auto mb-1"
                alt={navItem.alt}
                data-testid="navbarImgIcon"
              />
              <small>{navItem.title}</small>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarMenu;
