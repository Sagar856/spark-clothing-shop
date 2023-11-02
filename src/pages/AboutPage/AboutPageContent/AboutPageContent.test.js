import { render, screen } from "@testing-library/react";
import AboutPageContent from "./AboutPageContent";

describe("About us content", () => {
  it("has heading as 'History:", () => {
    // Rendering the component
    render(<AboutPageContent />);
    // Assert
    const historyHeading = screen.getByText(/History:/i);
    expect(historyHeading).toBeInTheDocument();
  });
});
