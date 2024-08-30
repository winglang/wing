---
title: "CLI User Manual"
id: cli
slug: /cli
sidebar_label: CLI User Manual
description: Wing CLI reference
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language, cli]
---

## Compile, Test, and Run Wing Programs

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

Run `wing new` without any arguments to view the available templates or you can [view the templates on GitHub](https://github.com/winglang/wing/tree/main/apps/wing/project-templates/wing).

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

* [Wing Cloud Simulator](/docs/platforms/sim) - `sim`
* [Terraform/AWS](/docs/platforms/AWS/tf-aws) - `tf-aws`
* [Terraform/Azure](/docs/platforms/microsoft-azure/tf-azure) - `tf-azure`
* [Terraform/GCP](/docs/platforms/google-cloud/tf-gcp) - `tf-gcp`
* [AWS CDK](/docs/platforms/AWS/awscdk) - `@winglang/platform-awscdk`

## Test: `wing test`

The `wing test` command can be used to compile and execute tests in Wing applications.

Usage:

```sh
$ wing test [entrypoint...] [--test-filter <regex>] [--retry [retries]] [-t TARGET]
```

Tests are written in `test` blocks that contain *inflight code*. In Wing, each test is executed
against a separate copy of the application being tested.

In the following example
([test_bucket.test.w](https://github.com/winglang/wing/tree/main/examples/tests/valid/test_bucket.test.w)),
the application consists of a single `cloud.Bucket` and two tests `"put"` and `"get"`.

```js example
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

Now, if we run the following command, the framework will run each one of these tests against a
different bucket. This is how the `"put"` test can safely assume that `b.list()` initially returns
an empty array.

```sh
$ wing test test_bucket.test.w
pass | test_bucket.test.w | root/test:get
pass | test_bucket.test.w | root/test:put
```

### Choosing which tests to run

The `wing test` command accepts an optional list of test entrypoint files:

```sh
wing test [entrypoint...]
```

A file is considered an entrypoint if its name is `main` or ends with `.main` or `.test` and the
extension is `.w` or `.ts`. 

By default, all entrypoints in the current directory will be used.

Exact paths or partial text can be used. If partial, all entrypoints in the current directory that
contain the partial path will be used. For example `wing test bucket` will test `bucket.test.w` and
`bucket/get.test.w`.

The `--test-filter <regex>` option can be used to run only specific tests within the entrypoints
based on a provided regular expression.

### Cloud tests

The `-t TARGET` option can be used to run tests on supported cloud platforms.

> Currently, cloud tests are supported for Terraform (`tf-*`) and AWS CDK (`awscdk`).

For example, `wing test -t tf-aws` will deploy to AWS using Terraform and execute tests. For this to
work, you will need AWS credentials in your environment.

Since each Wing test expects to run against its own isolated environment, the test framework will
deploy a separate copy of your application for each test, execute the test and collect the results.

Sometimes, when running tests on the cloud there could be intermittent issues such as connectivity
or capacity issues. The `--retry <retries>` switch controls how many times to retry a failed test.
By default it will retry 3 times.

### Cloud test snapshots

Sometimes it is not practical to execute all tests on the cloud in every commit. This could be
because it can take a long time to run all these tests or because the cloud resources required are
expensive.

The Wing test framework has a built-in mechanism to mitigate these constraints called *cloud test
snapshots*.

This mechanism is only activated when running tests on the cloud (e.g. `-t TARGET` where `TARGET` is
not `sim`).

If all the tests pass, the framework will automatically capture a snapshot of the compiler output
and store it next to the test file (under a `.snap.md` file with the same name as the test
entrypoint).

In the following example, we run `test_bucket.test.w` against the `tf-aws` target. After the tests passed, a snapshot is captured
and stored under `test_bucket.test.w.tf-aws.snap.md`.

```sh
$ wing test -t tf-aws test_bucket.test.w
✔ Compiling test_bucket.test.w to tf-aws...
✔ terraform init
✔ terraform apply
...
✔ Snapshot test_bucket.test.w.tf-aws.snap.md...
```

The snapshot file will include a snapshot of the `main.tf.json` file which includes the Terraform
output of the compiler.

Then, when running the same command within a CI system (which is detected by the `CI` environment
variable), the framework will *not* attempt to deploy to the cloud, but instead will only assert
that the output hasn't changed.

```sh
$ CI=1 wing test -t tf-aws test_bucket.test.w
✔ Snapshot test_bucket.test.w.tf-aws.snap.md...
```

If the output has changed, the test will fail:

```sh
$ CI=1 wing test -t tf-aws test_bucket.test.w
✖ Snapshot test_bucket.test.w.tf-aws.snap.md...
Snapshot mismatch:
 - Expected: test_bucket.test.w.tf-aws.snap.md
 - Actual: test_bucket.test.w.tf-aws.snap.md.actual
```

The `--snapshots <mode>` or `-s <mode>` switch can be used to determine the behavior of the
snapshots mechanism:

* `never` - Disables the snapshots mechanism altogether. Should be used, for example, if you wish to
  run cloud tests from within a CI system.
* `deploy` - Deploys and captures the snapshot if test passed. This is the default behavior when
  running cloud tests and `CI` is not set.
* `assert` - Only verifies that the snapshots haven't changed. This is the default behavior when
  running cloud tests and `CI` is set.
* `update` - Only updates the snapshots without deploying. Use this with caution as this can
  potentially result in a regressed behavior.
* `auto` - Auto-detect `wet` or `assert` based on the `CI` environment variable (the behavior
  described above).

## Package: `wing pack`

The `wing pack` command can be used to package your project as a Wing library.

Usage:

```sh
$ wing pack
```

This will compile your current Wing directory, and bundle it as a tarball that can be published to [GitHub packages](https://github.com/features/packages) or [npm](https://www.npmjs.com/).

See [Libraries](/docs/category/wing-libraries-winglibs) for more details on packaging and consuming Wing libraries.

## Generate Docs: `wing gen-docs`

The `wing gen-docs` command can be used to generate API documentation for your Wing project.

Usage:

```sh
$ wing gen-docs
```

This will generate a file named `API.md` in the root of your project.

## Store Secrets: `wing secrets`

The `wing secrets` command can be used to store secrets needed by your application. The method of storing secrets depends on the target platform.

Take the following Wing application:

```js example
// main.w
bring cloud;

let secret = new cloud.Secret(name: "slack-token");
```

Usage:

```sh
$ wing secrets main.w

1 secret(s) found

? Enter the secret value for slack-token: [hidden]
```

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
