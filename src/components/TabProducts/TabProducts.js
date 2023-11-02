import React from "react";
import { Outlet } from "react-router-dom";
import "./TabProducts.scss";

const TabProducts = () => {
  const carouselImages = [
    {
      id: "1",
      src: process.env.PUBLIC_URL + "/assets/images/carousel/KidsWearImg.png",
      alt: "KidsWearImg",
      imgDivClassName: "carousel-item",
    },
    {
      id: "2",
      src: process.env.PUBLIC_URL + "/assets/images/carousel/WomenWearImg.png",
      alt: "WomenWearImg",
      imgDivClassName: "carousel-item",
    },
    {
      id: "3",
      src: process.env.PUBLIC_URL + "/assets/images/carousel/MensWearImg.png",
      alt: "MensWearImg",
      imgDivClassName: "carousel-item active",
    },
  ];

  const carouselBtns = [
    {
      id: "1",
      divClassName: "carousel-control-prev",
      dataBsSlide: "prev",
      spanClassName: "carousel-control-prev-icon",
      btnName: "Previous",
    },
    {
      id: "2",
      divClassName: "carousel-control-next",
      dataBsSlide: "next",
      spanClassName: "carousel-control-next-icon",
      btnName: "Next",
    },
  ];

  return (
    <div>
      <hr />
      <div
        // Carousel from bootstrap
        id="carouselExampleCaptions"
        className="carousel slide carousel-resizing"
        data-testid="tabCarouselElement"
      >
        <div className="carousel-inner">
          {carouselImages.map((imgItem) => (
            <div className={imgItem.imgDivClassName} key={imgItem.id}>
              {/* Rendering images in carousel from public folder */}
              <img
                src={imgItem.src}
                className="d-block product-carousel-imgs"
                alt={imgItem.alt}
              ></img>
            </div>
          ))}
        </div>
        <div>
          {carouselBtns.map((btnItem) => (
            <button
              key={btnItem.id}
              className={btnItem.divClassName}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide={btnItem.dataBsSlide}
            >
              <span className={btnItem.spanClassName} aria-hidden="true"></span>
              <span className="visually-hidden">{btnItem.btnName}</span>
            </button>
          ))}
        </div>
      </div>
      <Outlet />
      {/* Outlet for arranging the stuff */}
    </div>
  );
};

export default TabProducts;
