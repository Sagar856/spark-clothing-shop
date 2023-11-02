import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { fetchApi } from "../../utils/fetchApi";
import Products from "./Products";

// setting up mock for fetchApi
// mocking a module with an automocked version when needed
jest.mock("../../utils/fetchApi");

describe("products", () => {
  it("renders error properly during API call", async () => {
    fetchApi.mockRejectedValue({
      errorMessage: "Some Error Occurred! Try After Some Time",
    });
    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );
    expect(
      await screen.findByText("Some Error Occurred! Try After Some Time")
    ).toBeInTheDocument();
  });

  it("fetches Products properly via API call [MOCKING]", async () => {
    // prepare the mock data for the users
    const mockProduct = [
      {
        id: 1,
        description: "Men Pure Cotton Casual Shirt",
        title: "Roadster",
        img: "/assets/images/Product1.png",
        offerPrice: "674",
        actualPrice: "1499",
        discountPercent: "55",
        material: "100% Cotton",
        care: "Machine-wash",
      },
    ];
    fetchApi.mockResolvedValue(mockProduct);
    // render the comp
    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );
    //  then, assert
    const descriptionEl = await screen.findByText(
      /Men Pure Cotton Casual Shirt/i
    );
    expect(descriptionEl).toBeInTheDocument();
    await expect(screen.getByText(/Roadster/i)).toBeInTheDocument();
    await expect(
      screen.getByText(/Men Pure Cotton Casual Shirt/i)
    ).toBeInTheDocument();
    await expect(screen.getByText(/674/i)).toBeInTheDocument();
    await expect(screen.getByText(/1499/i)).toBeInTheDocument();
    await expect(screen.getByText(/55/i)).toBeInTheDocument();
  });

  it("has proper working category buttons as 'All category'", async () => {
    fetchApi.mockResolvedValue();

    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );
    const allCategoryBtn = await screen.getByTestId("allCategoryBtn");
    expect(allCategoryBtn).toBeInTheDocument();
    expect(allCategoryBtn).toHaveTextContent("All category");
  });

  // Snapshot testing
  it("has right snapshot with all requirements completed", () => {
    // to take snapshot we need react-test-renderer.
    const snapshotInJson = renderer
      .create(
        <HashRouter>
          <Products />
        </HashRouter>
      )
      .toJSON();
    // let assert with a matchrer toMatchSnapshot()
    expect(snapshotInJson).toMatchSnapshot();
  });

  it("should render the available products properly", async () => {
    fetchApi.mockResolvedValue();
    render(
      <HashRouter>
        <Products />
      </HashRouter>
    );

    const mensCategoryBtn = await screen.findByTestId("mensCategoryBtn");
    const womensFashion = await screen.findByTestId("womensCategoryBtn");
    const kidsFashion = await screen.findByTestId("kidsCategoryBtn");
    const allCategoryBtn = await screen.findByTestId("allCategoryBtn");

    expect(allCategoryBtn.textContent).toBe("All category");

    await waitFor(() => {
      fireEvent.click(mensCategoryBtn);
      const dnone = screen.getByTestId("mensCategoryBtn");
      expect(dnone.textContent).toBe("Men");
    });

    await waitFor(() => {
      fireEvent.click(womensFashion);
      const womensCategoryBtn = screen.getByTestId("womensCategoryBtn");
      expect(womensCategoryBtn.textContent).toBe("Women");
    });

    await waitFor(() => {
      fireEvent.click(kidsFashion);
      const kidsCategoryBtn = screen.getByTestId("kidsCategoryBtn");
      expect(kidsCategoryBtn.textContent).toBe("Kids");
    });
  });
});
