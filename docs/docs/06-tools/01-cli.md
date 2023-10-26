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

The --platform option specifies the target platform to compile for. The default platform is `sim`.
The following platforms are built-in:

* `sim` - [Wing Simulator](#sim-target)
* `tf-aws` - Terraform/AWS
* `tf-azure` - Terraform/Azure
* `tf-gcp` - Terraform/Google Cloud Platform

### `sim` Platform

The Wing program is going to be compiled for the Wing simulator (`.wsim`).

Usage:

```sh
$ wing compile [entrypoint] --platform sim
```

The output will be found under `target/<entrypoint>.wsim` and can be opened in two ways:

* Interactively through the [Wing Console](/docs/start-here/local)
* Using the `wing run|it target/<entrypoint>.wsim` command through the Wing CLI.


### `tf-aws` Platform

Compiles your program for Terraform and run on AWS.

Usage:

```sh
$ wing compile [entrypoint] --platform tf-aws
```

The output includes both a Terraform configuration file (under `target/cdktf.out/stacks/root`) and
JavaScript bundles that include inflight code that executes on compute platform such as AWS Lambda.

You can deploy your stack to AWS using Terraform ([instructions](/docs/start-here/aws)).



### `tf-azure` Platform

Compiles your program for Terraform and run on Azure.

Usage:

```sh
$ export AZURE_LOCATION="East US"
$ wing compile [entrypoint] --platform tf-azure
```

The variable `AZURE_LOCATION` is required and indicates the [deployment
location](https://github.com/claranet/terraform-azurerm-regions/blob/master/REGIONS.md) of your
stack.

The output includes both a Terraform configuration file (under `target/cdktf.out/stacks/root`) and
JavaScript bundles that include inflight code that executes on compute platform such as Azure
Functions.

### `tf-gcp` Platform

Compiles your program for Terraform and run on Google Cloud Platform.

Usage:

```sh
$ export GOOGLE_PROJECT_ID="my-project"
$ export GOOGLE_STORAGE_LOCATION="US"
$ wing compile [entrypoint] --platform tf-gcp
```

The variable `GOOGLE_STORAGE_LOCATION` is required and indicates the [deployment
location](https://cloud.google.com/storage/docs/locations) of all storage
resources (such as buckets and queues). The variable `GOOGLE_PROJECT_ID` is required and indicates
the project ID of your stack.

The output includes both a Terraform configuration file (under `target/cdktf.out/stacks/root`) and
JavaScript bundles that include inflight code that executes on compute platform such as Google Cloud Functions.


### `awscdk` Platform

Compiles your program for AWS CDK with CloudFormation to run on AWS.

Usage:

```sh
$ export CDK_STACK_NAME="my-project"
$ wing compile [entrypoint] --platform awscdk
```

The output includes both a AWS-CDK configuration file (under `target/<entrypoint>.awscdk`) and
JavaScript bundles that include inflight code that executes on compute platforms such as AWS Lambda.

You can deploy your stack to AWS by installing the [AWS CDK Toolkit](https://docs.aws.amazon.com/cdk/v2/guide/cli.html) and running:
```sh
$ cdk deploy --app target/app.awscdk
```

## Test: `wing test`

The `wing test` command can be used to compile and execute tests in Wing applications.

Usage:

```sh
$ wing test [entrypoint...] [--test-filter <regex>]
```

`[entrypoint...]` specifies the entrypoint list of files that will be compiled and tested. A file is considered a valid entrypoint if its name ends with `.w`.

`[--test-filter <regex>]` option to run only specific tests within the entrypoints based on a provided regex.

For example ([test_bucket.test.w](https://github.com/winglang/wing/tree/main/examples/tests/valid/test_bucket.test.w)):

:::note Default Entrypoint(s)

It's possible to execute `wing test` without specifying any entrypoint, in which case the CLI looks for all files ending with `.test.w` in the current directory. If no files are found, the CLI throws an error.

:::

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
