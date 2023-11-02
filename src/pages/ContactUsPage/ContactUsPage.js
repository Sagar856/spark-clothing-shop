import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";
// Importing react icons
import { FaAddressCard } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { fetchApi } from "../../utils/fetchApi";
import "./ContactUsPage.scss";

const ContactUsPage = () => {
  // Setting state using setter and getter Of useSate() hook
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    // after initial rendering this will be called.
    // ideal hook for us to send req to REST API
    fetchApi("http://localhost:5000/contactData")
      .then((resInJSON) => {
        // capturing the converted JSON res
        setIsLoading(false);
        setIsError(false);
        setContactData(resInJSON);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setContactData([]);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <div
          className="spinner-border text-danger"
          role="status"
          data-testid="spinnerIcon"
        ></div>
      </div>
    );
  }

  // Giving error message when unable to fetch data
  if (isError) {
    return (
      <div className="alert alert-danger">
        Sorry! Unable to fetch | Try again after sometimes.
      </div>
    );
  }

  return (
    <div className="contact-us">
      {/* Using Helmet to set page title */}
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <br />
      <div
        className="card mb-3 border-span m-auto"
        key={contactData.id}
        data-testid="borderSpan"
        style={{ maxWidth: 900 }}
      >
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src="/assets/images/contact.png"
              className="img rounded-3"
              alt="contact"
              width={350}
              height={300}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">Contact Us here</h5>
              <p className="card-text fw-bold m-0">
                <FaAddressCard /> Address:
              </p>
              <span>{contactData.address}</span>
              <hr />
              <p className="card-text fw-bold m-0">
                <GiRotaryPhone /> Phone:
              </p>
              <p className="text-decoration-none">
                {contactData.phone[0]} <br />
                {contactData.phone[1]}
              </p>
              <hr />
              <p className="card-text fw-bold m-0">
                <MdOutlineMarkEmailUnread /> Email:{" "}
              </p>
              <p>{contactData.email}</p>
              <p className="card-text">
                <small className="text-muted">Thank You!</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-center mt-5">
          <p className="bg-info m-0">Get in touch with us here</p>
          <p className="bg-info m-0 mb-2">
            Click on get in touch to fill the form
          </p>
          <Link to="/contact-us/get-in-touch">
            <img
              src="/assets/images/getintouch.png"
              className="rounded mx-auto d-block"
              width={200}
              height={120}
              alt="getintouch"
              data-testid="getInTouchImg"
            ></img>
            <button className="btn btn-info border-dark mt-3">
              Get In Touch
            </button>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ContactUsPage;
