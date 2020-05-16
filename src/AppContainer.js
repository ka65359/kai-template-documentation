import React from "react";
import { Provider } from "react-redux";

const View = ({ store, TheApp }) => (
  <Provider store={store}>
    <TheApp />
  </Provider>
);

export default View;
