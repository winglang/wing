import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.js";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

document.querySelector("#loader")?.remove();
