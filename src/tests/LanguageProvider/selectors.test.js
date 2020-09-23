import {
  selectLocaleSlice,
  selectLocale,
  selectLocaleInitialising,
  selectDefaultData,
  selectDefaultMessages,
  selectActiveData,
  selectLocaleMessages,
  selectLocaleLoading,
  selectLocaleError,
} from "components/LanguageProvider/selectors";
import { DEFAULT_LOCALE } from "components/LanguageProvider/constants";

describe("selectors", () => {
  test("selectLocaleSlice to select locale slice", () => {
    expect(selectLocaleSlice({ languageProvider: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectLocale returns locale value", () => {
    expect(selectLocale.resultFunc({ locale: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectLocaleInitialising returns initialising value", () => {
    expect(
      selectLocaleInitialising.resultFunc({ initialising: "expectedValue" })
    ).toBe("expectedValue");
  });

  test("selectDefaultData returns default_locale from data value", () => {
    const result = {
      data: {},
    };

    result.data[DEFAULT_LOCALE] = "expectedValue";

    expect(selectDefaultData.resultFunc(result)).toBe("expectedValue");
  });

  test("selectDefaultMessages returns initialising value", () => {
    expect(
      selectDefaultMessages.resultFunc({ messages: "expectedValue" })
    ).toBe("expectedValue");
  });

  test("selectDefaultMessages returns undefined if no value is provided", () => {
    expect(selectDefaultMessages.resultFunc("")).toBe(undefined);
  });

  test("selectActiveData returns default_locale from data value", () => {
    const locale = "expectedLocale";
    const result = {
      data: {},
    };

    result.data[locale] = "expectedValue";

    expect(selectActiveData.resultFunc(result, locale)).toBe("expectedValue");
  });

  test("selectLocaleMessages returns initialising value", () => {
    expect(selectLocaleMessages.resultFunc({ messages: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectLocaleMessages returns undefined if no value is provided", () => {
    expect(selectLocaleMessages.resultFunc("")).toBe(undefined);
  });

  test("selectLocaleLoading returns initialising value", () => {
    expect(selectLocaleLoading.resultFunc({ loading: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectLocaleLoading returns undefined if no value is provided", () => {
    expect(selectLocaleLoading.resultFunc("")).toBe(undefined);
  });

  test("selectLocaleError returns initialising value", () => {
    expect(selectLocaleError.resultFunc({ error: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectLocaleError returns undefined if no value is provided", () => {
    expect(selectLocaleError.resultFunc("")).toBe(undefined);
  });
});
