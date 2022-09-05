import { ipcRenderer } from "electron";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./assets/styles/index.css";

void ipcRenderer.invoke("getLocalServerPort").then((localServerPort) => {
  ReactDOM.createRoot(document.querySelector("#root")!).render(
    <React.StrictMode>
      <App localServerPort={localServerPort} />
    </React.StrictMode>,
  );

  postMessage({ payload: "removeLoading" }, "*");
});
