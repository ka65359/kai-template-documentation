import sampleReducer from "../index.js";
import { clearAStateProp, setAStateProp } from "store/actions";
import features from "utils/features";

describe("sample reducer tests", function() {
  let currentState;
  let store;
  let undefinedVal;

  beforeEach(function() {
    jest.spyOn(features, "isEnabled").mockReturnValue(true);
    currentState = sampleReducer(undefinedVal, {});
    store = {
      getState: jest.fn(() => currentState),
      dispatch: jest.fn(
        (action) => (currentState = sampleReducer(currentState, action))
      )
    };
  });

  afterEach(function() {
    currentState = null;
    store = null;
  });

  describe("setAStateProp()", function() {
    let payload;

    afterEach(function() {
      payload = null;
      store.dispatch(clearAStateProp());
    });

    test("it handles no params", () => {
      store.dispatch(setAStateProp());
      expect(store.getState()).toHaveProperty("aStateProp", "");
    });

    test("it can be set", () => {
      payload = "foo";
      store.dispatch(setAStateProp(payload));
      expect(store.getState()).toHaveProperty("aStateProp", payload);
    });
  });

  describe("clearAStateProp()", function() {
    let payload;

    afterEach(function() {
      payload = null;
      store.dispatch(clearAStateProp());
    });

    test("it clears with no previous value", () => {
      store.dispatch(setAStateProp());
      store.dispatch(clearAStateProp());
      expect(store.getState()).toHaveProperty("aStateProp", "");
    });

    test("it clears with a previous value", () => {
      payload = "foo";
      store.dispatch(setAStateProp(payload));
      store.dispatch(clearAStateProp());
      expect(store.getState()).toHaveProperty("aStateProp", "");
    });
  });
});
