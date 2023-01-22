---
title: Development Workflows
id: workflows
keywords: [Wing contributors, contributors, workflows]
---

This topic includes a description of common development workflows for the Wing project.

## Environment Setup

Here is a list of minimal tools you should install to build the Wing repo in your development
environment:

* [Node.js] version 18.x (we recommend [volta]) (currently npm 9 is [not
  supported](https://github.com/winglang/wing/issues/1103))
* [Rust]
* [AWS CLI] (only needed for integration tests - make sure to do the setup part to create
  credentials)
* [Terraform CLI] (only needed for integration tests)

Installation:

```sh
git clone https://github.com/winglang/wing
cd wing
npm install
```

This is required once:

```sh
sudo ./scripts/setup_wasi.sh
```

[Nx]: https://nx.dev/
[Node.js]: https://nodejs.org/en/
[Rust]: https://www.rust-lang.org/tools/install
[AWS CLI]: https://aws.amazon.com/cli/
[Terraform CLI]: https://learn.hashicorp.com/terraform/getting-started/install.html
[volta]: https://volta.sh

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

This runs the full Wing CLI with the given arguments. Nx will ensure the CLI build is updated.

## Compiler

The following command runs the cargo tests, currently just ensure the valid examples compile and the
invalid ones do not.

```sh
cd libs/wingc
npx nx test
```

The following command runs `wingc` on a file. This performs all the compilation steps, except th last one: running the
generated intermediate preflight javascript. For those familiar with the CDK, it doesn't run the synth command in the end.

```sh
npx nx dev -- <path to .w file>
```

## Grammar

```sh
cd libs/tree-sitter-wing
npx tree-sitter-cli generate
```

After making changes to grammar.js

```sh
npx tree-sitter-cli test
```

To run the grammar tests (in the `test` folder)

```sh
npx tree-sitter-cli build-wasm --docker
```

Builds the grammar as WASM for the web-based playground. Leave off `--docker` if you have emscripten
setup locally.

```sh
npx tree-sitter-cli playground
```

Uses the wasm grammar to run a web-based playground where you can explore the AST and test out
highlight queries. Make sure to also run `build-wasm` before each time the grammar changes.
