import { Console } from "@wingconsole/ui";
import React from "react";
import ReactDOM from "react-dom/client";

const query = new URLSearchParams(location.search);

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <Console
      trpcUrl="/trpc"
      wsUrl={`ws://${location.host}`}
      layout={Number(query.get("layout"))}
      theme={query.get("theme") as any}
      onTrace={(trace) => {
        // Playground and Learn need to be able to listen to all traces.
        window.parent.postMessage({ trace }, "*");
      }}
    />
  </React.StrictMode>,
);

document.querySelector("#loader")?.remove();
