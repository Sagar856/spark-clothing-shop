import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("Home", () => {
  it("has 'Welcome to Spark Shop' text", () => {
    // Using regex to find the text with case insensitive
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    // Assert
    const h1Element = screen.getByText(/Welcome to Spark Shop/i);
    expect(h1Element).toBeInTheDocument();
  });

  it("has carousel with class 'carousel-inner' in home page", () => {
    // Rendering the component
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    const carouselElement = screen.getByTestId("carouselElement");
    // Assert
    expect(carouselElement).toHaveClass("carousel-inner");
  });

  // Testing courosel with auto sliding images
  it("has carousel with auto sliding images", () => {
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    const carouselSlidingTest = screen.getByTestId("carouselSlidingTest");
    expect(carouselSlidingTest).toHaveClass("carousel slide");
  });
});
