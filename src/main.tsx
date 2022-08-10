import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import './samples/node-api'
import "./assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
