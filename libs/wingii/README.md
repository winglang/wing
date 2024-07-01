## wingii

Wing Interoperability Interface with the outside world.

This crate generates typed Rust structs from the latest version JSII JsonSchema
specification. It then aims to offer API to interact with JSII modules outside
of Wing compiler's reach. Currently it's basic JSII reflection only.

## build

```sh
cargo build --release
```

## test

```sh
cargo test
```

## usage

Surface level Reflection API TBD (currently, see tests for usage).

## debug

Project is set up to be debuggable interactively in vscode. You'll need to have
the CodeLLDB extension installed:
<https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb>.

Once installed, you can debug the project by pressing F5. You'll need to have a
working LLDB installation as well. The extension should guide you through setup
of your environment.

Put a breakpoint in any of the tests and run the debugger.

## license

Licensed under the MIT license.
