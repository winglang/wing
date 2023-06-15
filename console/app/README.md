# Wing Console

The Wing Console is graphical user interface that can be used to interact with [Wing](https://www.winglang.io/) applications on the local machine.

This package provides a way to start a server that compiles and runs Wing applications, and a graphical user interface that can be used to interact with them.

## Installation

```sh
npm i @wingconsole/app
```

## Usage

```ts
import { createConsoleApp } from "@wingconsole/app";

const { port } = await createConsoleApp({
  wingfile: "path/to/wingfile.w",
});

console.log(`Wing Console is running on http://localhost:${port}.`);
```
