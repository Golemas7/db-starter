import { put } from "redux-saga/effects";
import { cleanup } from "@testing-library/react";

import {
  initLocaleSaga,
  setLocaleSaga,
  loadMessagesSaga,
} from "components/LanguageProvider/sagas";
import {
  initLocaleSuccess,
  initLocaleError,
  loadMessagesSuccess,
  loadMessagesError,
} from "components/LanguageProvider/slice";
import {
  LOCAL_STORAGE_KEY,
  DEFAULT_LOCALE,
} from "components/LanguageProvider/constants";
import translationsLT from "translations/lt.json";

afterEach(cleanup);

describe("sagas", () => {
  describe("initLocaleSaga", () => {
    test("To set to en by default", () => {
      const saga = initLocaleSaga();

      window.localStorage.__proto__.getItem = jest.fn();

      expect(saga.next().value).toEqual(put(initLocaleSuccess(DEFAULT_LOCALE)));
      expect(saga.next().done).toBe(true);
    });

    test("To call localStorage.removeItem if there is an invalid locale in local storage", () => {
      const saga = initLocaleSaga();

      jest.spyOn(window.localStorage.__proto__, "removeItem");
      window.localStorage.__proto__.removeItem = jest.fn();
      window.localStorage.__proto__.getItem = jest.fn(() => "test");

      expect(saga.next().value).toEqual(put(initLocaleSuccess("test")));
      expect(localStorage.removeItem).toBeCalledWith(LOCAL_STORAGE_KEY);
      expect(saga.next().done).toBe(true);
    });

    test("To call initLocaleError when there is an error", () => {
      const saga = initLocaleSaga();

      window.localStorage.__proto__.getItem.mockImplementation(() => {
        throw new Error("Test error");
      });

      expect(saga.next().value).toEqual(put(initLocaleError("Test error")));
      expect(saga.next().done).toBe(true);
    });
  });

  describe("setLocaleSaga", () => {
    test("To call localStorage.setItem with local_storage_key and lt when lt locale is passed", async () => {
      jest.spyOn(window.localStorage.__proto__, "setItem");
      window.localStorage.__proto__.setItem = jest.fn();

      const saga = setLocaleSaga({ payload: "lt" });
      await saga.next().value;

      expect(localStorage.setItem).toBeCalledWith(LOCAL_STORAGE_KEY, "lt");
      expect(saga.next().done).toBe(true);
    });

    test("To call localStorage.setItem with local_storage_key and en when en locale is passed", async () => {
      jest.spyOn(window.localStorage.__proto__, "setItem");
      window.localStorage.__proto__.setItem = jest.fn();

      const saga = setLocaleSaga({ payload: "en" });
      await saga.next().value;

      expect(localStorage.setItem).toBeCalledWith(LOCAL_STORAGE_KEY, "en");
      expect(saga.next().done).toBe(true);
    });

    test("To log error message to console when an error occurs", async () => {
      global.console = {
        error: jest.fn(),
      };

      window.localStorage.__proto__.setItem.mockImplementation(() => {
        throw new Error("Test error");
      });

      const saga = setLocaleSaga({ payload: "en" });
      await saga.next().value;

      expect(global.console.error).toHaveBeenCalledWith(
        new Error("Test error")
      );
      expect(saga.next().done).toBe(true);
    });
  });

  describe("loadMessagesSaga", () => {
    test("To call loadMessageSuccess with passed locale and messages", async () => {
      const saga = loadMessagesSaga({ payload: "lt" });
      const messages = { ...translationsLT, default: translationsLT };

      const valueMessage = await saga.next().value;
      const valueSuccess = await saga.next(messages).value;

      await expect(valueMessage).toEqual(messages);
      await expect(valueSuccess).toEqual(
        put(loadMessagesSuccess({ locale: "lt", messages: messages.default }))
      );
      expect(saga.next().done).toBe(true);
    });

    test("To fail when messages are not found", async () => {
      const saga = loadMessagesSaga({ payload: "lt" });

      await saga.next().value; // skip the messages

      const valueSuccess = await saga.next().value;

      await expect(valueSuccess).toEqual(
        put(
          loadMessagesError({
            locale: "lt",
            error: "Cannot read property 'default' of undefined",
          })
        )
      );
      expect(saga.next().done).toBe(true);
    });
  });
});
