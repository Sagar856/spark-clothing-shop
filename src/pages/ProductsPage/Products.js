import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";
// Importing react icons
import { BsFillStarFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { MdCelebration } from "react-icons/md";
import { fetchApi } from "../../utils/fetchApi";
import "./Products.scss";
import TabProducts from "../../components/TabProducts/TabProducts";

const Products = () => {
  const navigationBtns = [
    {
      id: 1,
      to: "/products",
      dataTestId: "allCategoryBtn",
      btnClassName: "btn btn-primary mx-4 category-btn-all",
      categoryName: "All",
      btnName: "All category",
    },
    {
      id: 2,
      to: "/products?category=mens",
      dataTestId: "mensCategoryBtn",
      btnClassName: "btn btn-primary mx-4 category-btn-mens",
      categoryName: "mens",
      btnName: "Men",
    },
    {
      id: 3,
      to: "/products?category=womens",
      dataTestId: "womensCategoryBtn",
      btnClassName: "btn btn-primary mx-4 category-btn-womens",
      categoryName: "womens",
      btnName: "Women",
    },
    {
      id: 4,
      to: "/products?category=kids",
      dataTestId: "kidsCategoryBtn",
      btnClassName: "btn btn-primary mx-4 category-btn-kids",
      categoryName: "kids",
      btnName: "Kids",
    },
  ];

  // Setting state using setter and getter Of useSate() hook
  const [products, setProducts] = useState();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Getting the products from API response
    fetchApi("http://localhost:5000/products")
      .then((res) => {
        setProducts(res);
      })
      // fetching error if any during loading data
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  // Error message display
  if (isError) {
    return (
      <div className="alert alert-danger">
        Some Error Occurred! Try After Some Time
      </div>
    );
  }

  // Using handle for filtering products
  let url = null;
  const handleCategory = (category) => {
    // filtering products based on 'mens', 'womens', 'kids' category
    if (category !== "All") {
      // Using $ identifier to concatinate dynamic content
      url = `http://localhost:5000/products?category=${category}`;
    } else if (category === "All") {
      // filtering products for All categories
      url = "http://localhost:5000/products";
    }
    fetchApi(url).then((res) => {
      setProducts(res);
    });
  };

  return (
    <>
      {/* Using helmet to setting page title */}
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="text-center"></div>
          <div className="container mx-2">
            <div className="row mt-4 mx-2">
              <div className="col-md-9">
                {/* Category wise filtering buttons */}
                {navigationBtns.map(
                  ({
                    id,
                    to,
                    dataTestId,
                    btnClassName,
                    categoryName,
                    btnName,
                  }) => (
                    <Link to={to} key={id}>
                      <button
                        data-testid={dataTestId}
                        className={btnClassName}
                        onClick={() => handleCategory(categoryName)}
                      >
                        {btnName}
                      </button>
                    </Link>
                  )
                )}
                {/* using react icon */}
                <button className="navigate-info">
                  Navigate here <BsArrowRightCircleFill />
                </button>
              </div>
            </div>

            <div className="row">
              {/* Rendering TabProducts, i.e carousel */}
              <TabProducts />
              <h3 className="my-3">
                {/* React icon */}
                DEALS OF THE DAY <MdCelebration />
              </h3>
              {/* Mapping product details using map() function */}
              {products &&
                products.map(
                  ({
                    id,
                    img,
                    title,
                    description,
                    offerPrice,
                    actualPrice,
                    discountPercent,
                    rating,
                    reviews,
                  }) => {
                    return (
                      <div className="col-md-3" key={id}>
                        {/* Navigating to product detailes by id on click of the product */}
                        <Link
                          to={`/products/${id}`}
                          className="text-dark text-decoration-none"
                        >
                          <div className="card my-2 shadow-sm border-removal">
                            <div className="position-relative ">
                              <img
                                className="w-100 h-75"
                                src={img}
                                alt={title}
                              />
                              <div className="position-absolute bottom-0">
                                <p className="p-1 m-1 rating text-dark">
                                  {rating}
                                  <BsFillStarFill />
                                  {reviews}
                                </p>
                              </div>
                            </div>
                            <div className="card-body">
                              <h5 className="card-title text-start fw-bold">
                                {title}
                              </h5>
                              <p className="card-text text-secondary text-start">
                                {description}
                              </p>
                              <div className="text-start">
                                <span className="me-2 fw-bold">
                                  Rs.{offerPrice}
                                </span>
                                <span className="me-3 text-secondary text-decoration-line-through">
                                  Rs.{actualPrice}
                                </span>
                                <span className="me-2 text-danger">
                                  ({discountPercent}% OFF)
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
      {/* Outlet for arranging the stuff */}
      <Outlet />
    </>
  );
};

export default Products;
