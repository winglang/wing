# The Wing Programming Language

Wing Programming Language reference implementation.

## Prerequisites

- [Rust](https://rustup.rs/)
- [node.js](https://nodejs.org)
- [CMake](https://cmake.org/)

You also need to `npm login` into `@monadahq`.

## `wingc` Compiler

The compiler is under `wingc` and you can use standard Rust workflows:

- `cargo build` - builds the code
- `cargo test` - runs tests

## `wingrt` Runtime

The runtime that executes output of the compiler.

Currently local compilation is complicated and takes a lot of time, it requires
building a special variant of Node, blood sacrifice, and dark rituals.

Pre-built binaries are available at:
[winglang-infra](https://github.com/monadahq/winglang-infra).

Get the binaries for your platform and place them under `wingrt/vender/node`.

You also need to build the compiler (`wingc`) first: `cargo build --release`.

After that you should be able to build and run the runtime tests with:

```bash
npm install
npm test
# incremental recompiles
npm run cmake
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

### Upgrading SDK

After local development

Once a new version of the SDK is pushed to `main` of the `wingsdk` repository, a
new release will be published.

Now, you can upgrade the SDK version of the playground using:

```sh
cd playground
npm run upgrade
```

You'll see that `package.json` and `package-lock.json` files are changed with
the new version.

## License

TBD
