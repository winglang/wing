# Wing Rosetta Runtime (`wingrr`)

An embedded runtime designed to execute all JSII languages in one place.

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

| JSII Language           |  Linux  | Windows |  MacOS  | WebAssembly |
| :---------------------- | :-----: | :-----: | :-----: | :---------: |
| JavaScript <sup>0</sup> | &#9745; | &#9744; | &#9744; |   &#9744;   |
| TypeScript <sup>0</sup> | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Python <sup>1</sup>     | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Go <sup>2</sup>         | &#9745; | &#9744; | &#9744; |   &#9744;   |
| C# <sup>3</sup>         | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Ruby <sup>4</sup>       | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Java <sup>5</sup>       | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Lua <sup>6</sup>        | &#9745; | &#9744; | &#9744; |   &#9744;   |

## Build

You need:

- A working Rust build environment:
  - _Ubuntu_: [`curl -sSf https://sh.rustup.rs | sh`](https://rustup.rs/)
- A working C/C++ build environment (e.g. `gcc` or `clang`):
  - _Ubuntu_: `sudo apt install python3 g++ make python3-pip build-essential`
  - _MacOS_: `brew install llvm`
- CMake installed on PATH and other common config tools:
  - _Ubuntu_: `sudo apt install cmake autoconf automake libtool pkg-config`
  - _MacOS_: `brew install cmake`
- Required for C# engine: a working Mono 2.2+ installation
  - _Ubuntu_: [`sudo apt install mono-complete`](https://www.mono-project.com/)
- Required for Go engine: a working Go 1.17+ installation
  - _Ubuntu_: [`g install latest`](https://github.com/stefanmaric/g)
- Required for Java engine: a working Java installation with JNI support
  - _Ubuntu_: `sudo apt install openjdk-11-jdk`
- Required for Python engine: a working Python3 dev installation
  - _Ubuntu_: `sudo apt install python3-dev`
- Required for Ruby engine: a working Ruby dev installation
  - _Ubuntu_: `sudo apt install ruby-dev`
- Required for Lua engine: a working Lua dev installation
  - _Ubuntu_: `sudo apt install libluajit-5.1-dev`

And then run `npm install` to build.

Final artifact is `wingrr.tar.gz` in your build directory.

## Architecture

Rosetta runtime is built on two major components:

1. `Engines`: offer a REPL like engine for a specific language.
1. `Bridges`: optional bridge between an Engine and its underlying language.

The hierarchy of consumption looks like this:

`wingrr.cc < Engine < [ Bridge ]`

To add a new language, you would want to follow the same pattern established in
the repository. Identify the most commonly used file extension for the language.
Let's say the extension is `xy` and the Language name is `XYLang`. Following the
convention, you would create the following files:

```text
src/engines/xy/libwrr-xylang.cc
src/engines/xy/libwrr-xylang.hh
```

And optionally create the following files if your language needs a bridge:

```text
src/bridges/xy/xylang_bridge.cc
src/bridges/xy/xylang_bridge.hh
```

And finally, add your implementation to the following files:

```text
CMakeLists.txt
src/wingrr.cc
```

## Usage

After building, link with `libwingrr.so` and use the `wingrr.h` header.

## Tests

A test CLI-like utility of the same name (wingrr) will be available in your
build folder. This utility can be used to quickly identify correct execution of
various languages supported without the need of another application.

Make sure your `cwd` is the directory of this file. Temporarily run tests with:

- JavaScript: `./build/wingrr tests/main.js ./`
- TypeScript: `./build/wingrr tests/main.ts ./`
- Python3: `./build/wingrr tests/hello.py ./`
- CSharp: `./build/wingrr tests/hello.cs ./`
- Java: `./build/wingrr tests/hello.java ./`
- Ruby: `./build/wingrr tests/hello.rb ./`
- Lua: `./build/wingrr tests/hello.lua ./`
- Go: `./build/wingrr tests/hello.go ./`

Also accessible with `npm test` from the directory of this file.

Rust crate is tested with its own toolchain (`cargo`) and is executed by `npm`;

To run all tests correctly, you need to have two environment variables set:

1. `WINGRR_ROOT`: FULL path to where your build directory is (usually `./build`)
1. `LD_LIBRARY_PATH`: Add `WINGRR_ROOT` to your `LD_LIBRARY_PATH` for `cargo`

<hr />

Language support is offered with:

<sup>0</sup> [Java/Type]Script with [N-API](https://nodejs.org/api)<br />
<sup>1</sup> Python with [pybind11](https://github.com/pybind/pybind11)<br />
<sup>2</sup> Go with [Yaegi](https://github.com/traefik/yaegi)<br />
<sup>3</sup> C# with [Mono](https://www.mono-project.com)<br />
<sup>4</sup> Ruby with [Ruby VM](https://github.com/ruby/ruby)<br />
<sup>5</sup> Java with [JNI+JShell](https://docs.oracle.com/javase/9/jshell)
<br /><sup>6</sup> Lua with [sol3](https://github.com/ThePhD/sol2)
