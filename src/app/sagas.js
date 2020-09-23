import { all } from "redux-saga/effects";
import counterSagas from "pages/CounterPage/sagas";
import languageProviderSagas from "components/LanguageProvider/sagas";
import npmRegistryProviderSagas from "pages/NpmRegistryPage/sagas";

export default function* rootSaga() {
  yield all([
    languageProviderSagas(),
    counterSagas(),
    npmRegistryProviderSagas(),
  ]);
}
