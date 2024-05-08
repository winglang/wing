---
title: TypeScript For Wing
id: typescript
---

Wing's CLI has experimental support for TypeScript.

We see Winglang as the ideal language to create Wing apps, but using TypeScript allows you to use many powerful features of Wing without fully diving into a new language.

## Getting Started

Follow the [installation guide](../01-start-here/02-installation.md) to install Wing and get started with a new project. Make sure to create a new project with the `--language ts` flag in that guide.

```sh
wing new empty --language ts
```

## Exploring the entry point

Wing apps start with an entry point file, commonly named `main.ts`. This file can be anywhere, the important part is that it calls `main` from `@wingcloud/framework`:

```ts
import { main, cloud } from "@wingcloud/framework";

main((root) => {
  // your app goes here!
  new cloud.Bucket(root, "Bucket");
});
```
