import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("has App Name 'Spark Clothing Shop' in header", () => {
    // Rendering the component
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const appName = screen.getByText(/Spark Clothing Shop/i);
    // Assert
    expect(appName).toBeInTheDocument();
  });

  it("has company 'LOGO' img in header", () => {
    // Rendering the component
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const logoImg = screen.getByTestId("logoImage");
    // Assert
    expect(logoImg).toHaveAttribute("src", "/assets/images/LOGO.jpg");
    expect(logoImg).toHaveAttribute("alt", "LOGO");
  });
});
