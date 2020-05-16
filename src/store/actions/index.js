import { createAction } from "redux-act";

export const clearAStateProp = createAction("sample redux clear action");
export const setAStateProp = createAction("sample redux set action");

export const setGameHistory = createAction("Update board state");
export const clearGameHistory = createAction("Reset board state");
export const setTurnNumber = createAction("Update turn number");
export const clearTurnNumber = createAction("Reset turn count to 0");
export const setCurrentPlayer = createAction("Set current player");
export const clearCurrentPlayer = createAction(
  "Set current player back to default"
);
