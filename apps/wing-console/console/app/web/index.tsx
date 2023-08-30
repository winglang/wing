import { Console } from "@wingconsole/ui";
import React from "react";
import ReactDOM from "react-dom/client";

const query = new URLSearchParams(location.search);

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <Console
      trpcUrl="/trpc"
      wsUrl={`${location.protocol === "http:" ? "ws://" : "wss://"}${
        location.host
      }/trpc`}
      layout={Number(query.get("layout")) || 1} // default to 1 = vscode (2 = playground, 3 = tutorial)
      theme={query.get("theme") as any}
      color={query.get("color") as any}
      onTrace={(trace) => {
        // Playground and Learn need to be able to listen to all traces.
        window.parent.postMessage({ trace }, "*");
      }}
    />
  </React.StrictMode>,
);

document.querySelector("#loader")?.remove();
