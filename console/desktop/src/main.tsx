import * as Sentry from "@sentry/electron";
import { Console } from "@wingconsole/ui";
import React from "react";
import ReactDOM from "react-dom/client";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
  });
}

const query = new URLSearchParams(location.search);
const port = query.get("port");

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <Console
      trpcUrl={`http://localhost:${port}/trpc`}
      wsUrl={`ws://localhost:${port}`}
      title={String(query.get("title"))}
    />
  </React.StrictMode>,
);

document.querySelector("#loader")?.remove();
