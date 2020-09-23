import React from "react";
import { render } from "utils/test-utils";

import NotFoundPage from "./NotFoundPage";

describe("not found", () => {
  const { location } = window;

  beforeEach(() => {
    delete window.location;
    window.location = {
      pathname: "",
    };
  });

  test("It should show path", () => {
    window.location.pathname = "/wrong-path";
    const { getByTestId } = render(<NotFoundPage />);
    const notFoundPath = getByTestId("not-found-path-value");

    expect(notFoundPath).toHaveTextContent(window.location.pathname);
  });

  afterEach(() => {
    window.location = location;
  });
});
