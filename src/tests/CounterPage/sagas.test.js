import { put } from "redux-saga/effects";
import { incrementAsyncSaga } from "pages/CounterPage/sagas";
import {
  incrementAsyncSuccess,
  incrementAsyncError,
} from "pages/CounterPage/slice";

describe("sagas", () => {
  describe("incrementAsyncSaga", () => {
    test("to pass with 777", () => {
      const saga = incrementAsyncSaga({ payload: 777 });
      saga.next(); // delay
      expect(saga.next().value).toEqual(put(incrementAsyncSuccess(777)));
      expect(saga.next().done).toBe(true);
    });

    test("to fail with 0", () => {
      const saga = incrementAsyncSaga({ payload: 0 });
      saga.next(); // delay
      expect(saga.next().value).toEqual(
        put(incrementAsyncError("Asynchronously adding zero."))
      );
      expect(saga.next().done).toBe(true);
    });
  });
});
