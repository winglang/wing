---
title: Wing Cloud Simulator
id: sim
sidebar_label: sim
description: Simulator Platform
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, simulator, sim, wing simulator]
---

The Wing Cloud Simulator is a tool for running Wing applications on a single host. It offers a
simple localhost implementation of all the resources of the Wing Cloud Library to allow developers
to develop and functionally test cloud applications without having to deploy to the cloud.

The `sim` [platform](../02-concepts/03-platforms.md) compiles your program so it can run in the
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
