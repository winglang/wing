# The Wing Programming Language

Wing Programming Language reference implementation.

## Prerequisites

- [Rust](https://rustup.rs/)
- [node.js](https://nodejs.org)
- [CMake](https://cmake.org/) - or on Mac - `arch -arm64 brew install cmake`
- [Graphviz](https://graphviz.org/download/) - run `arch -arm64 brew install graphviz`

You also need to `npm login` into `@monadahq`.

## `wingc` Compiler

The compiler is under `libs/wingc` and you can use standard Rust workflows:

- `cargo build` - builds the code
- `cargo test` - runs tests
- `cargo test -- --nocapture` - runs tests with output to see compilation results

If intent is to compile for WebAssembly, following tooling is needed:

- `rustup target add wasm32-wasi` - adds WASI target to Cargo
- `wasicc` that comes with WasiEnv (<https://github.com/wasienv/wasienv>)

At this stage, WASI builds are two-step builds. You need to run the native build
once to get `.rlib` and `.a` outputs (WASI's `ld` just needs to check for these
files to be present) and then run:

```
CC="wasicc" CFLAGS="-m32 -Wl,--whole-archive" cargo build --target wasm32-wasi
```

## `wingrt` Runtime

The runtime that executes output of the compiler - it is under `apps/wingrt`.

Currently local compilation is complicated and takes a lot of time, it requires
building a special variant of Node, blood sacrifice, and dark rituals.

Pre-built binaries are available at:
[winglang-infra](https://github.com/monadahq/winglang-infra).

Get the binaries for your platform and place them under `apps/wingrt/vendor/node`. For this, you need to unzip the file and put the "include" and "lib" folders directly under `apps/wingrt/vendor/node`.
If you are on an apple silicone Mac then use `actual-libnode-macos-latest-arm64.zip` and not `libnode-macos-latest-arm64.zip`.

You also need to build the compiler (`wingc`) first: 
```bash
cd ../libs/wingc
cargo build --release
```

Then you should make sure that you've setup Github private packages on your machine.
Instructions are in [this KB](https://github.com/monadahq/mona-kb/blob/main/docs/github-private-packages.md).

You should also make sure you have cmake installed, see [here](http://cmake.org), or on Mac just use `arch -arm64 brew install cmake`

After that you should be able to build and run the runtime tests with:

```bash
cd apps/wingrt
npm install
npm test
# incremental recompiles
npm run cmake
```

IF everything is fine, then you should be able to run the CLI with:

```bash
./build/wingrt 
```
## Troubleshooting

**Troubleshoot #1:** if you get this error: "fatal error: 'v8.h' file not found" then you need to make sure you put the pre-built binaries correctly in `apps/wingrt/vendor/node`.

**Troubleshoot #2:** if you get this error: "linker command failed with exit code 1 (use -v to see invocation)" then you need to run `npm run clean` from wingrt folder.

**Troubleshoot #3:** if you get this error: "Undefined symbols for architecture arm64" then do the following:
1. Run `rustup toolchain list`, to see the supported architecture (you'll most likely see: `stable-x86_64-apple-darwin (default)`).
1. Install support for arm64 architecture and set it as default:
```bash
rustup toolchain install stable-aarch64-apple-darwin
rustup default stable-aarch64-apple-darwin
cd libs/wingc
cargo clean
```

## `wing`

The meta wrapper CLI binary, Wing's `cargo`.

## Wing SDK

The Wing SDK is the standard library of the Wing programming language. The SDK
is maintained under the [monadahq/wingsdk](https://github.com/monadahq/wingsdk)
repository and released as a private npm module called
[`@monadahq/wingsdk`](https://github.com/monadahq/wingsdk/packages/1519521).

The `wing` folder in this repository has a `package.json` file that simply takes
a dependency on the SDK package, so running `npm install` will bring it over.

## VSCode Language Support

The extension located in [wing-analyzer/vscode-extension](wing-analyzer/vscode-extension). An [installable](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix) VSIX is published on every push to main and is available in the [artifacts](https://github.com/monadahq/winglang/releases/download/development/vscode-wing.vsix) on the release page.

Note: After installing, the extensions can self update if provided a Github PAT with private repo permissions. Check the vscode settings for this extension for more details.

### Local SDK Development

If you wish to develop the SDK alongside the compiler, simply clone the SDK
repository side-by-side with the compiler and use `npm link` in the playground:

Clone and build the SDK, and capture it as a linked package:

```sh
cd ~/workspace
git clone git@github.com:monadahq/wingsdk
cd wingsdk
yarn
yarn build
yarn link
```

Clone the winglang repo and attach the linked SDK:

```sh
cd ~/workspace
git clone git@github.com:monadahq/winglang
cd winglang/playground
npm run link-sdk
```

You will likely want to watch for changes in the SDK directory:

```sh
cd ~/workspace/wingsdk
yarn watch
```

And in another terminal, you can start iterating:

```sh
cd ~/workspace/winglang/playground
./wingc examples/test.w
```

### Language Examples

Examples of Wing code are located in the [examples](./examples) directory.

## License

TBD
