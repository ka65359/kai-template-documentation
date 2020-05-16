import { createReducer } from "redux-act";
import { clearAStateProp, setAStateProp } from "store/actions";

export const initialState = {
  aStateProp: ""
};

export default createReducer(
  {
    [clearAStateProp]: (state) => {
      let rslt = Object.assign({}, state, {
        aStateProp: initialState.aStateProp
      });
      return rslt;
    },
    [setAStateProp]: (state, payload) => {
      if (!payload) {
        console.error("New value is empty, reverting to intial");
        payload = initialState.aStateProp;
      }
      let rslt = Object.assign({}, state, {
        aStateProp: payload
      });
      return rslt;
    }
  },
  initialState
);
