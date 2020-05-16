import { createReducer } from "redux-act";
import {
  clearGameHistory,
  setGameHistory,
  clearTurnNumber,
  setTurnNumber,
  clearCurrentPlayer,
  setCurrentPlayer
} from "store/actions";
import * as constants from "../../../../constants/tictactoe";

export const initialState = {
  currentPlayer: constants.PLAYER_1,
  history: [
    {
      squares: Array(9).fill(null),
      player: constants.PLAYER_1
    }
  ],
  turnNumber: 0
};

export default createReducer(
  {
    [clearCurrentPlayer]: (state) => {
      let rslt = Object.assign({}, state, {
        currentPlayer: initialState.currentPlayer
      });
      return rslt;
    },
    [setCurrentPlayer]: (state, payload) => {
      if (!payload) {
        console.error("No empty player names");
        return state;
      }
      let rslt = Object.assign({}, state, {
        currentPlayer: payload
      });
      return rslt;
    },
    [clearGameHistory]: (state) => {
      let rslt = Object.assign({}, state, {
        history: initialState.history
      });
      return rslt;
    },
    [setGameHistory]: (state, payload) => {
      if (!payload) {
        console.error(
          "New board state is empty, use clearGameHistory() to clear board state"
        );
        return state;
      }
      let rslt = Object.assign({}, state, {
        history: payload
      });
      return rslt;
    },
    [clearTurnNumber]: (state) => {
      let rslt = Object.assign({}, state, {
        turnNumber: initialState.turnNumber
      });
      return rslt;
    },
    [setTurnNumber]: (state, payload) => {
      if (!payload) {
        console.error(
          "Empty turn number, use clearTurnNumber() to reset turn count"
        );
      }
      let rslt = Object.assign({}, state, {
        turnNumber: payload
      });
      return rslt;
    }
  },
  initialState
);
