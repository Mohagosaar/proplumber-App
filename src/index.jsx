import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Provider } from "react-redux";

import store from "./redux/store";

import App from "./components/App/App";

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
