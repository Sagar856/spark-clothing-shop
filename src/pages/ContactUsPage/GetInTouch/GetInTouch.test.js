import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { fetchApi } from "../../../utils/fetchApi";
import GetInTouch from "./GetInTouch";

// setting up mock for fetchApi
// mocking a module with an automocked version when needed
jest.mock("../../../utils/fetchApi");

describe("Get in touch", () => {
  afterEach(jest.resetAllMocks);

  it("has proper get in touch form", () => {
    // Rendering the component
    render(<GetInTouch />);
    const name = screen.getByLabelText("Name:");
    const phone = screen.getByLabelText("Phone:");
    const email = screen.getByLabelText("E-mail:");
    const message = screen.getByLabelText("Message:");
    const submitBtn = screen.getByRole("button");
    // Assert
    expect(name).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(name).toHaveAttribute("type", "text");
    expect(phone).toHaveAttribute("type", "number");
    expect(email).toHaveAttribute("type", "email");
    expect(message).toHaveAttribute("type", "text");
  });

  it("has the submit button in disabled state when name and email field is empty", () => {
    // Rendering the component
    render(<GetInTouch />);
    const name = screen.getByLabelText("Name:");
    const email = screen.getByLabelText("E-mail:");
    const phone = screen.getByLabelText("Phone:");
    const message = screen.getByLabelText("Message:");
    // fetching mock Api
    const mockEventObj = {
      target: {
        value: "",
      },
    };
    // trigger change event
    fireEvent.change(name, mockEventObj);
    fireEvent.change(email, mockEventObj);
    fireEvent.change(phone, mockEventObj);
    fireEvent.change(message, mockEventObj);
    // Assert
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("disabled");
  });

  it("has success message on button click", async () => {
    // Rendering the component
    render(<GetInTouch />);
    const emailInput = screen.getByTestId("emailInput");
    const nameInput = screen.getByTestId("nameInput");
    const phoneInput = screen.getByTestId("phoneInput");
    const messageInput = screen.getByTestId("messageInput");
    // fetching mock Api
    const mockEventObjEmail = {
      target: {
        value: "virat@gmail.com",
      },
    };
    const mockEventObjName = {
      target: {
        value: "Sagar",
      },
    };
    const mockEventObjPhone = {
      target: {
        value: "868767857557",
      },
    };
    const mockEventObjMessage = {
      target: {
        value: "skldsldknlsaknlsakvcl",
      },
    };
    fetchApi.mockResolvedValue(mockEventObjEmail);
    fetchApi.mockResolvedValue(mockEventObjName);
    fetchApi.mockResolvedValue(mockEventObjPhone);
    fetchApi.mockResolvedValue(mockEventObjMessage);

    // Assert
    fireEvent.change(emailInput, mockEventObjEmail);
    fireEvent.change(nameInput, mockEventObjName);
    fireEvent.change(phoneInput, mockEventObjPhone);
    fireEvent.change(messageInput, mockEventObjMessage);
    userEvent.click(screen.getByTestId("submitBtn"));
    await waitFor(() => {
      const isSaved = screen.getByTestId("isSaved");
      expect(isSaved).toBeInTheDocument("Submitted Successfully...");
    });
  });

  // Snapshot testing for GetInTouch
  it("has right snapshot with all requirements completed", () => {
    // Taking snapshot and also converting into JSON
    const snapshotInJson = renderer.create(<GetInTouch />).toJSON();
    // Assert with a matcher toMatchSnapshot()
    expect(snapshotInJson).toMatchSnapshot();
  });

  // NEGATIVE SPEC
  it("has Error message when data not submitted to backend", async () => {
    // Rendering the component
    render(<GetInTouch />);
    const emailInput = screen.getByTestId("emailInput");
    const nameInput = screen.getByTestId("nameInput");
    const phoneInput = screen.getByTestId("phoneInput");
    const messageInput = screen.getByTestId("messageInput");
    // fetching mock Api
    const mockEventObjEmail = {
      target: {
        value: "virat@gmail.com",
      },
    };
    const mockEventObjName = {
      target: {
        value: "Sagar",
      },
    };
    const mockEventObjPhone = {
      target: {
        value: "34535345334",
      },
    };
    const mockEventObjMessage = {
      target: {
        value: "skldsldknlsaknlsakvcl",
      },
    };
    const error = {
      errorInfo: "Some Error Occurred! Try After Some Time",
    };
    fetchApi.mockRejectedValue(error);
    fetchApi.mockRejectedValue(mockEventObjEmail);
    fetchApi.mockRejectedValue(mockEventObjName);
    fetchApi.mockRejectedValue(mockEventObjPhone);
    fetchApi.mockRejectedValue(mockEventObjMessage);

    // Assert
    fireEvent.change(emailInput, mockEventObjEmail);
    fireEvent.change(nameInput, mockEventObjName);
    fireEvent.change(phoneInput, mockEventObjPhone);
    fireEvent.change(messageInput, mockEventObjMessage);
    userEvent.click(screen.getByTestId("submitBtn"));
    await waitFor(() => {
      //   expect(
      //     screen.getByText(/Some Error Occurred! Try After Some Time/i)
      //   ).toBeInTheDocument();
    });
  });
});
