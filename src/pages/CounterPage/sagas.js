import { put, takeLatest } from "redux-saga/effects";
import {
  incrementAsync,
  incrementAsyncError,
  incrementAsyncSuccess,
} from "./slice";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* incrementAsyncSaga({ payload }) {
  yield delay(1000);
  if (!payload) {
    yield put(incrementAsyncError("Asynchronously adding zero."));
  } else {
    yield put(incrementAsyncSuccess(payload));
  }
}

export default function* counterSagas() {
  yield takeLatest(incrementAsync.type, incrementAsyncSaga);
}
