import React from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";
import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <div className="row about-page-body">
      <hr />
      <div>
        {/* Helmet for page title */}
        <Helmet>
          <title>AboutPage</title>
        </Helmet>
        <hr />
        <h3 className="about-txt text-center font-weight-bold">About Us</h3>
        <hr />
        {/* adding about us image in about page */}
        <img
          src={process.env.PUBLIC_URL + "/assets/images/About Us.png"}
          className="d-grid col-6 my-3 mx-auto border rounded-4 border-dark"
          alt="About Us"
        ></img>
      </div>
      <div className="col-md-3 about-navigate-section">
        <p>Read more about History here:</p>
        <Link to="/about-us/content">
          <button className="history-btn btn btn-info" data-testid="historyBtn">
            History
          </button>
        </Link>
      </div>
      <div className="col-md-9">
        <h5 className="p-4">
          “We have the capabilities and experience to deliver the products you
          need to move forward.”
        </h5>
        <Outlet />
        {/* Outlet for arranging the stuff */}
      </div>
    </div>
  );
};

export default AboutPage;
