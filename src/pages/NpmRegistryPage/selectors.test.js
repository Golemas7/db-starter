import {
  selectSlice,
  selectData,
  selectLoading,
  selectError,
} from "./selectors";

describe("npm registry selectors", () => {
  test("selectSlice should select slice", () => {
    expect(selectSlice({ npmRegistry: "expectedValue" })).toBe("expectedValue");
  });

  test("selectData should return data value", () => {
    expect(selectData.resultFunc({ data: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectLoading should return loading value", () => {
    expect(selectLoading.resultFunc({ loading: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectError should return error value", () => {
    expect(selectError.resultFunc({ error: "expectedValue" })).toBe(
      "expectedValue"
    );
  });
});
