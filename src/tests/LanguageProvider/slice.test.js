import slice, {
  initLocale,
  initLocaleSuccess,
  initLocaleError,
  setLocale,
  loadMessages,
  loadMessagesSuccess,
  loadMessagesError,
} from "components/LanguageProvider/slice";
import { SUPPORTED_LOCALES } from "components/LanguageProvider/constants";

describe("reducers", () => {
  test("initial state", () => {
    expect(slice.reducer(undefined, {})).toEqual({
      locale: null,
      initialising: false,
      initError: null,
      data: Object.values(SUPPORTED_LOCALES).reduce((data, locale) => {
        data[locale] = {
          loading: false,
          messages: null,
          error: null,
        };
        return data;
      }, {}),
    });
  });

  test("initLocale", () => {
    expect(slice.reducer({}, initLocale())).toEqual({
      initialising: true,
    });
  });

  test("initLocaleSuccess", () => {
    expect(slice.reducer({}, initLocaleSuccess("lt"))).toEqual({
      locale: "lt",
      initialising: false,
      initError: null,
    });
  });

  test("initLocaleError", () => {
    expect(slice.reducer({}, initLocaleError("Locale not found"))).toEqual({
      initialising: false,
      initError: "Locale not found",
    });
  });

  test("setLocale", () => {
    expect(slice.reducer({}, setLocale("it"))).toEqual({
      locale: "it",
    });
  });

  test("loadMessages", () => {
    expect(slice.reducer({ data: { en: {} } }, loadMessages("en"))).toEqual({
      data: {
        en: {
          loading: true,
        },
      },
    });
  });

  test("loadMessagesSuccess", () => {
    expect(
      slice.reducer(
        { data: { en: {} } },
        loadMessagesSuccess({ locale: "en", messages: "Test messages" })
      )
    ).toEqual({
      data: {
        en: {
          loading: false,
          messages: "Test messages",
          error: null,
        },
      },
    });
  });

  test("loadMessagesError", () => {
    expect(
      slice.reducer(
        { data: { en: {} } },
        loadMessagesError({ locale: "en", error: "Test error" })
      )
    ).toEqual({
      data: {
        en: {
          loading: false,
          error: "Test error",
        },
      },
    });
  });
});
