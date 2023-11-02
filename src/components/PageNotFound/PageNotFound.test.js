import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { HashRouter } from "react-router-dom";
import PageNotFound from "./PageNotFound";

describe("page not found", () => {
  it("Page Not Found testing", () => {
    // Rendering the component
    render(
      <HashRouter>
        <PageNotFound />
      </HashRouter>
    );
    // Assert
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/404 error/i)).toBeInTheDocument();
  });

  // page not found testing using async function
  it("Page Not Found navigation testing", async () => {
    render(
      <HashRouter>
        <PageNotFound />
      </HashRouter>
    );
    await userEvent.click(screen.getByText(/404 error/i));
  });

  it("has 'Go Home' Button working", () => {
    // rendering component
    render(
      <HashRouter>
        <PageNotFound />
      </HashRouter>
    );
    // access your button
    const button = screen.getByRole("button");
    userEvent.click(button);
    // expect result
    expect(screen.getByText("Go home")).toBeInTheDocument();
  });
});
