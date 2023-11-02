import { render, screen, waitFor } from "@testing-library/react";
import { createHashHistory } from "history";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

describe("AppRouter component", () => {
  afterEach(jest.resetAllMocks);

  // Home page navigation Testing
  it("navigates correctly to HomePage", async () => {
    // creating hash history
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/");
    // Rendering the component
    render(
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/Welcome to Spark Shop/i)).toBeInTheDocument()
    );
  });

  // ProductsPage page navigation Testing
  it("navigates correctly to ProductsPage", async () => {
    // creating hash history
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/products");
    // Rendering the component
    render(
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/All category/i)).toBeInTheDocument()
    );
  });

  // contactUsPage page navigation Testing
  it("navigates correctly to contactUsPage", async () => {
    // creating hash history
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/contact-us/");
    // Rendering the component
    render(
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/Contact Us here/i)).toBeInTheDocument()
    );
  });

  // Negative testing
  // PageNotFound Testing for invalid URL
  it("navigates PageNotFound page when entered wrong url", async () => {
    // creating hash history
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/Invalid-Url/");
    // Rendering the component
    render(
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    );
    await waitFor(() =>
      expect(
        screen.getByText(/404 Error | Page Not Found/i)
      ).toBeInTheDocument()
    );
  });

  // Testing lazy loaded page
  it("navigates correctly to AboutPage", async () => {
    // creating hash history
    const history = createHashHistory({ initialEntries: ["/"] });
    history.push("/about-us/");
    // Rendering the component
    render(
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/About Us/i)).toBeInTheDocument()
    );
  });
});
