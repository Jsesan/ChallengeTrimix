import Divider from "@/components/Divider";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Divider", () => {
  it("renders divider", () => {
    render(<Divider />);

    const divider = screen.getByTestId("divider");

    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("border w-full h-0 border-white");
  });
});
