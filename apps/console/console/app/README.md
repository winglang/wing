# Wing Console

> ⚠️ This package is meant to be used internally by the Wing Console.

Creates a server that watches and compiles a wingfile, and provides a web interface to interact with the application.

## Installation

```sh
npm i @wingconsole/app
```

## Usage

```ts
import { createConsoleApp } from "@wingconsole/app";

const server = await createConsoleApp({
  wingfile: "path/to/wingfile.w",
});

console.log(`Server is running on http://localhost:${server.port}.`);
```
