import { createSlice } from "@reduxjs/toolkit";
import { SUPPORTED_LOCALES } from "./constants";

const slice = createSlice({
  name: "languageProvider",
  initialState: {
    locale: null,
    initialising: false,
    initError: null,
    data: Object.values(SUPPORTED_LOCALES).reduce((data, locale) => {
      data[locale] = {
        loading: false,
        messages: null,
        error: null,
      };
      return data;
    }, {}),
  },
  reducers: {
    initLocale: (state) => {
      state.initialising = true;
    },
    initLocaleSuccess: (state, action) => {
      state.locale = action.payload;
      state.initialising = false;
      state.initError = null;
    },
    initLocaleError: (state, action) => {
      state.initialising = false;
      state.initError = action.payload;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    loadMessages: (state, action) => {
      const locale = action.payload;
      state.data[locale].loading = true;
    },
    loadMessagesSuccess: (state, action) => {
      const { locale, messages } = action.payload;
      state.data[locale].loading = false;
      state.data[locale].messages = messages;
      state.data[locale].error = null;
    },
    loadMessagesError: (state, action) => {
      const { locale, error } = action.payload;
      state.data[locale].loading = false;
      state.data[locale].error = error;
    },
  },
});

export const {
  initLocale,
  initLocaleSuccess,
  initLocaleError,
  setLocale,
  loadMessages,
  loadMessagesSuccess,
  loadMessagesError,
} = slice.actions;

export default slice;
