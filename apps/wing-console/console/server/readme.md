# @wingconsole/server

> ⚠️ This package is meant to be used internally by the Wing Console.

Creates a server that watches and compiles a wingfile, and provides a [tRPC](https://trpc.io/) API to interact with the application.

## Installation

```sh
npm i @wingconsole/server
```

## Usage

```ts
import { createConsoleServer } from "@wingconsole/server";

const server = await createConsoleServer({
  wingfile: "path/to/wingfile.w",
});

console.log(`Server is running on http://localhost:${server.port}.`);
```

## License

This code is distributed under the [Monada Console License](./LICENSE.md).
