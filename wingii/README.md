# wingii

Wing Programming Language runtime (a.k.a WING Interoperability Interface).

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

| JSII Language | Linux | Windows | MacOS | WebAssembly |
| :------------ | :---: | :-----: | :---: | :---------: |
| JavaScript    |  [x]  |    -    |   -   |      -      |
| TypeScript    |  [x]  |    -    |   -   |      -      |
| Python ^1^    |   -   |    -    |   -   |      -      |
| Go ^2^        |   -   |    -    |   -   |      -      |
| C# ^3^        |   -   |    -    |   -   |      -      |
| Java ^4^      |   -   |    -    |   -   |      -      |
| Ruby ^5^      |   -   |    -    |   -   |      -      |

Embedded support is planned with:

- ^1^: Python with [Pyodide](https://pyodide.org)
- ^2^: Go with [TinyGo](https://tinygo.org)
- ^3^: C# with [Mono](https://www.mono-project.com)
- ^4^: Java with [OpenJDK](https://github.com/openjdk/jdk)
- ^5^: Ruby with [Ruby.wasm](https://github.com/ruby/ruby.wasm)
