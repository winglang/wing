# The Wing Programming Language

[![Build Status](https://d23zvjtrxh8s3j.cloudfront.net/api/badges/monadahq/winglang/status.svg?ref=refs/heads/runtime)](https://d23zvjtrxh8s3j.cloudfront.net/monadahq/winglang)

This strives to be a complete [winglang](https://github.com/monadahq/rfcs/pull/4) implementation. It's a WIP.

All development is currently under the `dev` branch. I've opened a [PR for to `main`](https://github.com/monadahq/winglang/pull/1) where you're welcome to add any comments/suggestions/questions you have regarding this code.

The project currently includes the [wingc](./wingc) compiler and a [playground](./playground/).

## Prerequisites

* [Rust](https://rustup.rs/)
* [node.js](https://nodejs.org)

## Playground

After installing the prerequisites, you are ready to go play!

```sh
cd playground
./wingc examples/test.w
```

> The `playground/wingc` script above will take care of building teh compiler and installing the SDK in the playground. It will compile and executes the preflight code of the program.

## Compiler

The compiler code is under `wingc` and you can use standard Rust development workflows:

* `cargo build` - builds the code
* `cargo test` - runs tests

## Wing SDK

The Wing SDK is the standard library of the Wing programming language. The SDK is maintained under the [monadahq/wingsdk](https://github.com/monadahq/wingsdk) repository and released as a private npm module called [`@monadahq/wingsdk`](https://github.com/monadahq/wingsdk/packages/1519521).

The playground in this repository has a `package.json` file that simply takes a dependency on the SDK package, so running `npm install` will bring it over.

### Local SDK Development

If you wish to develop the SDK alongside the compiler, simply clone the SDK repository side-by-side with the compiler and use `npm link` in the playground:

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

Once a new version of the SDK is pushed to `main` of the `wingsdk` repository, a new release will be published.

Now, you can upgrade the SDK version of the playground using:

```sh
cd playground
npm run upgrade
```

You'll see that `package.json` and `package-lock.json` files are changed with the new version.

## License

TBD