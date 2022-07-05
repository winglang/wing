# wingii

Wing Programming Language runtime (a.k.a WING Interoperability Interface).

## Build

You need:

- A working C/C++ build environment (e.g. `gcc` or `clang`)
- CMake installed on PATH

And then run `npm install` to build. `npm run cmake:*` for individual targets.

## Usage

After building, link with `libwingii.so` and use the `wingii.h` header.

## Tests

Tests are executed with `npm run test`. Catch++ is used for native unit tests.

## Mission

The `wingii` runtime's mission is to allow the Wing compiler (`wingc`), execute
its intermediate format and produce the final result **files**.

`wingii` is not a normal runtime, as in it does not end at supporting a single
language. `wingii` is a runtime that can be used to execute multiple languages
on multiple platforms at the same time, so `wingc` can focus on what it does
best, which is producing a usable, synthesizeable `constructs` tree for the
target language of JSII, at user's choice.

Currently `wingii` executes arbitrary JavaScript, aimed at supporting all of
what's needed in Node to get packages such as CDK or Projen to work correctly.

`wingii` reserves the right to change its execution environment and/or its
intermediate format at any time. The intermediate format is not to be considered
a publicly facing layer of the runtime.

The intermediate format is intended to be used by the compiler, and is privately
negotiated with the runtime at preflight time.

## Execution Environment Support

The `wingii` runtime currently supports the following matrix:

| JSII Language       |  Linux  | Windows |  MacOS  | WebAssembly |
| :------------------ | :-----: | :-----: | :-----: | :---------: |
| JavaScript          | &#9745; | &#9744; | &#9744; |   &#9744;   |
| TypeScript          | &#9745; | &#9744; | &#9744; |   &#9744;   |
| Python <sup>1</sup> | &#9744; | &#9744; | &#9744; |   &#9744;   |
| Go <sup>2</sup>     | &#9744; | &#9744; | &#9744; |   &#9744;   |
| C# <sup>3</sup>     | &#9744; | &#9744; | &#9744; |   &#9744;   |
| Java <sup>4</sup>   | &#9744; | &#9744; | &#9744; |   &#9744;   |
| Ruby <sup>5</sup>   | &#9744; | &#9744; | &#9744; |   &#9744;   |

Embedded support is planned with:

<br /><sup>1</sup> Python with [Pyodide](https://pyodide.org)
<br /><sup>2</sup> Go with [TinyGo](https://tinygo.org)
<br /><sup>3</sup> C# with [Mono](https://www.mono-project.com)
<br /><sup>4</sup> Java with [OpenJDK](https://github.com/openjdk/jdk)
<br /><sup>5</sup> Ruby with [Ruby.wasm](https://github.com/ruby/ruby.wasm)
