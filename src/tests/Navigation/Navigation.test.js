import React from "react";
import * as ReactRedux from "react-redux";
import { render, fireEvent } from "utils/test-utils";

import { setLocale } from "components/LanguageProvider/slice";
import Navigation from "components/Navigation/Navigation";
import ltMessages from "translations/lt.json";

describe("Navigation", () => {
  test("renders all the links in navigation in default locale", () => {
    const { getAllByRole } = render(<Navigation />);
    const links = getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0].getAttribute("title")).toBe("Home");
    expect(links[0].getAttribute("href")).toBe("/");
    expect(links[1]).toHaveTextContent("Counter (0)");
    expect(links[1].getAttribute("href")).toBe("/counter");
    expect(links[2]).toHaveTextContent("API demo");
    expect(links[2].getAttribute("href")).toBe("/npm-api");
  });

  test("renders all the links in navigation in LT locale", () => {
    const { getAllByRole } = render(<Navigation />, {
      locale: "lt",
      messages: ltMessages,
    });
    const links = getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0].getAttribute("title")).toBe("Pradžia");
    expect(links[0].getAttribute("href")).toBe("/");
    expect(links[1]).toHaveTextContent("Skaitiklis (0)");
    expect(links[1].getAttribute("href")).toBe("/counter");
    expect(links[2]).toHaveTextContent("API demo");
    expect(links[2].getAttribute("href")).toBe("/npm-api");
  });

  test("It should not dispatch setLocale", () => {
    const mockedDispatch = jest.fn();
    const spyUseDispatch = jest
      .spyOn(ReactRedux, "useDispatch")
      .mockReturnValue(mockedDispatch);

    render(<Navigation />);

    expect(mockedDispatch).not.toHaveBeenCalled();
    spyUseDispatch.mockRestore();
  });

  test("It should dispatch setLocale", () => {
    const mockedDispatch = jest.fn();
    const spyUseDispatch = jest
      .spyOn(ReactRedux, "useDispatch")
      .mockReturnValue(mockedDispatch);
    const { getByTestId } = render(<Navigation />);
    const localeSelect = getByTestId("locale-select");
    fireEvent.change(localeSelect, { target: { value: "lt" } });

    expect(mockedDispatch).toHaveBeenCalledWith(setLocale("lt"));
    spyUseDispatch.mockRestore();
  });
});
