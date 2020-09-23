import React from "react";
import { renderWithState } from "utils/test-utils";
import * as ReactRedux from "react-redux";

import { initLocale, loadMessages } from "components/LanguageProvider/slice";
import LanguageProvider from "components/LanguageProvider/LanguageProvider";
import enMessages from "translations/en.json";

const validInitialState = {
  languageProvider: {
    locale: "en",
    initialising: false,
    initError: null,
    data: {
      en: {
        loading: false,
        messages: enMessages,
        error: null,
      },
    },
  },
};

describe("provider", () => {
  test("It should render LoadingPage if locale hasn't been initialized", () => {
    const { baseElement } = renderWithState(<LanguageProvider />);
    expect(baseElement).toHaveTextContent("⏳");
  });

  test("It should render TestContent when locale and messages are set", () => {
    const { baseElement } = renderWithState(
      <LanguageProvider>TestContent</LanguageProvider>,
      {
        initialState: validInitialState,
      }
    );

    expect(baseElement).toHaveTextContent("TestContent");
  });

  test("It should dispatch initLocale when no locale or messages are set", () => {
    const mockedFunction = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, "useDispatch")
      .mockReturnValue(mockedFunction);

    renderWithState(<LanguageProvider />);

    expect(mockedFunction).toHaveBeenCalledWith(initLocale());

    spyOnUseDispatch.mockRestore();
  });

  test("It should dispatch loadMessages when no messages are set", () => {
    const mockedFunction = jest.fn();
    const spyOnUseDispatch = jest
      .spyOn(ReactRedux, "useDispatch")
      .mockReturnValue(mockedFunction);

    const initialStateNoMessages = { ...validInitialState };
    initialStateNoMessages.languageProvider = {
      ...initialStateNoMessages.languageProvider,
      data: {
        en: {
          loading: false,
          messages: null,
          error: null,
        },
      },
    };

    renderWithState(<LanguageProvider />, {
      initialState: initialStateNoMessages,
    });

    expect(mockedFunction).toHaveBeenCalledWith(loadMessages("en"));

    spyOnUseDispatch.mockRestore();
  });

  test("It should set lang to locale", () => {
    window.document.documentElement.lang = "lt";

    const initialStateNoMessages = { ...validInitialState };
    initialStateNoMessages.languageProvider = {
      ...initialStateNoMessages.languageProvider,
      data: {
        en: {
          loading: false,
          messages: null,
          error: null,
        },
      },
    };

    renderWithState(<LanguageProvider />, {
      initialState: initialStateNoMessages,
    });

    expect(window.document.documentElement.lang).toEqual("en");
  });
});
