import { render, screen, within } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";

describe("Navbar", () => {
  it("has class with name 'nav'", () => {
    // Rendering the component
    render(
      <HashRouter>
        <NavbarMenu />
      </HashRouter>
    );
    // Assert
    const image = screen.getByTestId("navbarClassTest");
    expect(image).toHaveClass("nav");
  });

  it("should render list of 4 items", () => {
    render(
      <HashRouter>
        <NavbarMenu />
      </HashRouter>
    );
    const list = screen.getAllByRole("listitem");
    expect(list.length).toBe(4);
  });
});
