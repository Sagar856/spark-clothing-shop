import { render, screen, waitFor } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { fetchApi } from "../../../utils/fetchApi";
import ProductDetails from "./ProductDetails";

// setting up mock for fetchApi
jest.mock("../../../utils/fetchApi");

describe("Product details", () => {
  it("has card with css class 'card' in tab products page", async () => {
    // fetching mock Api
    fetchApi.mockResolvedValue({});
    // Rendering the component
    render(
      <HashRouter>
        <ProductDetails />
      </HashRouter>
    );
    // Assert
    expect(await screen.getByTestId("productDetailCard")).toHaveClass("card");
  });

  it("has product image inside page", async () => {
    // fetching mock Api
    fetchApi.mockResolvedValue({});
    // Rendering the component
    render(
      <HashRouter>
        <ProductDetails />
      </HashRouter>
    );
    // Assert
    expect(await screen.getByRole("img")).toBeInTheDocument();
  });

  it("fetches product details properly via API calls", async () => {
    // fetching mock Api
    const mockProductDetails = [
      {
        detail:
          "Navy Blue solid casual shirt, has a spread collar, long sleeves,",
        size: "Regular Fit",
        fit: "The model (height 6') is wearing a size 40",
      },
    ];
    fetchApi.mockResolvedValue(mockProductDetails);
    // Rendering the component
    render(
      <HashRouter>
        <ProductDetails />
      </HashRouter>
    );
    // Assert
    await waitFor(() => {
      expect(
        screen.findByText(
          /Navy Blue solid casual shirt, has a spread collar, long sleeves,/i
        )
      );
      expect(screen.findAllByText(/Regular Fit/i));
      expect(
        screen.findAllByText(/The model (height 6') is wearing a size 40/i)
      );
    });
  });

  // Negative test spec
  // Testing if error is rendered properly or not
  it("renders error properly during API call", async () => {
    // fetching mock Api
    fetchApi.mockRejectedValue({
      errorMessage: "Some Error Occurred! Try After Some Time",
    });
    // Rendering the component
    render(
      <HashRouter>
        <ProductDetails />
      </HashRouter>
    );
    // Assert
    expect(
      await screen.findByText("Some Error Occurred! Try After Some Time")
    ).toBeInTheDocument();
  });
});
