import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import "./FeedbackForm.scss";

const FeedbackForm = (props) => {
  // Setting state using setter and getter Of useSate() hook
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);

  // Creating, submtting and resetting the form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      comments: "",
      feedbackRating: "",
    },

    onSubmit: (values, { resetForm }) => {
      //  Fetching up the entered form fields with the reviews in API using PATCH method
      fetch(`http://localhost:5000/products/${props.id}`, {
        method: "PATCH",
        body: JSON.stringify({ feedback: [...props.feedback, values] }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          setIsSaved(true);
        })
        .catch((err) => {
          setIsError(true);
        });
      // Resetting form values after successful submission
      resetForm({ values: "" });
    },
  });

  // Code for email validation
  let isDisabled = false;
  let result;
  // Validating email, if already exists give alert
  if (formik?.values.email) {
    result = props.emails.find((item) => item.email === formik.values.email);

    // This will disable the submit button if email already exist
    if (result?.email === formik.values.email) {
      isDisabled = true;
    }
  }

  // Error message display
  if (isError) {
    return (
      <div className="alert alert-danger" data-testid="errorMessage">
        Sorry! Unable to fetch data! Try again later.
      </div>
    );
  }

  return (
    <div>
      {/* Feedback form */}
      <form
        className="feedback-form"
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="field-group">
          <label htmlFor="nameInput">Enter Name: </label>
          <input
            type="text"
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
          <label htmlFor="emailInput">Enter E-mail: </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter mail"
            data-testid="emailInput"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="field-group">
          <label htmlFor="phoneInput">Enter Phone: </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            required
            placeholder="Enter phone number"
            data-testid="phoneInput"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </div>
        <div className="field-group query-box">
          <label htmlFor="comments">Write feedback: </label>
          <textarea
            name="comments"
            cols={30}
            rows={3}
            className="form-control"
            id="comments"
            required
            placeholder="Write your feedback in 50 words"
            data-testid="commentsInput"
            value={formik.values.comments}
            onChange={formik.handleChange}
          />
        </div>
        {/* Taking rating from user using step */}
        <div className="field-group">
          <div>
            <label htmlFor="rating">
              Choose Ratings:
              <br />
              <small>0 for worst & 5 for best</small>
            </label>
          </div>
          <div className="step-rating-input dropend">
            <input
              type="number"
              className="form-control w-100"
              id="feedbackRating"
              placeholder="Rating"
              step={1}
              max={5}
              min={0}
              value={formik.values.feedbackRating}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="field-group">
          <div className="btn-container">
            <button
              className="submit-btn btn btn-info mt-3 px-4 py-2"
              data-testid="submitBtn"
              type="submit"
              disabled={isDisabled}
            >
              <span className="text fw-bold">Submit Feedback</span>
            </button>
          </div>
        </div>

        <div>
          {/* Display succesfull message after form submission */}
          {isSaved ? (
            <div data-testid="isSaved" className="alert alert-success">
              THANK YOU! for your valuable feedback...
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {/* Display warning after entering duplicate email */}
          {isDisabled ? (
            <div className="alert alert-danger" data-testid="disabledBtnTest">
              <p>Email & Feedback already exists! Try using different email</p>
              <hr />
              <span>
                {/* Showing already exist feedback and email */}
                {result?.email} <br />
              </span>
              <span>{result?.comments}</span>
            </div>
          ) : (
            ""
          )}
          <span className="invisible" data-testid="feedbackPropTest">
            {result?.email}
          </span>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
