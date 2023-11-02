import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import AboutPage from "./AboutPage";

describe("About page", () => {
  it("has about image inside AboutPage ", () => {
    // Rendering the component
    render(
      <HashRouter>
        <AboutPage />
      </HashRouter>
    );
    // Assert
    const aboutImg = screen.getByRole("img");
    expect(aboutImg).toHaveAttribute("src", "/assets/images/About Us.png");
    expect(aboutImg).toHaveAttribute("alt", "About Us");
  });

  it("has 'Read more about History here:' text", () => {
    render(
      <HashRouter>
        <AboutPage />
      </HashRouter>
    );
    const aboutTextTest = screen.getByText(/Read more about History here:/i);
    expect(aboutTextTest).toBeInTheDocument();
  });
});
