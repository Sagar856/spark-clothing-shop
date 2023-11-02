import React, { useState } from "react";
// imported useFormik from formik package for the form
import { useFormik } from "formik";
import "../GetInTouch/GetInTouch.scss";

const GetInTouch = () => {
  // Setting state using setter and getter Of useSate() hook
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);

  //useFormik for submitting the form data to the local backend
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },

    onSubmit: (values, { resetForm }) => {
      // fetch API using post method to post the data
      // posting form data to API
      fetch("http://localhost:5000/getInTouchData", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          setIsSaved(true);
          // console.log(res);
        })
        // fetching error if any during loading data
        .catch((err) => {
          setIsError(true);
        });
      // reseting the form after submit
      resetForm({ values: "" });
    },
  });

  // Error message display
  if (isError) {
    return (
      <div className="alert alert-danger" data-testid="errorMessage">
        Some Error Occurred! Try After Some Time
      </div>
    );
  }

  return (
    <div className="get-in-touch-form">
      <div className="feedback-form mt-5">
        {/*get in touch form */}
        <form
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="contact-form"
        >
          <div className="form-data field-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              required
              placeholder="Enter name"
              data-testid="nameInput"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Enter mail"
              required
              data-testid="emailInput"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              className="form-control"
              name="phone"
              id="phone"
              required
              placeholder="Enter phone number"
              data-testid="phoneInput"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="message">Message:</label>
            <textarea
              type="text"
              name="message"
              className="form-control"
              id="message"
              required
              placeholder="Enter message"
              data-testid="messageInput"
              value={formik.values.message}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <button
              className="btn-style btn btn-info px-4 py-2 fw-bold"
              type="submit"
              data-testid="submitBtn"
              // disabling the submit button if email is not entered
              disabled={formik.values.email == ""}
            >
              Submit
            </button>
            <div>
              {/* Giving successful message after successful submission of data to backend */}
              {isSaved ? (
                <div data-testid="isSaved" className="alert alert-success">
                  Submitted Successfully...
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="get-in-touch-img-form">
        <img
          src="/assets/images/GetInTouchImgForm.png"
          className="d-block mt-5 get-in-touch-img"
          alt="getintouch"
          data-testid="getInTouchImgForm"
        ></img>
      </div>
    </div>
  );
};

export default GetInTouch;
