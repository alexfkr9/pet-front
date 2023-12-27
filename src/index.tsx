import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement === null) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
