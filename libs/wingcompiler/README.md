# Wing Compiler

The Wing Compiler is a node package that includes the `wingc` WASM file and provides a JavaScript API to compile Wing code.

## Installation

```sh
npm install @winglang/compiler
```

## Usage

```ts
import { compile, Target } from "@winglang/compiler";

const outputDir = await compile("index.w", {
  target: Target.SIM,
});
```
