# Bring TypeScript

- **Author(s):**: @eladb
- **Submission Date**: {2023-01-03}
- **Stage**: Draft

**Goal**: allow developers to use any TypeScript library in their Wing applications.

## Feature Spec

Wing has great interoperability with the TypeScript ecosystem. You can bring any TypeScript library
and use it Wing.

### ts2wing

In order to use a TypeScript library, we will use the `ts2wing` command to create a Wing Library
(`.wlib`) from it.

Install `ts2wing` on your system (maybe in the future it will be included in the wing toolchain):

```sh
$ npm i @winglang/ts2wing
$ ts2wing --version
0.1.2
```

Let's say I want to use the [colors](https://www.npmjs.com/package/colors) library, first, let's
import it using the `ts2wing` command:

```sh
$ ts2wing colors
Installing colors@1.4.0 from npm and all dependencies into vendor/colors.wlib.src...
Processing type definitions (index.d.ts)...
Generating Wing wrapper classes...
Compiling with JSII...
Generating API.md...
Packaging Wing Library to vendor/colors.wlib
Cleaning vendor/colors.wlib.src
```

### The .wlib File

This command created a Wing Library file under `vendor/colors.wlib`.

> A `.wlib` file it a self-contained artifact that represents a reusable library in Wing. It
> includes all the dependencies needed by the library (vendored in). (see note below about future
> support for [public dependencies](#public-dependencies-are-not-supported)).

Let's take a look at the API of our new library:

```sh
$ wing docs colors
Opening browser...
```

This will open your browser with the generated API documentation for the generated library. Cute,
ha?

### Consuming the library

OK, let's use this library in our Wing code.

```js
bring colors;

print("${colors.Global.green("hello")}, ${colors.Colors.blue("world")}!")
```

As you can see, since Wing doesn't support global functions, the `Global` wrapper class was
generated and includes a static method for each public API exported from `colors`.

Similarly to turning global functions to static methods, `ts2wing` applies other heuristics to
create an [adaptation layer](#type-system-adapters) between the type systems.

### Escape hatch

As you might have expected, there could be cases where `ts2wing` won't be able to create an adapter
for a certain TypeScript library. It will take us time to establish all the patterns and in parallel
evolve the Wing type system.

If you run `ts2wing` with the switch `--unpacked` like so:

```sh
$ ts2wing edit colors
OK, "colors" is ready to be edited under "vendor/colors.wlib.src".
After you are done, make sure to run: ts2wing colors
```

Now, go ahead and make any modifications you like to `vendor/colors.wlib.src` and after
you are finished, run:

```sh
$ ts2wing colors
Found vendor/colors.wlib.src
Processing type definitions (index.d.ts)...
Generating Wing wrapper classes...
Compiling with JSII...
Generating API.md...
Packaging Wing Library to vendor/colors.wlib
Cleaning vendor/colors.wlib.src
```

This is it, now the updated `colors.wlib` will include your changes.

### Type system adapters

It is not possible to express every type in TypeScript within the Wing type system. This is because:

1. Wing is young and it will take the type system time to evolve; 
2. The design goals of Wing and TypeScript are different. TypeScript is designed to be able to
   represent every possible type that can be expressed in JavaScript, while Wing is designed to be a
   great language for cloud application programming.

#### Union Types

A good example is **type unions**. Since in JavaScript is dynamic, it is possible for a value to
have multiple possible types. In TypeScript this is expressed through unions.

Let's take an example:

```ts
declare class Foo {
  constructor(value: string | number);
  bar():  string[] | string | false;
}
```

The constructor of `Foo` accepts a single argument that can be either a `string` or a `number`.

This is all nice, but at the moment we believe that supporting type unions is not really required
for building great cloud applications. In fact, we think that type unions are a potential source of
bugs and complexity, and we want Wing to be easy to learn and use and scale across large teams in
big companies. To that end, we don't support type unions (and we reserve the right to change our
minds).

To bridge this gap, the `ts2wing` tool will generate a "union-like class" in for each type union in
the imported library. The class will have a set of static factory methods, one for each type in the
union:

```ts
declare class FooInitValue {
  static fromStr(value: str): FooInitValue;
  static fromNum(value: num): FooInitValue;
}

declare class FooBarResult {
  asBool(): boolean;
  isBool(): boolean;

  asMutArrayStr(): string[];
  isMutArrayStr(): boolean;

  isString(): boolean;
  asString(): string;
}

declare class Foo {
  constructor(value: FooInitValue);
  bar(): FooBarResult;
}
```

Wing users will be able to use it like so:

```js
let value = FooInitValue.fromStr("hello");
let foo = new Foo(value);
```

The `FooBarResult` class is a return value, and as you can see it includes a bunch of methods that
can be used to determine the return type such as `isBool()` and then to reference it.

We actually have some [initial thoughts](https://github.com/winglang/wing/issues/977) on adding
language support for this pattern in Wing, which means that we will be able to offer a better
experience for this adapter type over time.

### Intersection Types

Intersection interfaces can be converted to `extends`:

TypeScript input:

```ts
interface Bar {
  hello: string;
}

interface Baz {
  world: number;
}

type Foo = Bar & Baz;
```

`ts2wing` output:

```ts
interface Bar {
  hello: string;
}

interface Baz {
  world: number;
}

interface Foo extends Bar, Baz {

}
```

TODO:

* Type Aliases (use the aliased type instead?)
* Promises?

### Free-standing functions (global functions)

TypeScript input:

```ts
declare function foo(): void;
```

`ts2wing` output:

```ts
declare class Globals {
  static foo(): void;
}
```

### Generics

TBD - need additional research

### Limitations

#### Public dependencies are not supported

Since we want to bundle all the dependencies of a library into a `.wlib`, it is not possible to
export APIs from the library that uses types from other libraries. This is actually not very common
in the JavaScript ecosystem (most library APIs just use standard types). To solve this, we need to
the dependent library to also be "winfigied". This is possible, but for now, I think we can just
fail if a library tries to export APIs that use types from a dependency. This is in a sense the
difference between "public dependencies" and "private dependencies" and we need to model that well
in order to avoid some horrible fitfalls that TypeScript fell into (e.g. it is impossible to use
`instanceof`). Ask me and I'll tell you some war stories about this from the CDK (one of the primary
motivations for releasing CDK v2).