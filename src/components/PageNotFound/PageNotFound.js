// This page will appear when there is wrong url typed in link
import React from "react";
import { useNavigate } from "react-router-dom";

// page change using useNavigate
const PageNotFound = () => {
  // Using useNavigate() to navigate from wrong url to page not found
  let navigate = useNavigate();

  function handleNavigateToHome() {
    navigate("/");
  }

  return (
    <div>
      <hr />
      <h1>Oops!</h1>
      <h2>404 Error | Page Not Found</h2>
      <button
        className="btn btn-primary"
        type="button"
        onClick={handleNavigateToHome}
      >
        Go home
      </button>
    </div>
  );
};

export default PageNotFound;
