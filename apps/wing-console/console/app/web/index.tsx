import { Console } from "@wingconsole/ui";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "@ibm/plex/IBM-Plex-Sans/fonts/split/woff2/IBMPlexSans-Regular.css";
import "@ibm/plex/IBM-Plex-Sans/fonts/split/woff2/IBMPlexSans-Medium.css";
import "@ibm/plex/IBM-Plex-Sans/fonts/split/woff2/IBMPlexSans-Italic.css";
import "@ibm/plex/IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Regular.css";
import "@ibm/plex/IBM-Plex-Mono/fonts/split/woff2/IBMPlexMono-Medium.css";

const query = new URLSearchParams(location.search);

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <Console
      trpcUrl="/trpc"
      wsUrl={`ws://${location.host}`}
      layout={Number(query.get("layout")) || 1} // default to 1 = vscode (2 = playground, 3 = tutorial)
      theme={query.get("theme") as any}
      onTrace={(trace) => {
        // Playground and Learn need to be able to listen to all traces.
        window.parent.postMessage({ trace }, "*");
      }}
    />
  </React.StrictMode>,
);

document.querySelector("#loader")?.remove();
