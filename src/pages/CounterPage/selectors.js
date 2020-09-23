import { createSelector } from "@reduxjs/toolkit";
import slice from "./slice";

export const selectCounterSlice = (state) => state[slice.name];

export const selectCount = createSelector(
  [selectCounterSlice],
  (counter) => counter.value
);

export const selectPending = createSelector(
  [selectCounterSlice],
  (counter) => counter.pending
);

export const selectError = createSelector(
  [selectCounterSlice],
  (counter) => counter.error
);
