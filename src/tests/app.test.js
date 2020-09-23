import App from "App";
import React from "react";
import { render } from "utils/test-utils";

describe("app", () => {
  test("It should render LoadingPage first", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toHaveTextContent("⏳");
  });
});
