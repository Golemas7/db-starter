import { put } from "redux-saga/effects";
import { loadPackageDetailsSaga } from "./sagas";
import { adaptNpmRegistryPackage } from "./adapter";
import { loadPackageDetailsError, loadPackageDetailsSuccess } from "./slice";

const fetchMock = require("fetch-mock-jest");

describe("sagas", () => {
  describe("loadPackageDetailsSaga", () => {
    test("It should call fetch method with / + payload", async () => {
      const mockResponse = { data: "test" };

      fetchMock.get("/test-endpoint", mockResponse);

      const saga = loadPackageDetailsSaga({ payload: "test-endpoint" });
      const response = await saga.next().value;

      expect(response).toEqual(await fetch("/test-endpoint"));

      fetchMock.restore();
    });

    test("It should take the json from response", async () => {
      const mockResponse = { data: "test" };

      fetchMock.get("/test-endpoint", mockResponse);

      const saga = loadPackageDetailsSaga({ payload: "test-endpoint" });
      const response = await saga.next().value;
      const data = await saga.next(response).value;

      expect(data).toEqual(mockResponse);

      fetchMock.restore();
    });

    test("It should call loadPackageDetailsSuccess with data from api", async () => {
      const mockResponse = { data: "test" };

      fetchMock.get("/test-endpoint", mockResponse);

      const saga = loadPackageDetailsSaga({ payload: "test-endpoint" });
      const response = await saga.next().value;
      const data = await saga.next(response).value;

      expect(saga.next(data).value).toEqual(
        put(loadPackageDetailsSuccess(adaptNpmRegistryPackage(data)))
      );

      fetchMock.restore();
    });

    test("It should call loadPackageDetailsError with statusText when status is not 200", async () => {
      fetchMock.get("/test-endpoint", 404);

      const saga = loadPackageDetailsSaga({ payload: "test-endpoint" });
      const response = await saga.next().value;
      const message = await saga.next(response).value;

      expect(message).toEqual(put(loadPackageDetailsError("Not Found")));

      fetchMock.restore();
    });
  });
});
