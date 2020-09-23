import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "scss/index.scss";
import { getStore } from "./app/store";
import * as serviceWorker from "./serviceWorker";

const store = getStore();

const render = () => {
  const App = require("./App").default;
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render();

moduleHotAccept(module);

export function moduleHotAccept(mod) {
  if (process.env.NODE_ENV === "development" && mod.hot) {
    mod.hot.accept("./App", render);
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
