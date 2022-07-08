# wingpf

Wing Preflight Runtime.

## Build

You need:

- A working C/C++ build environment (e.g. `gcc` or `clang`):
  - _Debian_: `sudo apt install python3 g++ make python3-pip build-essential`
  - _MacOS_: `brew install llvm`
- CMake installed on PATH and other config tools:
  - _Debian_: `sudo apt install cmake autoconf automake libtool pkg-config`
  - _MacOS_: `brew install cmake`
- Optional for C# engine: a working Mono installation
  - _Debian_: [`sudo apt install
    mono-complete`](https://www.mono-project.com/download/stable/)
- Optional for Go engine: a working Go installation
  - _Debian_: [`g install latest`](https://github.com/stefanmaric/g)

And then run `npm install` to build. `npm run cmake:*` for individual targets.

## Usage

After building, link with `libwingpf.so` and use the `wingpf.h` header.

## Tests

Tests are executed with `npm run test`. Catch++ is used for native unit tests.

Temporarily run tests with: `./build/wingpf-cli tests/main.js .` while being in
the directory of this file.

## Mission

The `wingpf` runtime's mission is to allow the Wing compiler (`wingc`), execute
its intermediate format and produce the final result **files**.

`wingpf` is not a normal runtime, as in it does not end at supporting a single
language. `wingpf` is a runtime that can be used to execute multiple languages
on multiple platforms at the same time, so `wingc` can focus on what it does
best, which is producing a usable, synthesizeable `constructs` tree for the
target language of JSII, at user's choice.

Currently `wingpf` executes arbitrary JavaScript, aimed at supporting all of
what's needed in Node to get packages such as CDK or Projen to work correctly.

`wingpf` reserves the right to change its execution environment and/or its
intermediate format at any time. The intermediate format is not to be considered
a publicly facing layer of the runtime.

The intermediate format is intended to be used by the compiler, and is privately
negotiated with the runtime at preflight time.

## Execution Environment Support

The `wingpf` runtime currently supports the following matrix:

| JSII Language       |  Linux  | Windows |  MacOS  | WebAssembly |
| :------------------ | :-----: | :-----: | :-----: | :---------: |
| JavaScript          | &#9745; | &#9744; | &#9744; |   &#9744;   |
| TypeScript          | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Python <sup>1</sup> | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Go <sup>2</sup>     | &#9745; | &#9744; | &#9744; |   &#9744;   |
| C# <sup>3</sup>     | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Ruby <sup>4</sup>   | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Java <sup>5</sup>   | &#9744; | &#9744; | &#9744; |   &#9744;   |

Embedded support is _offered_ with:

<br /><sup>1</sup> Python with [Pyodide](https://pyodide.org)
<br /><sup>2</sup> Go with [TinyGo](https://tinygo.org)
<br /><sup>3</sup> C# with [Mono](https://www.mono-project.com)
<br /><sup>4</sup> Ruby with [Ruby.wasm](https://github.com/ruby/ruby.wasm)

Embedded support is _planned_ with:

<br /><sup>5</sup> Java with [OpenJDK](https://github.com/openjdk/jdk)
