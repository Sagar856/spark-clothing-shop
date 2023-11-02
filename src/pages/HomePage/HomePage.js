import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../HomePage/HomePage.scss";

const HomePage = () => {
  const carouselImages = [
    {
      id: 1,
      src: process.env.PUBLIC_URL + "/assets/images/carousel/WelcomeImg.jpg",
      alt: "WelcomeImg",
      imageDivClassName: "carousel-item active",
      imageClassName: "d-block w-100 border border-dark",
    },
    {
      id: 2,
      src:
        process.env.PUBLIC_URL + "/assets/images/carousel/SpecialOfferImg1.png",
      alt: "SpecialOfferImg1",
      imageDivClassName: "carousel-item",
      imageClassName: "d-block w-100 border border-dark carousel-home-img",
    },
    {
      id: 3,
      src: process.env.PUBLIC_URL + "/assets/images/carousel/ShoppingImg.png",
      alt: "ShoppingImg",
      imageDivClassName: "carousel-item",
      imageClassName: "d-block w-100 border border-dark",
    },
  ];

  const carouselBtns = [
    {
      id: 1,
      btnDivClassName: "carousel-control-prev",
      dataBsSlide: "prev",
      spanClassName: "carousel-control-prev-icon",
      btnName: "Previous",
    },
    {
      id: 2,
      btnDivClassName: "carousel-control-next",
      dataBsSlide: "next",
      spanClassName: "carousel-control-next-icon",
      btnName: "Next",
    },
  ];

  return (
    <>
      {/* Adding helmet for page title */}
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div>
        <h1 className="text-center p-4 font-link-Aboreto">
          Welcome to Spark Shop
        </h1>
        {/* Adding carousel from bootstrap */}
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-testid="carouselSlidingTest"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" data-testid="carouselElement">
            {carouselImages.map((imgItem) => (
              <div className={imgItem.imageDivClassName} key={imgItem.id}>
                <img
                  src={imgItem.src}
                  className={imgItem.imageClassName}
                  alt={imgItem.alt}
                ></img>
              </div>
            ))}
          </div>
          <div>
            {carouselBtns.map((btnItem) => (
              <button
                key={btnItem.id}
                className={btnItem.btnDivClassName}
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide={btnItem.dataBsSlide}
              >
                <span
                  className={btnItem.spanClassName}
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">{btnItem.btnName}</span>
              </button>
            ))}
          </div>
        </div>
        <br />
        <div className="position-absolute top-120 start-50 translate-middle">
          {/* button to navigate to products page */}
          <Link to="/products">
            <button type="button" className="btn btn-info btn-sm mt-5r">
              See All Products
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
