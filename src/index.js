import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./AppContainer";
import App from "./App";
import store from "./store";
import "./index.scss";

const render = (AComponent) => {
  ReactDOM.render(
    <AppContainer store={store} TheApp={AComponent}></AppContainer>,
    document.getElementById("root")
  );
};

render(App);
