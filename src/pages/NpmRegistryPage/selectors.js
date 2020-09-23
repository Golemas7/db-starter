import { createSelector } from "@reduxjs/toolkit";
import slice from "./slice";

export const selectSlice = (state) => state[slice.name];

export const selectData = createSelector([selectSlice], (slice) => slice.data);

export const selectLoading = createSelector(
  [selectSlice],
  (slice) => slice.loading
);

export const selectError = createSelector(
  [selectSlice],
  (slice) => slice.error
);
