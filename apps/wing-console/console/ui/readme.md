# @wingconsole/ui

> ⚠️ This package is meant to be used internally by the Wing Console.

## Usage

The Console react component:

```tsx
import { Console } from "@wingconsole/ui";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <Console trpcUrl="/trpc" wsUrl={`ws://${location.host}`} />
  </React.StrictMode>,
);
```

The Tailwindcss config:

```js
const ui = require("@wingconsole/ui/tailwind-plugin.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [...ui.content, "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [...ui.plugins],
  theme: { ...ui.theme },
};
```

## License

This code is distributed under the [Wing Cloud Console License](./LICENSE.md).
