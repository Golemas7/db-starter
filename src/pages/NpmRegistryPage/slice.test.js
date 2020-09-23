import slice, {
  loadPackageDetails,
  loadPackageDetailsSuccess,
  loadPackageDetailsError,
} from "./slice";

describe("npm registry reducers", () => {
  test("initial state", () => {
    expect(slice.reducer(undefined, {})).toEqual({
      data: null,
      loading: false,
      error: null,
    });
  });

  test("loadPackageDetails", () => {
    expect(slice.reducer({}, loadPackageDetails())).toEqual({
      data: null,
      loading: true,
    });
  });

  test("loadPackageDetailsSuccess", () => {
    expect(slice.reducer({}, loadPackageDetailsSuccess("redux"))).toEqual({
      loading: false,
      data: "redux",
      error: null,
    });
  });

  test("loadPackageDetailsError", () => {
    expect(slice.reducer({}, loadPackageDetailsError("Not Found"))).toEqual({
      loading: false,
      error: "Not Found",
    });
  });
});
