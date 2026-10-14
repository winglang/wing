---
title: Wing Cloud Simulator
id: sim
sidebar_label: Wing Cloud Simulator (sim)
description: Simulator Platform
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, simulator, sim, wing simulator]
---

The Wing Cloud Simulator is a tool for running Wing applications on a single host. It offers a
simple localhost implementation of all the resources of the Wing Cloud Library to allow developers
to develop and functionally test cloud applications without having to deploy to the cloud.

The `sim` [platform](/docs/platforms/sim) compiles your program so it can run in the
Wing Cloud Simulator.

## Usage

```sh
$ wing compile [entrypoint] --platform sim
```

## Parameters

No parameters.

## Output

The output will be found under `target/<entrypoint>.wsim`.

## Deployment

The Wing Simulator can be used in one of these methods:

* Interactively through the [Wing Console](/docs/start-here/local)
* Using the `wing run|it target/<entrypoint>.wsim` command through the Wing CLI.

## npm packages in inflight code

The simulator runs inflight code (for example `cloud.Function` and `cloud.Service` handlers, and
the JavaScript/TypeScript files they use through `extern`) in Node.js child processes on your
machine. Inflight code is still bundled with esbuild, but npm packages that inflight code imports
from your project's `node_modules` are left out of the bundle and loaded natively by Node.js at
runtime. This means packages that can't be bundled (e.g. packages with native addons, optional
dependencies that aren't installed, or code that relies on `__dirname`, such as `vite` or `ngrok`)
work in the simulator.

A package is loaded natively only when doing so doesn't change what your code gets. Otherwise
(for example, the package can't be found from the app's output directory, or it's a CommonJS
module with an `__esModule` marker imported with `import` from a `.ts`/`.js` file) it is bundled
like before.

To bundle all packages instead (the previous behavior), set `WING_SIM_BUNDLE_ALL_PACKAGES=1`.

:::note
This only applies to the simulator. Cloud platforms (such as `tf-aws`) still bundle every package
into the deployed code, so packages that can't be bundled need to be handled there separately.
:::
