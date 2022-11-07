import React from "react";
import ReactDOM from "react-dom/client";

import { WingSimulatorSchema } from "../electron/main/wingsdk.js";

import { App } from "./App.js";

const getSchemaFromQueryString = () => {
  const query = new URLSearchParams(location.search);
  const base64Schema = query.get("schema");
  if (!base64Schema) {
    return;
  }

  try {
    const jsonSchema = atob(base64Schema);
    return JSON.parse(jsonSchema) as WingSimulatorSchema;
  } catch (error) {
    console.error("failed to read schema from url", error);
  }
};

const schema = getSchemaFromQueryString();

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <App querySchema={schema} />
  </React.StrictMode>,
);

document.querySelector("#loader")?.remove();
