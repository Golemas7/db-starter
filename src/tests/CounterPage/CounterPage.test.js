import React from "react";
import { render, fireEvent, waitFor } from "utils/test-utils";

import CounterPage from "pages/CounterPage/CounterPage";

describe("counter", () => {
  test("It should show 0 as initial value", () => {
    const { getByTestId } = render(<CounterPage />);
    const counterValue = getByTestId("counter-value");
    expect(counterValue).toHaveTextContent("0");
  });

  test("It should increase value by 1 after clicking '+'", () => {
    const { getByTestId, getByText } = render(<CounterPage />);
    const counterValue = getByTestId("counter-value");
    const incrementButton = getByText("+");
    expect(counterValue).toHaveTextContent("0");
    fireEvent.click(incrementButton);
    expect(counterValue).toHaveTextContent("1");
    fireEvent.click(incrementButton);
    expect(counterValue).toHaveTextContent("2");
  });

  test("It should decrease value by 1 after clicking '-'", () => {
    const { getByTestId, getByText } = render(<CounterPage />);
    const counterValue = getByTestId("counter-value");
    const decrementButton = getByText("-");
    expect(counterValue).toHaveTextContent("0");
    fireEvent.click(decrementButton);
    expect(counterValue).toHaveTextContent("-1");
    fireEvent.click(decrementButton);
    expect(counterValue).toHaveTextContent("-2");
  });

  test("It should increase by custom value using when the input and add amount button", () => {
    const { getByTestId, getByText, getByDisplayValue } = render(
      <CounterPage />
    );
    const counterValue = getByTestId("counter-value");
    const incrementAmountButton = getByText("Add Amount");
    const input = getByDisplayValue("2");
    expect(counterValue).toHaveTextContent("0");
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(incrementAmountButton);
    expect(counterValue).toHaveTextContent("10");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(incrementAmountButton);
    expect(counterValue).toHaveTextContent("10");
  });

  test("It should increase by custom value asynchronously", async () => {
    const { getByTestId, getByText, getByDisplayValue } = render(
      <CounterPage />
    );
    const counterValue = getByTestId("counter-value");
    const incrementAsyncButton = getByText("Add Async");
    const input = getByDisplayValue("2");
    expect(counterValue).toHaveTextContent("0");
    fireEvent.change(input, { target: { value: "-5" } });
    fireEvent.click(incrementAsyncButton);
    await waitFor(() => expect(counterValue).toHaveTextContent("-5"));
  });

  test("It should show error when adding 0 asynchronously", async () => {
    const { getByTestId, getByText, getByDisplayValue } = render(
      <CounterPage />
    );
    const counterValue = getByTestId("counter-value");
    const incrementAsyncButton = getByText("Add Async");
    const input = getByDisplayValue("2");
    expect(counterValue).toHaveTextContent("0");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(incrementAsyncButton);
    await waitFor(() =>
      expect(getByText('Error: "Asynchronously adding zero."')).toBeDefined()
    );
  });
});
