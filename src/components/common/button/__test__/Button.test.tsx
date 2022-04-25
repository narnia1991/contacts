import { render, screen } from "@testing-library/react";
import IButton from "../Button";

describe("Test Button Component", () => {
  test("Must render correctly", () => {
    render(<IButton text="lowercase" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("Must invoke onClick function", () => {
    const mockFn = jest.fn();
    render(<IButton text="lowercase" onClick={mockFn} />);
    const button = screen.getByRole("button");
    button.click();
    expect(mockFn).toBeCalled();
    expect(mockFn).toBeCalledTimes(1);
  });
});
