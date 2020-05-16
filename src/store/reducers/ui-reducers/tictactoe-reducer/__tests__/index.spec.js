import tictactoeReducer, { initialState } from "../index.js";
import {
  /*clearGameHistory,
  setGameHistory,
  ClearTurnNumber,
  setTurnNumber,*/
  clearCurrentPlayer,
  setCurrentPlayer
} from "store/actions";
import features from "utils/features";

describe("TicTacToe reducer tests", function() {
  let currentState;
  let store;
  let undefinedVal;

  beforeEach(function() {
    jest.spyOn(features, "isEnabled").mockReturnValue(true);
    currentState = tictactoeReducer(undefinedVal, {});
    store = {
      getState: jest.fn(() => currentState),
      dispatch: jest.fn(
        (action) => (currentState = tictactoeReducer(currentState, action))
      )
    };
  });

  afterEach(function() {
    currentState = null;
    store = null;
  });

  describe("setCurrentPlayer()", function() {
    let payload;

    afterEach(function() {
      payload = null;
      store.dispatch(clearCurrentPlayer());
    });

    test("it handles no params", () => {
      store.dispatch(setCurrentPlayer());
      expect(store.getState()).toHaveProperty(
        "currentPlayer",
        initialState.currentPlayer
      );
    });

    test("it can be set", () => {
      payload = "foo";
      store.dispatch(setCurrentPlayer(payload));
      expect(store.getState()).toHaveProperty("currentPlayer", payload);
    });
  });

  describe("clearCurrentPlayer()", function() {
    let payload;

    afterEach(function() {
      payload = null;
      store.dispatch(clearCurrentPlayer());
    });

    test("it clears with no previous value", () => {
      store.dispatch(setCurrentPlayer());
      store.dispatch(clearCurrentPlayer());
      expect(store.getState()).toHaveProperty(
        "currentPlayer",
        initialState.currentPlayer
      );
    });

    test("it clears with a previous value", () => {
      payload = "foo";
      store.dispatch(setCurrentPlayer(payload));
      store.dispatch(clearCurrentPlayer());
      expect(store.getState()).toHaveProperty(
        "currentPlayer",
        initialState.currentPlayer
      );
    });
  });
});
