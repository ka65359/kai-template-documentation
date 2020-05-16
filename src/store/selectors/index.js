import { createSelector } from "reselect";

const getAStateProp = (state) => state.ui.aStateProp;

export const getUpperCaseAStateProp = createSelector(
  [getAStateProp],
  (aStateVal) => {
    return aStateVal.toUpperCase();
  }
);
