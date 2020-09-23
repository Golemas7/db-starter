import { combineReducers } from "@reduxjs/toolkit";
import localeSlice from "components/LanguageProvider/slice";
import counterSlice from "pages/CounterPage/slice";
import npmSlice from "pages/NpmRegistryPage/slice";

const reducer = combineReducers({
  [localeSlice.name]: localeSlice.reducer,
  [counterSlice.name]: counterSlice.reducer,
  [npmSlice.name]: npmSlice.reducer,
});

export default reducer;
