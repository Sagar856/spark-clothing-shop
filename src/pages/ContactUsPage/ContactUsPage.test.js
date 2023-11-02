import { render, screen, waitFor } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { fetchApi } from "../../utils/fetchApi";
import ContactUsPage from "./ContactUsPage";

// setting up mock for fetchApi
jest.mock("../../utils/fetchApi");

describe("ContactUsPage", () => {
  it("fetches data properly via API calls", async () => {
    // fetching mock Api
    const mockContactList = [
      {
        address: "280 ParK Avenue Z,Cross cut Complex, Bangalore, India",
        phone: "(91) 987 654 3210",
        email: "contact@sparkclothing.com",
      },
    ];
    fetchApi.mockResolvedValue(mockContactList);
    // Rendering the component
    render(
      <HashRouter>
        <ContactUsPage />
      </HashRouter>
    );
    // Assert
    await waitFor(() => {
      expect(
        screen.findAllByText(
          /280 ParK Avenue Z,Cross cut Complex, Bangalore, India/i
        )
      );
      expect(screen.findAllByText(/(91) 987 654 3210/i));
      expect(screen.findAllByText(/contact@sparkclothing.com/i));
    });
  });

  // NEGATIVE SPEC
  it("renders error properly during API Call ", async () => {
    // preparing mock error obj
    const error = {
      errorInfo: "Sorry! Unable to fetch | Try again after sometimes.",
    };
    fetchApi.mockRejectedValue(error);
    // Rendering the component
    render(<ContactUsPage />);
    // Assert
    expect(
      await screen.findByText(
        /Sorry! Unable to fetch | Try again after sometimes./i
      )
    ).toBeInTheDocument();
  });
});
