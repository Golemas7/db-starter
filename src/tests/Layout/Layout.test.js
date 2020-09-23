import React from "react";
import { render } from "utils/test-utils";

import Layout from "components/Layout/Layout";

test("renders child component", () => {
  const { getByText, getByRole } = render(<Layout>layout content</Layout>);
  const children = getByText(/layout content/i);
  const nav = getByRole("navigation");
  expect(children).toBeInTheDocument();
  expect(nav).toBeInTheDocument();
});
