---
title: "CLI User Manual: Compile, Test, and Run Wing Programs"
id: cli
sidebar_label: CLI User Manual
description: Wing CLI reference
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, cli]
---

The Wing CLI is a command line interface for Wing. It is used to compile, test, and run Wing
programs in your terminal, and we hope it will become your best friend.

## Installation

The CLI is distributed as an npm package which can be installed globally using:

```bash
npm i -g winglang
```

Usage:

```sh
$ wing [command] [options]
```

## New project: `wing new`

The `wing new` command can be used to create a new Wing project from a template in your current directory.

Usage:

```sh
$ wing new <template>
```

Run `wing new` without any arguments to view the available templates.

## Run: `wing run|it`

You can use the `run` command (or `it`) when you want to interact with your Wing program in the
[Wing Console](/docs/start-here/local).

Usage:

```sh
$ wing run|it [entrypoint]
```

`[entrypoint]` is a valid entrypoint for a Wing program. An entrypoint can be either source code or compiled. If it's source code, the entrypoint refers to a file named `main.w` or ending with `.main.w`/`.test.w`, whereas if it's compiled the entrypoint refers to a directory whose name ends with `.wsim`.

:::note Default Entrypoint

By default, `wing run|it` will look for exactly one file named `main.w` or ending with `.main.w`

:::

## Compile: `wing compile`

You can use the `compile` command to compile a Wing program into a deployable artifact.

```sh
$ wing compile [entrypoint] --platform <platform>
```

`[entrypoint]` specifies the entrypoint file to compile. A file is considered a valid entrypoint if its name is `main.w` or if it ends with `.main.w`/`.test.w`.

:::note Default Entrypoint

By default, `wing compile` will look for exactly one file named `main.w` or ending with `.main.w`

:::

The --platform option (or `-t`) specifies the target platform to compile for. The default platform
is `sim`.

You can use one of the built-in platform providers:

* [Wing Cloud Simulator](../055-platforms/sim.md) - `sim`
* [Terraform/AWS](../055-platforms/tf-aws.md) - `tf-aws`
* [Terraform/Azure](../055-platforms/tf-azure.md) - `tf-azure`
* [Terraform/GCP](../055-platforms/tf-gcp.md) - `tf-gcp`
* [AWS CDK](../055-platforms/awscdk.md) - `@winglang/platform-awscdk`

## Test: `wing test`

The `wing test` command can be used to compile and execute tests in Wing applications.

Usage:

```sh
$ wing test [entrypoint...] [--test-filter <regex>] [--retry [retries]]
```

`[entrypoint...]` is the list of entrypoints that will be compiled and tested. 
A file is considered an entrypoint if its name is `main` or ends with `.main` or `.test` and the extension is `.w` or `.ts`. 
Exact paths or partial text can be used. If partial, all entrypoints in the current directory that contain the partial path will be used. For example `wing test bucket` will test `bucket.test.w` and `bucket/get.test.w`.

By default, all entrypoints in the current directory will be used.

`[--test-filter <regex>]` runs only specific tests within the entrypoints based on a provided regex.

`[--retry [retries]]` will retry failed tests based on number provided. By default it will retry `3` times.

For example ([test_bucket.test.w](https://github.com/winglang/wing/tree/main/examples/tests/valid/test_bucket.test.w)):

```js
bring cloud;

let b = new cloud.Bucket();

test "put" {
  assert(b.list().length == 0);
  b.put("hello.txt", "world");
  assert(b.list().length == 1);
}

test "get" {
  b.put("hello.txt", "world");
  assert(b.get("hello.txt") == "world");
}
```

Now, if we run the following command:

```sh
$ wing test test_bucket.test.w
pass | test_bucket.test.w | root/test:get
pass | test_bucket.test.w | root/test:put
```

We will see that both functions were invoked and that the tests passed.

## Package: `wing pack`

The `wing pack` command can be used to package your project as a Wing library.

Usage:

```sh
$ wing pack
```

This will compile your current Wing directory, and bundle it as a tarball that can be published to [GitHub packages](https://github.com/features/packages) or [npm](https://www.npmjs.com/).

See [Libraries](../05-libraries.md) for more details on packaging and consuming Wing libraries.

## Environment Variables

For development and testing, Wing can automatically read environment variables from `.env` files in your current working directory. These environment variables can be accessed in Wing code using `util.env` and `util.tryEnv` in both preflight. In inflight these functions can also be used but note that the variables are not automatically available, if desired they must be passed explicitly when used like in `cloud.Function`.

### Supported `.env` files

Here's the list of supported `.env` files:

- `.env` – Loaded in all cases
- `.env.local` – Loaded in all cases and typically ignored by git
- `.env.[mode]` – Only loaded in the specified mode (`run`, `compile`, `test`, `lsp`, …)
- `.env.[mode].local` – Only loaded in the specified mode and typically ignored by git

### Advanced `.env` usage

- **Referencing within `.env` files**: You can reference already defined environment variables in your `.env` files. This can be useful for creating compound variables or reusing common values. For example, if you have `BASE_URL=https://example.com` and want to set an API endpoint, you could use `API_ENDPOINT=$BASE_URL/api/v1`.

- **Loading from multiple files**: Wing can load environment variables from multiple `.env` files. If variables overlap, the last loaded file will overwrite previously set values. This allows for a layered setup where base configuration can be in `.env` and environment-specific overrides can be in `.env.[mode]` or `.env.[mode].local`.

By leveraging these advanced features, you can create a more flexible and dynamic environment configuration for your Wing applications.
