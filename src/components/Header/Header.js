import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import "./Header.scss";

function Header() {
  return (
    <header className="navbar-expand-md navbar">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="px-3 py-0 fixed-top text-dark bg-light bg-lignt border-bottom">
        {/* In JSX class become className */}
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            {/* href should be with valid value */}
            <Link
              className="d-flex flex-column align-items-center my-0 py-1 my-lg-0 me-lg-auto text-dark text-decoration-none navbar navbar-brand"
              to="/"
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/images/LOGO.jpg"}
                className="logo-image bi me-2"
                data-testid="logoImage"
                alt="LOGO"
              />
              <h4 className="font-link-Satisfy" data-testid="headerAppName">
                Spark Clothing Shop
              </h4>
            </Link>
            <button
              className="nav-btn navbar-toggler ml-auto collapsed "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample03"
              aria-controls="navbarsExample03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon my-toggler" />
            </button>
            <div className="navbar-collapse collapse " id="navbarsExample03">
              <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                <li className="nav-item"></li>
                <li className="nav-item"></li>
                <li className="nav-item"></li>
                <li className="nav-item dropdown"></li>
              </ul>
              {/* Here we rendered NavbarMenu component  */}
              <NavbarMenu />
            </div>
          </div>
        </div>
      </div>
      {/* In JSX all tags should be closed */}
    </header>
  );
}

export default Header;
