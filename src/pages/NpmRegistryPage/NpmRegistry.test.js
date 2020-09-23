import React from "react";
import * as ReactIntl from "react-intl";
import * as ReactRedux from "react-redux";
import { render, renderWithState, fireEvent } from "utils/test-utils";
import { loadPackageDetails } from "./slice";
import * as routesData from "react-router-dom";

import NpmRegistry from "./NpmRegistry";
import { DEFAULT_LOCALE } from "components/LanguageProvider/constants";
import enMessages from "translations/en.json";
import messages from "./messages";

const IntlProvider = ReactIntl.IntlProvider;
const initialState = {
  npmRegistry: {
    data: null,
    loading: false,
    error: null,
  },
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: jest.fn(),
  useHistory: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(routesData, "useParams").mockReturnValue({ package: "" });
});

afterEach(() => {
  jest
    .spyOn(routesData, "useParams")
    .mockReturnValue({ package: "" })
    .mockRestore();
});

describe("npm registry functionality", () => {
  test("Search field should be empty initially", () => {
    const { getByTestId } = render(<NpmRegistry />);
    const searchField = getByTestId("search-field");

    expect(searchField.value).toBe("");
  });

  test("It should change search value", () => {
    const { getByTestId } = render(<NpmRegistry />);
    const searchField = getByTestId("search-field");

    fireEvent.change(searchField, { target: { value: "redux" } });

    expect(searchField.value).toBe("redux");
  });

  test("It should not fire search", () => {
    const mockedHistory = {
      push: jest.fn(),
    };
    const spyOnUseHistory = jest
      .spyOn(routesData, "useHistory")
      .mockReturnValue(mockedHistory);
    const { getByTestId } = render(<NpmRegistry />);
    const searchButton = getByTestId("search-button");

    fireEvent.click(searchButton);

    expect(mockedHistory.push).not.toHaveBeenCalled();
    spyOnUseHistory.mockRestore();
  });

  test("It should fire search", () => {
    const mockedHistory = {
      push: jest.fn(),
    };
    const spyOnUseHistory = jest
      .spyOn(routesData, "useHistory")
      .mockReturnValue(mockedHistory);
    const { getByTestId } = render(<NpmRegistry />);
    const searchField = getByTestId("search-field");
    const searchButton = getByTestId("search-button");

    fireEvent.change(searchField, { target: { value: "redux" } });
    fireEvent.click(searchButton);

    expect(mockedHistory.push).toHaveBeenCalled();
    spyOnUseHistory.mockRestore();
  });

  test("It should change search value", () => {
    const { getByTestId } = render(<NpmRegistry />);
    const searchField = getByTestId("search-field");

    fireEvent.change(searchField, { target: { value: "redux" } });

    expect(searchField.value).toBe("redux");
  });

  test("It should show loading message", () => {
    const mockedIntl = {
      formatMessage: jest.fn(),
      formatDate: jest.fn(),
    };
    const spyOnUseIntl = jest
      .spyOn(ReactIntl, "useIntl")
      .mockReturnValue(mockedIntl);

    const loadingState = { ...initialState };
    loadingState.npmRegistry = {
      ...initialState.npmRegistry,
      loading: true,
    };

    renderWithState(
      <IntlProvider
        locale={DEFAULT_LOCALE}
        defaultLocale={DEFAULT_LOCALE}
        messages={enMessages}
        wrapRichTextChunksInFragment
      >
        <NpmRegistry />
      </IntlProvider>,
      {
        initialState: loadingState,
      }
    );

    expect(mockedIntl.formatMessage).toHaveBeenCalledWith(messages.loading);
    spyOnUseIntl.mockRestore();
  });

  test("It should show error message", () => {
    const mockedIntl = {
      formatMessage: jest.fn(),
      formatDate: jest.fn(),
    };
    const spyOnUseIntl = jest
      .spyOn(ReactIntl, "useIntl")
      .mockReturnValue(mockedIntl);

    const errorState = { ...initialState };
    errorState.npmRegistry = {
      ...initialState.npmRegistry,
      error: "Error",
    };

    renderWithState(
      <IntlProvider
        locale={DEFAULT_LOCALE}
        defaultLocale={DEFAULT_LOCALE}
        messages={enMessages}
        wrapRichTextChunksInFragment
      >
        <NpmRegistry />
      </IntlProvider>,
      {
        initialState: errorState,
      }
    );

    expect(mockedIntl.formatMessage).toHaveBeenCalledWith(messages.error, {
      error: "Error",
    });
    spyOnUseIntl.mockRestore();
  });

  test("It should get package data", () => {
    const successState = { ...initialState };
    successState.npmRegistry = {
      ...initialState.npmRegistry,
      data: {
        name: "testPackage",
      },
    };

    const { getByTestId } = renderWithState(
      <IntlProvider
        locale={DEFAULT_LOCALE}
        defaultLocale={DEFAULT_LOCALE}
        messages={enMessages}
        wrapRichTextChunksInFragment
      >
        <NpmRegistry />
      </IntlProvider>,
      {
        initialState: successState,
      }
    );

    const packageName = getByTestId("package-name");
    expect(packageName).toHaveTextContent("testPackage");
  });
});

describe("npm registry dispatch", () => {
  test("It should not dispatch loadPackageDetails", () => {
    const mockedFunction = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, "useDispatch")
      .mockReturnValue(mockedFunction);

    render(<NpmRegistry />);

    expect(mockedFunction).not.toHaveBeenCalled();
    spyOnUseDispatch.mockRestore();
  });

  test("It should dispatch loadPackageDetails", () => {
    const useParamsMock = jest
      .spyOn(routesData, "useParams")
      .mockReturnValue({ package: "test package" });

    const mockedFunction = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, "useDispatch")
      .mockReturnValue(mockedFunction);

    render(<NpmRegistry />);

    expect(mockedFunction).toHaveBeenCalledWith(
      loadPackageDetails("test package")
    );
    spyOnUseDispatch.mockRestore();
    useParamsMock.mockRestore();
  });
});
