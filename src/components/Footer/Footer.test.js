import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer", () => {
  it("has 'home', 'products', 'about', 'contact' element in footer", () => {
    // Rendering the component
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );
    const homeElement = screen.getByTestId("homeElement");
    const productsElement = screen.getByTestId("productsElement");
    const aboutElement = screen.getByTestId("aboutElement");
    const contactElement = screen.getByTestId("contactElement");
    // Assert
    expect(homeElement).toBeInTheDocument("Home");
    expect(productsElement).toBeInTheDocument("Products");
    expect(aboutElement).toBeInTheDocument("About");
    expect(contactElement).toBeInTheDocument("Contact Us");
  });

  // testing Props in footer
  it("receives developerName prop and dispaly in JSX", () => {
    // when you're testing prop, render the comp with necessary props
    render(
      <HashRouter>
        <Footer developerName={"Sagar"} />
      </HashRouter>
    );
    const copyrightYearElement = screen.getByTestId("copyrightYearElement");
    expect(copyrightYearElement).toHaveTextContent(/Sagar/i);
  });
});
