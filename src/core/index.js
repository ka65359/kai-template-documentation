// Inspired and modified based on post by Mattia Manzati
// https://medium.com/@MattiaManzati/how-to-reuse-redux-components-8acd5b4d376a

import R from "ramda";
import { combineReducers, applyMiddleware } from "redux";

export const FORWARD = "@redux-forward/FORWARD";

// unwrap recursively an action
export const unwrap = R.cond([
  [
    R.propEq("type", FORWARD),
    R.pipe(R.prop("payload"), (action) => unwrap(action))
  ],
  [R.T, R.identity]
]);

// given a name to forward to, returns the action for that name
export const actionFor = (name, action) =>
  R.cond([
    [R.isNil, R.identity],
    [
      R.propEq("type", FORWARD),
      R.cond([
        [R.pathEq(["meta", "name"], name), R.prop("payload")],
        [R.T, R.always(undefined)] // eslint-disable-line no-undefined
      ])
    ],
    [R.T, R.identity]
  ])(action);

// Creates a reducer that receives both global and instance actions (from a given source)
// The name provided MUST be the key into the state tree that this reducer is assigned.
export const createInstanceReducer = (name, reducer) => (state, action) =>
  reducer(state, actionFor(name, action));

// Creates a reducer that receives all actions (global and instance) regardless of instance identifiers;
export const createGlobalReducer = (reducer) => (state, action) =>
  reducer(state, unwrap(action));

export const CREATE_REDUCER_TYPE = "@redux-shards/CREATE_REDUCER";
export const DELETE_REDUCER_TYPE = "@redux-shards/DELETE_REDUCER";

export const createReducerAction = ({ key, reducer }) => ({
  type: CREATE_REDUCER_TYPE,
  payload: { key, reducer }
});

export const deleteReducerAction = ({ key }) => ({
  type: DELETE_REDUCER_TYPE,
  payload: { key }
});

const buildNewReducer = (store, reducers) => {
  const newAsyncReducer = combineReducers(store.asyncReducers);
  return (state, action) => {
    const asynckeys = R.keys(store.asyncReducers);
    const nextState = reducers(R.omit(asynckeys, state), action);
    const asyncState = newAsyncReducer(R.pick(asynckeys, state), action);
    return { ...nextState, ...asyncState };
  };
};

const removeReducerKey = (store, reducers, key) => {
  const newAsyncObject = R.omit([key], store.asyncReducers);
  const newAsyncReducer = combineReducers(newAsyncObject);

  if (R.isEmpty(newAsyncObject)) {
    return reducers;
  }
  return (state, action) => {
    const asynckeys = R.keys(store.asyncReducers);
    const nextState = reducers(R.omit(asynckeys, state), action);
    const newAsyncKeys = R.keys(newAsyncObject);
    const asyncState = newAsyncReducer(R.pick(newAsyncKeys, state), action);
    return { ...nextState, ...asyncState };
  };
};

export const customThunkMiddleware = ({ dispatch, getState }) => (next) => (
  action
) => {
  if (action.__redux_shards_thunk) {
    return action(
      action.__redux_shards_dispatch,
      R.pipe(getState, action.__redux_shards_selector),
      dispatch,
      getState
    );
  }
  return next(action);
};

export const createAsyncReducerEnhancer = () => (createStore) => (
  reducers,
  preloadedState
) => {
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(() => (next) => (action) => {
      if (action.type === CREATE_REDUCER_TYPE) {
        store.injectAsyncReducer(action.payload.key, action.payload.reducer);
      } else if (action.type === DELETE_REDUCER_TYPE) {
        store.removeAsyncReducer(action.payload.key);
      }
      next(action);
    })
  );

  store.injectAsyncReducer = (key, reducer) => {
    store.asyncReducers = {
      ...store.asyncReducers,
      [key]: reducer
    };
    const replacementReducer = buildNewReducer(store, reducers);
    store.replaceReducer(replacementReducer);
  };
  store.removeAsyncReducer = (key) => {
    store.replaceReducer(removeReducerKey(store, reducers, key));
    store.asyncReducers = R.omit([key], store.asyncReducers);
  };
  return store;
};
