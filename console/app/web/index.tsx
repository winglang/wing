import { Console } from "@wingconsole/ui";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <Console trpcUrl="/trpc" wsUrl={`ws://${location.host}`} layout={2} />
  </React.StrictMode>,
);

document.querySelector("#loader")?.remove();
