import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchApi } from "../../../utils/fetchApi";
import FeedbackForm from "./FeedbackForm";

// setting up mock for fetchApi
jest.mock("../../../utils/fetchApi");

describe("FeedbackForm", () => {
  // Testing feedback form
  it("has proper Feedback form", async () => {
    // Rendering the component
    render(<FeedbackForm />);
    const nameInput = screen.getByTestId("nameInput");
    const emailInput = screen.getByTestId("emailInput");
    const phoneInput = screen.getByTestId("phoneInput");
    const commentsInput = screen.getByTestId("commentsInput");
    const submitBtn = screen.getByRole("button");
    // Assert
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(commentsInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(nameInput).toContainHTML("type", "text");
    expect(emailInput).toContainHTML("type", "email");
    expect(phoneInput).toContainHTML("type", "tel");
  });

  it("has all form elements with empty values after successfull submit", async () => {
    // Rendering the component
    render(<FeedbackForm />);
    const nameInput = screen.getByTestId("nameInput");
    const emailInput = screen.getByTestId("emailInput");
    const phoneInput = screen.getByTestId("phoneInput");
    // setting up mock for fetchApi
    const mockInputFields = {
      nameInput: { value: "" },
      emailInput: { value: "" },
      phoneInput: { value: "" },
    };
    fetchApi.mockResolvedValue(mockInputFields);
    await waitFor(() => {
      // Using fireEvent to add values in form input
      fireEvent.change(emailInput, mockInputFields);
      fireEvent.change(nameInput, mockInputFields);
      fireEvent.change(phoneInput, mockInputFields);
      // Using userEvent to hit submit button
      userEvent.click(screen.getByTestId("submitBtn"));
      // Assert
      expect(screen.getByTestId("emailInput")).toHaveAttribute("value", "");
      expect(screen.getByTestId("nameInput")).toHaveAttribute("value", "");
      expect(screen.getByTestId("phoneInput")).toHaveAttribute("value", "");
    });
  });

  // Mock with patch request
  //   // NEGATIVE SPEC
  // it('should render the error properly if API Call does not respond', async () => {
  //   const error = {
  //     errorInfo: 'Sorry! Unable to fetch data! Try again later.'
  //   };
  //   fetchApi.mockRejectedValue(error);
  //   render(<FeedbackForm />);
  //   const errorMessage = await screen.findByText(/Sorry! Unable to fetch data! Try again later./i);
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it("has success message on button click", async () => {
  //   // Rendering the component
  //   render(<FeedbackForm />);
  //   const emailInput = screen.getByTestId("emailInput");
  //   const nameInput = screen.getByTestId("nameInput");
  //   const phoneInput = screen.getByTestId("phoneInput");
  //   const messageInput = screen.getByTestId("commentsInput");
  //   // fetching mock Api
  //   const mockEventObjEmail = {
  //     target: {
  //       value: "abcfbd@d.com",
  //     },
  //   };
  //   const mockEventObjName = {
  //     target: {
  //       value: "Sagar",
  //     },
  //   };
  //   const mockEventObjPhone = {
  //     target: {
  //       value: "868767857557",
  //     },
  //   };
  //   const mockEventObjComments = {
  //     target: {
  //       value: "skldsldknlsaknlsakvcl",
  //     },
  //   };
  //   fetchApi.mockResolvedValue(mockEventObjEmail);
  //   fetchApi.mockResolvedValue(mockEventObjName);
  //   fetchApi.mockResolvedValue(mockEventObjPhone);
  //   fetchApi.mockResolvedValue(mockEventObjComments);

  //   // Assert
  //   // fireEvent.change(emailInput, mockEventObjEmail);
  //   fireEvent.change(nameInput, mockEventObjName);
  //   fireEvent.change(phoneInput, mockEventObjPhone);
  //   // fireEvent.change(emailInput, mockEventObjEmail);
  //   fireEvent.change(messageInput, mockEventObjComments);
  //   userEvent.click(screen.getByTestId("submitBtn"));
  //   await waitFor(() => {
  //     const isSaved = screen.getByTestId("isSaved");
  //     expect(isSaved).toBeInTheDocument(
  //       "THANK YOU! for your valuable feedback..."
  //     );
  //   });
  // });

  // it("has warning on entering duplicate email", async () => {
  //   // Rendering the component
  //   render(<FeedbackForm />);
  //   const emailInput = screen.getByTestId("emailInput");
  //   // fetching mock Api
  //   const mockEventObjEmail = {
  //     emailInput: {
  //       value: "s@b.com",
  //     },
  //   };
  //   fetchApi.mockResolvedValue(mockEventObjEmail);

  //   // Assert
  //   fireEvent.change(emailInput, mockEventObjEmail);
  //   await waitFor(() => {
  //     const disabledBtnTest = screen.getByTestId("disabledBtnTest");
  //     expect(disabledBtnTest.textContent).toBe("Email & Feedback already exists! Try using different email");
  //   });
  // });
});
