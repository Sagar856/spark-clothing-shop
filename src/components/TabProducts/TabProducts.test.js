import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import TabProducts from "./TabProducts";

describe("Tab Products", () => {
  it("has carousel with css class 'carousel slide' in tab products page", () => {
    // Rendering the component
    render(
      <HashRouter>
        <TabProducts />
      </HashRouter>
    );
    // Assert
    const tabCarouselElement = screen.getByTestId("tabCarouselElement");
    expect(tabCarouselElement).toHaveClass("carousel slide");
  });
});
