import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "npmRegistry",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    loadPackageDetails: (state) => {
      state.data = null;
      state.loading = true;
    },
    loadPackageDetailsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    loadPackageDetailsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadPackageDetails,
  loadPackageDetailsSuccess,
  loadPackageDetailsError,
} = slice.actions;

export default slice;
