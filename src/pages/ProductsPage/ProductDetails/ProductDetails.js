import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../../../utils/fetchApi";
// importing React icons/logos
import { BsFillStarFill } from "react-icons/bs";
import { RiStarSmileFill } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import FeedbackPage from "../FeedbackForm/FeedbackForm";
import "./ProductDetails.scss";
import { Helmet } from "react-helmet";

const ProductDetails = () => {
  // Setting state using setter and getter Of useSate() hook
  const [product, setProduct] = useState([]);
  const [comments, setComments] = useState([]);
  const [email, setEmail] = useState([]);
  const [isError, setIsError] = useState(false);

  // useParam hook to access url with perticular Id from routing
  const params = useParams();

  useEffect(() => {
    // Getting product details by id from API
    fetchApi(`http://localhost:5000/products/${params.id}`)
      .then((res) => {
        setProduct(res);
        setComments(res.feedback);
        setEmail(res.feedback);
      })
      .catch((err) => {
        // Handling error
        setIsError(true);
      });
  }, [params.id]);

  // Showing error message after getting error
  if (isError) {
    return (
      <div className="alert alert-danger">
        Some Error Occurred! Try After Some Time
      </div>
    );
  }

  // Mapping most recent added comment in UI
  let updatedComment = null;
  updatedComment = comments.map((item) => {
    return (
      <div key={item.email}>
        <span>
          {item.email} <br />
        </span>
        <span>{item.comments}</span>
        <hr />
      </div>
    );
  });

  return (
    <>
      {/* Using Helmet to set page title */}
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <div className="product-details" key={product.id}>
        <br />
        <h4 className="text-center m-3">Product Details</h4>
        {/* Rendering indivisual product using id of the product */}
        <div
          className="card mb-3 m-auto"
          data-testid="productDetailCard"
          style={{ maxWidth: 1000 }}
        >
          <div className="row g-0">
            <div className="col-md-5">
              {/* Product image loding */}
              <img
                src={product.img}
                className="img-fluid rounded-3 m-3"
                alt={product.title}
                width={330}
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title fw-bold">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <button className="p-2 border-0 rounded">
                  {product.rating} <BsFillStarFill />
                  {product.reviews} Ratings
                </button>
                <hr />
                {/* Product price details */}
                <div className="text-start product-prices">
                  <span className="me-2 fw-bold">₹{product.offerPrice} </span>
                  <span className="me-3 text-secondary text-decoration-line-through">
                    MRP ₹{product.actualPrice}
                  </span>
                  <span className="me-2 fw-bold discount-percent">
                    ({product.discountPercent}% OFF)
                  </span>
                </div>
                <p className="card-text">
                  <small className="text-success fw-bold">
                    inclusive of all taxes
                  </small>
                </p>
                <hr />
                {/* Product details like material and all */}
                <h5>
                  Product Details <BiDetail />
                </h5>
                <p>{product.detail}</p>
                <span className="fw-bold">Size & Fit</span>
                <p>
                  {product.size} <br />
                  {product.fit}
                </p>
                <span className="fw-bold">Material & Care</span>
                <p>
                  {product.material} <br /> {product.care}
                </p>
                <p>For: {product.category} </p>
                <hr />
                {/* Feedback page rendering */}
                <div>
                  <h4 className="text-success">
                    Feedback <RiStarSmileFill />
                  </h4>
                  <p>
                    We would love to hear any feedback from our customers so
                    that we can further and continue enhancing and improving our
                    services. Thank you!
                  </p>
                  <span className="text-black-50">
                    <h6>Reviews</h6>
                    {/* Fetching already added comments */}
                    {updatedComment.length ? (
                      updatedComment
                    ) : (
                      <div>
                        No Feedback! you can submit new feedback by feeling the
                        form below
                        <hr />
                      </div>
                    )}
                  </span>
                  {/* Rendering feedbackPage component and passing props (Parent to child communication) */}
                  <FeedbackPage
                    id={product.id}
                    email={updatedComment.email}
                    emails={email}
                    feedback={product?.feedback}
                  ></FeedbackPage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
