import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import sagas from "./sagas";

function getStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    preloadedState: preloadedState,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
    reducer: rootReducer,
  });
  sagaMiddleware.run(sagas);
  return store;
}

export { getStore };
