import React from "react";
import ReactDOM from "react-dom/client";

import { WingSimulatorSchema } from "../electron/main/wingsdk.js";

import { App } from "./App.js";
import { AppContext } from "./AppContext.js";
import { DemoBase64WingSchema } from "./stories/mockData.js";

const appMode = window.electronTRPC ? "electron" : "webapp";

console.log(`loading wing console in ${appMode} mode`);

const getSchemaFromQueryString = () => {
  if (appMode === "electron") {
    return;
  }
  const query = new URLSearchParams(location.search);
  const base64Schema = query.get("schema");
  try {
    const jsonSchema = atob(base64Schema ?? DemoBase64WingSchema);
    return JSON.parse(jsonSchema) as WingSimulatorSchema;
  } catch (error) {
    console.error("failed to read schema from url", error);
  }
};

const schema = getSchemaFromQueryString();

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <AppContext.Provider value={{ appMode }}>
      <App querySchema={schema} />
    </AppContext.Provider>
  </React.StrictMode>,
);

document.querySelector("#loader")?.remove();
