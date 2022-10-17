# The Wing Programming Language

Wing Programming Language reference implementation.

## Prerequisites

- [Rust](https://rustup.rs/)
- [node.js](https://nodejs.org)
- [Graphviz](https://graphviz.org/download/) - run `arch -arm64 brew install graphviz`

You also need to `npm login` into `@monadahq`.

## `wingc` Compiler

The compiler is under `libs/wingc` and you can use standard Rust workflows within that directory:

- `cargo build` - builds the code
- `cargo test` - runs tests
- `cargo test -- --nocapture` - runs tests with output to see compilation results
- `cargo run <source_file> [output_dir]` - compiles the wing source file to the output directory

If intent is to compile for WebAssembly, the following tooling is needed:

- `cargo install cargo-wasi` - Adds convenient WASI commands to Cargo
- `sudo bash scripts/setup_wasi.sh` - Installs WASI SDK

Then you can build with:

```shell
cargo wasi build
```

If cargo-wasi fails, make sure you do not have `RUSTFLAGS` defined.

## `wing`

The meta wrapper CLI binary, Wing's `cargo`.

`npx @monadahq/wing compile <source_file> [output_dir]`

### Building

wingc must first be built as a wasm binary, see above. Once built (debug) you can run:

```shell
npm run copy-wingc-debug
```

to ensure the wasm binary is available. Then

```shell
npm run dev compile <source_file> [output_dir]
```

To invoke the compiler.

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
