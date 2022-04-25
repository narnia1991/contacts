import {
  act,
  fireEvent,
  queryByTestId,
  render,
  screen,
} from "@testing-library/react";
import ContactForm from "../ContactForm";

describe("Testing Contact Form", () => {
  test("should render the fields", () => {
    render(<ContactForm />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(3);
  });

  test("should display if the field has errors", async () => {
    const { container, getByText } = render(<ContactForm />);

    await act(async () => {
      fireEvent.submit(container.querySelector("form") as HTMLFormElement);
    });

    const erroredFirstName = getByText("Please input first name");
    expect(erroredFirstName).toBeTruthy();

    const erroredContact = getByText("Please input contact number");
    expect(erroredContact).toBeTruthy();
  });
});
