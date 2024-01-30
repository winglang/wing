---
id: installation
title: Installation
keywords: [Wing installation, installation, Wing toolchain]
slug: /
---

Create an entrypoint file, commonly named `main.ts`:

> Note about src conventions: Wing does not enforce the location of your source files. The documentation will assume your entrypoint is at the root of your project, but you can place it anywhere you like.

```ts
import { main, cloud } from "@wingcloud/framework";

main((app) => {

})
```