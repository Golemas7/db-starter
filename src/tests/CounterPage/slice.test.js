import slice, {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
  incrementAsyncSuccess,
  incrementAsyncError,
} from "pages/CounterPage/slice";

describe("reducers", () => {
  test("initial state", () => {
    expect(slice.reducer(undefined, {})).toEqual({
      value: 0,
      error: null,
      pending: false,
    });
  });

  test("increment", () => {
    expect(slice.reducer({ value: -2 }, increment())).toEqual({ value: -1 });
  });

  test("decrement", () => {
    expect(slice.reducer({ value: -2 }, decrement())).toEqual({ value: -3 });
  });

  test("incrementByAmount", () => {
    expect(slice.reducer({ value: -2 }, incrementByAmount(10))).toEqual({
      value: 8,
    });
  });

  test("incrementAsync", () => {
    expect(slice.reducer({}, incrementAsync())).toEqual({
      pending: true,
    });
  });

  test("incrementAsyncSuccess", () => {
    expect(slice.reducer({ value: -2 }, incrementAsyncSuccess(10))).toEqual({
      error: null,
      pending: false,
      value: 8,
    });
  });

  test("incrementAsyncError", () => {
    expect(slice.reducer({}, incrementAsyncError("error message"))).toEqual({
      pending: false,
      error: "error message",
    });
  });
});
