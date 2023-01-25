---
title: Development
id: development
keywords: [Wing contributors, contributors, workflows]
---

This topic includes a description of common development workflows for the Wing project.

## Environment Setup

Here is a list of minimal tools you should install to build the Wing repo in your development
environment:

* [Node.js] v18 and npm v8
  * We recommend [volta] to manage node tools
* [Rust]
* [AWS CLI]
  * Only needed for integration tests - make sure to do the setup part to create credentials
* [Terraform CLI]
  * Only needed for integration tests
* [Docker] or [emscripten]
  * Only needed for to build the grammar as WASM for the web-based playground

Installation:

```sh
git clone https://github.com/winglang/wing
cd wing
npm install
```

:::note

The first time you run `npm install` you may be asked to enter your system password, this is because
it's taking care of installing the [wasi-sdk](https://github.com/WebAssembly/wasi-sdk) for you.

If you wish to install it manually, you may do so by running `scripts/setup_wasi.sh`

:::

[Nx]: https://nx.dev/
[Node.js]: https://nodejs.org/en/
[Rust]: https://www.rust-lang.org/tools/install
[AWS CLI]: https://aws.amazon.com/cli/
[Terraform CLI]: https://learn.hashicorp.com/terraform/getting-started/install.html
[volta]: https://volta.sh
[Docker]: https://docs.docker.com/get-docker/
[emscripten]: https://emscripten.org/docs/getting_started/downloads.html

## How is the repository structured?

The Wing repository is structured as a monorepo, which means that it contains multiple packages.
Packages that are primarily meant to be run by users are in the `apps` directory, while packages
that are primarily meant to be consumed as libraries are in the `libs` directory. Some packages are
written in Rust, while others are written in TypeScript. Each has a README explaining what it does
and how to use it. (If you see one missing, please open an issue and let us know!)

The Wing monorepo uses [Nx] to run commands across all code packages in the `libs` and `apps`
folders. This means it includes packages that form the entire toolchain (compiler, SDK, IDE
extension, etc), and the build and release bind them all together.

Nx will be installed alongside the rest of the project's dependencies after you run `npm install`
from the root directory, and can be accessed with `npx nx`. (It does not need to be installed
separately).

## Development iteration

The `npx nx wing` command can be executed from the root of the repository in order to build and run the
compiler, SDK and the Wing CLI. Nx is configured to make sure only the changed components are built
every time.

To get full diagnostics, use these exports:

```sh
export NODE_OPTIONS=--stack-trace-limit=100
export RUST_BACKTRACE=full
```

Now, you can edit a source file anywhere across the stack and run the compiler with arguments.
For example:

```sh
npx nx wing -- test ../../examples/tests/valid/captures.w
```

This command runs the full Wing CLI with the given arguments. Nx will ensure the CLI build is updated.

## Compiler

The following command runs the cargo tests, currently just ensures the valid examples compile and the
invalid ones do not.

```sh
cd libs/wingc
npx nx test
```

The following command runs `wingc` on a file. This performs all the compilation steps. Run from the root.

```sh
npx nx wing -- compile <path to a .w file (full path, or relative to the location of the apps/wing folder)>
```

You can find the compilation artifacts in the apps/wing/targets folder

## Grammar

After making changes to grammar.js, run:

```sh
cd libs/tree-sitter-wing
npx tree-sitter-cli generate
```

To run the grammar tests (that are located in the `test` folder):

```sh
npx tree-sitter-cli test
```

To build the grammar as WASM for the web-based playground. Leave off `--docker` if you have emscripten
setup locally:

```sh
npx tree-sitter-cli build-wasm --docker
```

To use the wasm grammar to run a web-based playground where you can explore the AST and test out
highlight queries, run:

```sh
npx tree-sitter-cli playground
```

Make sure to also run `build-wasm` before each time the grammar changes


## 🔨 How do I build the VSCode extension?

The VSCode extension is located in `apps/vscode-wing`. Most of the logic is in the language server, which
is located in `apps/vscode-wing`. Running `npx nx build` from `apps/vscode-wing` will ensure the
language server is built first and the binary is available. This creates an installable VSIX file.

A VSCode launch configuration is available to open a VSCode with a development version of the
extension.

To modify the package.json, please edit `.projenrc.ts` and run `npx projen`.


## 🏠 How do I build Wing?

Assuming you've [setup your environment](https://docs.winglang.io/contributors/workflows#environment-setup), including the `npm install` part,
just run the following command from the root of the project:
```
npx nx wing
```

## 🧪 How do I run E2E tests?

Our end-to-end tests are hosted under `./tools/hangar`. To get started, first ensure you can [build wing](#-how-do-i-build-wing).

To run the tests (and update snapshots), run the following commands from the root of the Hangar
project:

```sh
npm test
```

Or, you can run the following command from the root of the monorepo:

```sh
npx nx run hangar:test
```
