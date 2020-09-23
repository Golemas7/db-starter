import {
  selectCounterSlice,
  selectCount,
  selectPending,
  selectError,
} from "pages/CounterPage/selectors";

describe("selectors", () => {
  test("selectCounterSlice to select counter slice", () => {
    expect(selectCounterSlice({ counter: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectCount returns count value", () => {
    expect(selectCount.resultFunc({ value: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectPending returns pending value", () => {
    expect(selectPending.resultFunc({ pending: "expectedValue" })).toBe(
      "expectedValue"
    );
  });

  test("selectError returns error value", () => {
    expect(selectError.resultFunc({ error: "expectedValue" })).toBe(
      "expectedValue"
    );
  });
});
