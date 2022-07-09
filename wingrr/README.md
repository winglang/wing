# Wing Rosetta Runtime (`wingrr`)

An embedded runtime designed to execute all JSII languages in one place.

## Build

You need:

- A working C/C++ build environment (e.g. `gcc` or `clang`):
  - _Debian_: `sudo apt install python3 g++ make python3-pip build-essential`
  - _MacOS_: `brew install llvm`
- CMake installed on PATH and other config tools:
  - _Debian_: `sudo apt install cmake autoconf automake libtool pkg-config`
  - _MacOS_: `brew install cmake`
- Required for C# engine: a working Mono installation
  - _Debian_: [`sudo apt install mono-complete`](https://www.mono-project.com/)
- Required for Go engine: a working Go installation
  - _Debian_: [`g install latest`](https://github.com/stefanmaric/g)
- Required for Java engine: a working Java installation
  - _Debian_: `sudo apt install openjdk-11-jdk`

And then run `npm install` to build. `npm run cmake:*` for individual targets.

## Usage

After building, link with `libwingrr.so` and use the `wingrr.h` header.

## Tests

Temporarily run tests with: `./build/wingrr-cli tests/main.js .` while being in
the directory of this file.

## Mission

The `wingrr` runtime's mission is to allow the Wing compiler (`wingc`), execute
its intermediate format and produce the final result **files**.

`wingrr` is not a normal runtime, as in it does not end at supporting a single
language. `wingrr` is a runtime that can be used to execute multiple languages
on multiple platforms, at the same time, so `wingc` can focus on what it does
best, which is producing a usable, synthesizeable `constructs` tree for the
target language of JSII, at user's choice.

## Execution Environment Support

The `wingrr` runtime currently supports the following matrix:

| JSII Language       |  Linux  | Windows |  MacOS  | WebAssembly |
| :------------------ | :-----: | :-----: | :-----: | :---------: |
| JavaScript          | &#9745; | &#9744; | &#9744; |   &#9744;   |
| TypeScript          | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Python <sup>1</sup> | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Go <sup>2</sup>     | &#9745; | &#9744; | &#9744; |   &#9744;   |
| C# <sup>3</sup>     | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Ruby <sup>4</sup>   | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Java <sup>5</sup>   | &#9745; | &#9744; | &#9744; |   &#9744;   |

Embedded support is _offered_ with:

<sup>1</sup> Python with [Pyodide](https://pyodide.org)<br />
<sup>2</sup> Go with [Yaegi](https://github.com/traefik/yaegi)<br />
<sup>3</sup> C# with [Mono](https://www.mono-project.com)<br />
<sup>4</sup> Ruby with [Ruby.wasm](https://github.com/ruby/ruby.wasm)<br />
<sup>5</sup> Java with [JNI+JShell](https://docs.oracle.com/javase/9/jshell)
