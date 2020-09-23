import { put, takeLatest } from "redux-saga/effects";
import {
  loadPackageDetails,
  loadPackageDetailsSuccess,
  loadPackageDetailsError,
} from "./slice";
import { adaptNpmRegistryPackage } from "./adapter";

export function* loadPackageDetailsSaga({ payload }) {
  try {
    const response = yield fetch(`/${payload}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    const data = yield response.json();
    yield put(loadPackageDetailsSuccess(adaptNpmRegistryPackage(data)));
  } catch ({ message }) {
    yield put(loadPackageDetailsError(message));
  }
}

export default function* counterSagas() {
  yield takeLatest(loadPackageDetails.type, loadPackageDetailsSaga);
}
