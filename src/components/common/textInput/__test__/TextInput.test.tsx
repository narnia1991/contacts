import { fireEvent, render, screen } from "@testing-library/react";
import IInput from "../TextInput";

describe("Testing TextInput Component", () => {
  test("should have the props", () => {
    render(<IInput name="test" value="value" label="label" />);
    const value = screen.getByDisplayValue("value");
    expect(value).toBeTruthy();
    const label = screen.getByLabelText("label");
    expect(label).toBeTruthy();
  });

  test("should call onChange function", () => {
    const mockFn = jest.fn();
    render(
      <IInput name="test" value="value" label="label" onChange={mockFn} />
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "23" } });
    expect(mockFn).toBeCalled();
    expect(mockFn).toBeCalledTimes(1);
  });

  test("should display error", () => {
    const { container, getByText } = render(
      <IInput name="test" value="value" label="label" error="Invalid Input" />
    );

    const error = getByText("Invalid Input");
    expect(error).toBeInTheDocument();
    const erroredInput = container.querySelector(".Mui-error");
    expect(erroredInput).toBeInTheDocument();
  });
});
