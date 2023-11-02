import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPageContent from "../../pages/AboutPage/AboutPageContent/AboutPageContent";
import ContactUsPage from "../../pages/ContactUsPage/ContactUsPage";
import GetInTouch from "../../pages/ContactUsPage/GetInTouch/GetInTouch";
import HomePage from "../../pages/HomePage/HomePage";
import ProductsPage from "../../pages/ProductsPage/Products";
import ProductDetails from "../../pages/ProductsPage/ProductDetails/ProductDetails";
import PageNotFound from "../../components/PageNotFound/PageNotFound";

// Lazy loading for AboutPage
const AboutPage = React.lazy(() => import("../../pages/AboutPage/AboutPage"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={<div className="spinner-border text-primary text-center"></div>}
    >
      <Routes>
        {/* URL's Configuration */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us/" element={<AboutPage />}>
          {/* Nested routing: nesting about page and about page content */}
          <Route path="content" element={<AboutPageContent />} />
        </Route>
        <Route path="/contact-us/" element={<ContactUsPage />}>
          <Route path="get-in-touch" element={<GetInTouch />}></Route>
        </Route>

        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
