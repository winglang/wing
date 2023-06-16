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
      themeMode={query.get("theme") as any}
    />
  </React.StrictMode>,
);

document.querySelector("#loader")?.remove();
