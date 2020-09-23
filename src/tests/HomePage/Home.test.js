import React from "react";
import { render } from "utils/test-utils";

import Home from "pages/HomePage/Home";

test("renders learn react link", () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
