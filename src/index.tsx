import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import * as serviceWorker from "./serviceWorker";
import { App } from "app/App";
import { Provider } from "react-redux";
import { store } from "app/store";
import { HashRouter } from "react-router-dom";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
