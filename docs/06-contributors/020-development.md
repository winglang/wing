---
title: Development
id: development
keywords: [Wing contributors, contributors, workflows]
---

This topic includes a description of common development workflows for the Wing project.

## Environment Setup

:::info
You can open up this repo just using the badge below. It is recommended to select a 4-core minimum machine.
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/winglang/wing)
:::

Here is a list of minimal tools you should install to build the Wing repo in your development
environment:

* [Node.js] v18 and npm v8
  * We recommend [volta] to manage node tools
* [Rust]
  * We recommend using [rustup] to manage your Rust installation
* [AWS CLI]
  * Only needed for integration tests - make sure to do the setup part to create credentials
* [Terraform CLI]
  * Only needed for integration tests
* [Docker]
  * Needed to build the grammar as WASM for the web-based playground and to run unit tests

Installation:

```sh
git clone https://github.com/winglang/wing
cd wing
npm install
```

:::note Nx Commands
[Nx] commands in this document are structured as

```sh
npx nx <target> <project>
# or
npx nx <target> <project> -- <args>
```

- `npx` can be omitted if [Nx] is installed globally
- `<project>` may be omitted if the current working directory is within the given project directory. If not within any project directory, it will default to the `winglang` CLI project
- If any paths are present in `<args>`, ensure they are either absolute or relative to the project directory

:::

[Nx]: https://nx.dev/
[Node.js]: https://nodejs.org/en/
[Rust]: https://www.rust-lang.org/
[rustup]: https://rustup.rs/
[AWS CLI]: https://aws.amazon.com/cli/
[Terraform CLI]: https://learn.hashicorp.com/terraform/getting-started/install.html
[volta]: https://volta.sh
[Docker]: https://docs.docker.com/get-docker/
[emscripten]: https://emscripten.org/docs/getting_started/downloads.html

## Full build

If you wish to perform a full build (similar to the one CI is running), just run this from the root:

```sh
npm run build
```

It will run the `build`, `test` and `package` targets on all modules.


## 🏠 What's the recommended development workflow?

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
from the root directory, and can be accessed with `npx nx` (it does not need to be installed
separately).

:::note

The first time you run `npm install` it may take extra time to install the
 [wasi-sdk](https://github.com/WebAssembly/wasi-sdk) for you. This is needed to compile Wing for WASM.

If you wish to install it manually, you may do so by running `scripts/setup_wasi.sh`

:::

## 🧪 How do I run tests?

End-to-end tests are hosted under `./tools/hangar`. To get started, first ensure you can [build
wing](#-how-do-i-build-wing).

To run the tests (and update snapshots), run the following command from anywhere in the monorepo:

```sh
npx nx test hangar
```

### Test Meta-Comments

In your wing files in `examples/tests/valid`, you can add a specially formatted comment to add additional information for hangar.
Inside this comment, a yaml block will be read and used for serveral purposes.

Example:

```ts
/*\
skipPlatforms:
  - win32
  - darwin
\*/
```

Currently, the only supported meta-comment for regular tests is `skipPlatforms`.
This will skip the test on the given platforms when when running on CI. The current supported platforms are `win32`, `darwin`, and `linux`.
This is useful if, for example, the test requires docker. In our CI only linux supports docker.

### Benchmarks

Benchmark files are located in `examples/tests/valid/benchmarks`. To run the benchmarks, run the following command from anywhere in the monorepo:

```sh
npx nx bench hangar
```

Benchmark files should ideally have a meta-comment with the `cases` key. For example:

```ts
/*\
cases:
  - target: sim
    maxMeanTime: 900
  - target: tf-aws
    maxMeanTime: 1000
\*/
```

Given each of these cases, the current purpose is to provide a maxMeanTime (milliseconds) per compilation target. 
If the average time for compiling to this target takes longer than the maxMeanTime, the test will fail.
Note: In CI, tests likely run much slower than on your local machine, so you may need to observe the CI results to determine the correct maxMeanTime.

## How do I work only on the compiler?

The following command runs the rust tests in wingc, including verification that valid tests compile, invalid tests do not compile, and none of them panic.

It will also make sure to update any snapshots.

```sh
npx nx test wingc
```

The following command runs `wingc` on a file. This performs all the compilation steps. Run from the root or `apps/wing`.

```sh
npx nx wing -- compile <path to a .w file (full path, or relative to the location of the apps/wing folder)>
```

You can find the compilation artifacts in the apps/wing/targets folder.

To check that your code passes all the lints, run:

```sh
npx nx lint wingc
```

### Optional VSCode extensions for working on the compiler

You can show clippy errors in your IDE by installing the [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) extension and setting the option "Rust-analyzer › Check: Command" to "clippy" instead of "check".

The [insta](https://marketplace.visualstudio.com/items?itemName=mitsuhiko.insta) extension allows you to view snapshots in the tests files.

## How do I debug the Wing compiler on VSCode?

To debug the Rust compiler on VSCode, first you need to install the [CodeLLDB extension](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb).<br/>
Next, you can use the `Debug Wing Compiler` launch configuration available on our [launch.json](https://github.com/winglang/wing/blob/main/.vscode/launch.json).

Open the `.w` file you wish to debug compilation for (e.g. `${workspaceFolder}/examples/tests/valid/hello.w`) and hit F5 to start debugging.

## How do I make changes to the Wing grammar?

After making changes to `grammar.js`, run:

```sh
npx nx build tree-sitter-wing
```

To run the grammar tests (that are located in the `test` folder):

```sh
npx nx test tree-sitter-wing
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

The VSCode extension is located in `apps/vscode-wing`. Most of the "logic" is in the language server, which
is located in the Wing CLI at `apps/wing/src/commands/lsp.ts`. 

To build the extension (also creates an installable `.vsix` file):

```sh
npx nx build vscode-wing
```

To run a new isolated VSCode instance with the extension installed:

```sh
npx nx dev vscode-wing
```

To modify the package.json, make sure to edit `.projenrc.ts` and rebuild.

Tip: if you want to print debug messages in your code while developing, you should use Rust's `dbg!` macro, instead of `print!` or `println!`.

## 🧹 How do I lint my code?

To lint Rust code, you can run the `lint` target on the `wingc` or `wingii` projects:

```sh
npx nx lint wingc
```

It's also possible to lint by running `cargo clippy` directly.

Lastly you can show linting errors in your IDE by enabling the following setting in the rust-analyzer extension:

```json
// in your VS Code settings
"rust-analyzer.check.command": "clippy",
```