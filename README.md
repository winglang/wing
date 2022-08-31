# Wing Language Reference

- [1. General](#1-general)
  - [1.1 Types](#11-types)
    - [1.1.1 Primitive Types](#111-primitive-types)
    - [1.1.2 Container Types](#112-container-types)
    - [1.1.3 Function Types](#113-function-types)
  - [1.2 Debugging Utilities](#12-debugging-utilities)
  - [1.3 Phase Modifiers](#13-phase-modifiers)
  - [1.4 Storage Modifiers](#14-storage-modifiers)
  - [1.5 Access Modifiers](#15-access-modifiers)
  - [1.6 Mutability](#16-mutability)
  - [1.7 Optionality](#17-optionality)
  - [1.8 Type Inference](#18-type-inference)
  - [1.9 Error Handling](#19-error-handling)
  - [1.10 Formatting](#110-formatting)
  - [1.11 Memory Management](#111-memory-management)
  - [1.12 Documentation Style](#112-documentation-style)
  - [1.13 Execution Model](#113-execution-model)
- [2. Expressions](#2-expressions)
  - [2.1 bring expression](#21-bring-expression)
  - [2.2 break expression](#22-break-expression)
  - [2.3 continue expression](#23-continue-expression)
  - [2.4 return expression](#24-return-expression)
  - [2.5 await Expression](#25-await-expression)
- [3. Statements](#3-statements)
  - [3.1 if statement](#31-if-statement)
  - [3.2 for statement](#32-for-statement)
  - [3.3 while statement](#33-while-statement)
- [4. Declarations](#4-declarations)
  - [4.1 Structs](#41-structs)
  - [4.2 Classes](#42-classes)
  - [4.3 Resources](#43-resources)
  - [4.4 Interfaces](#44-interfaces)
  - [4.5 Variables](#45-variables)
  - [4.6 Functions](#46-functions)
    - [4.6.1 Free Functions](#461-free-functions)
    - [4.6.2 Closures](#462-closures)
    - [4.6.3 Promises](#463-promises)
  - [4.7 Arrays](#47-arrays)
  - [4.8 Enumeration](#48-enumeration)
- [5. Module System](#5-module-system)
  - [5.1 Imports](#51-imports)
    - [5.1.1 Verbose Notation](#511-verbose-notation)
    - [5.1.2 Shorthand Notation](#512-shorthand-notation)
  - [5.2 Exports](#52-exports)
- [6. Dependency Injection](#6-dependency-injection)
  - [6.1 Pure Resources](#61-pure-resources)
  - [6.2 Symbol Resolution](#62-symbol-resolution)
- [7. Miscellaneous](#7-miscellaneous)
  - [7.1 Strings](#71-strings)
    - [7.1.1 Normal strings "..."](#711-normal-strings-)
    - [7.1.2 Shell strings \`...\`](#712-shell-strings-)
  - [7.2 Comments](#72-comments)
  - [7.3 Operators](#73-operators)
    - [7.3.1 Relational Operators](#731-relational-operators)
    - [7.3.2 Logical Operators](#732-logical-operators)
    - [7.3.3 Bitwise Operators](#733-bitwise-operators)
    - [7.3.4 Mathematics Operators](#734-mathematics-operators)
    - [7.3.5 Operator Precedence](#735-operator-precedence)
    - [7.3.6 Short Circuiting](#736-short-circuiting)
    - [7.3.7 Equality](#737-equality)
  - [7.4 Kitchen Sink](#74-kitchen-sink)
  - [7.5 Credits](#75-credits)

## 1. General

### 1.1 Types

#### 1.1.1 Primitive Types

| Name   | Extra information                         |
| ------ | ----------------------------------------- |
| `nil`  | represents the absence of a value or type |
| `any`  | represents everything and anything        |
| `num`  | represents numbers (doubles)              |
| `str`  | UTF-16 encoded strings                    |
| `bool` | represents true or false                  |

User defined explicit "any" is supported if declared by the user.  
Implicit "any" resolved by the compiler is a compile error.

> ```TS
> // Wing Code:
> let x = 1;                  // x is a num
> let v = 23.6;               // v is a num
> let y = "Hello";            // y is a str
> let z = true;               // z is a boolean
> let w: any = 1;             // w is an any
> let q: num? = nil;          // q is an optional num
> ```
>
> ```TS
> // Equivalent TypeScript Code:
> const x: number = 1;
> const v: number = 23.6;
> const y: string = "Hello";
> const z: boolean = true;
> const w: any = 1;
> const q: number? = undefined;
> ```

[`▲ top`][top]

---

#### 1.1.2 Container Types

| Name         | Extra information                     |
| ------------ | ------------------------------------- |
| `set<T>`     | set type (array of unique items)      |
| `map<T>`     | map type (key-value with string keys) |
| `array<T>`   | variable size array of a certain type |
| `promise<T>` | promises type (async code)            |

> ```TS
> // Wing Code:
> let z = {1, 2, 3};          // immutable set
> let zm = new set<num>();    // mutable set
> let y = {"a": 1, "b": 2};   // immutable map
> let ym = new map<num>();    // mutable map
> let x = [1, 2, 3];          // immutable array
> let xm = new array<num>();  // mutable array
> let w = new SampleClass();  // mutable class instance
> ```
>
> ```TS
> // Equivalent TypeScript Code:
> const z: Set<number> = Object.freeze(new Set([1, 2, 3]));
> const zm: Set<number> = new Set();
> const y: Map<string, number> = Object.freeze(new Map([["a", 1], ["b", 2]]));
> const ym: Map<string, number> = new Map();
> const x: number[] = Object.freeze([1, 2, 3]);
> const xm: number[] = [];
> const w: SampleClass = new SampleClass();
> ```

[`▲ top`][top]

---

#### 1.1.3 Function Types

Function type annotations are written as if they were closure declarations, with
the difference that body is replaced with return type annotation. Phase of the
function is determined with `=>` or `~>` operators. Latter being inflight.

```pre
(argName1: <argType1>, argName2: <argType2>, ...) => <returnType>
```

> ```TS
> // Wing Code:
> // type annotation in wing: (num) => num
> let f1 = (x: num): num => { return x + 1; };
> // type annotation in wing: (num, str) ~> nil
> let f2 = (x: num, s: str) ~> { /* no-op */ };
> ```
> 
> ```TS
> // Equivalent TypeScript Code:
> const f1 = Object.freeze((x: number): number => { return x + 1; });
> const f2 = Object.freeze((x: number, s: string): undefined => { });
> ```


[`▲ top`][top]

---

### 1.2 Debugging Utilities

| Name     | Extra information                                        |
| -------- | -------------------------------------------------------- |
| `print`  | prints anything serializable.                            |
| `panic`  | exits with a serializable, dumps the trace + a core dump |
| `assert` | checks a condition and _panics_ if evaluated to false    |

Wing is a statically typed language, so attempting to redefine any of the above
functions, just like any other "symbol" will result in a compile-time error.  
Above functions are accept variadic arguments of any type.

"panic" is a fatal call by design. If intention is error handling, panic is the
last resort. Exceptions are non fatal and should be used instead for effectively
communicating errors to the user.

> ```TS
> // Wing Code:
> print(23, "Hello", true);
> panic("Something went wrong", [1,2]);
> assert(x > 0, x < 10);
> ```
>
> ```TS
> // Equivalent TypeScript Code:
> console.log(23, "Hello", true);
> // calling panic in wing is fatal
> (() => {
>   console.error("Something went wrong", [1,2]);
>   // generate core dump
>   // show stack trace
>   process.exit(1);
> })();
> // multiple assertions
> (() => { assert.ok(x > 0); assert.ok(x < 10); })();
> ```

[`▲ top`][top]

---

### 1.3 Phase Modifiers

In Wing, we differentiate between code that executes during compilation and code
that executes after the application has been deployed by referring to them as
**preflight** and **inflight** code respectively.

The default (and implicit) execution context in Wing is preflight. This is
because in cloud applications, the entrypoint is definition of the app's cloud
infrastructure (and not the code that runs within a specific machine within this
system).

| Name        | Extra information                          |
| ----------- | ------------------------------------------ |
| `preflight` | phase is in preflight, keyword is optional |
| `inflight`  | phase is in inflight, keyword is mandatory |

Multiple phase modifiers are invalid and forbidden.  
Phase modifier is allowed in the context of defining interfaces, and resources.
Example code is shown in the [resources](#44-resources) section.

In Wing, language features are designed to help the programmer in both writing
compute code and orchestration of cloud appliances. As a result, most features
are considered "compute" and is inflight/preflight independent. This includes
all features that are commonly found in other general purpose languages.  
Classes, primitives, structs, and closures are all compute.

Resources on the other hand are designed to bridge the gap between the compute
code and the infrastructure orchestration. What can pass through this "bridge"
are interfaces and immutable data structures. Learn more about resources and how
immutable data helps bridging the gap in their respective sections.

As a result, resources are sensitive to being preflight and inflight, since they
do not perform pure "compute". Their computation is target dependent and is only
resolved at compile time.

[`▲ top`][top]

---

### 1.4 Storage Modifiers

A storage modifier is a keyword that specifies the placement of a function or
variable in the program memory once compiled. Some declarations might have a
temporary storage (such as a local closure definition), while others might have
a permanent storage (such as a global variable).

Currently the only storage modifier is `static`. `static` indicates a definition
is only available once per program and for the entire duration of that program.
All statics must be defined inline and initialized right away.  
Statics are not allowed on structs or interfaces.

Statics are both supported in inflight as well as preflight mode of execution.

A declaration for a static member is a member declaration whose declaration
specifiers contain the keyword static. The keyword static must appear before
other specifiers. More details in the [classes](#43-classes) section.

The name of any static data member and static member function must be different
from the name of the containing class regardless of the casing.

Code samples for `static` are not shown here. They are shown in the relevant
sections below.

To avoid confusion, it is invalid to have a static and a non-static with the
same name. Overloading a static is allowed however.  
Accessing static is done via the type name and the `.` operator.

[`▲ top`][top]

---

### 1.5 Access Modifiers

Visibility inference is done with the following rules:

- if symbols' name starts with an underscore, visibility is `private`.
- if symbols' name does not start with an underscore and lacks any other access
  modifier, its visibility is `public`.
- `protected`: visibility is "protected" (public to self and derived classes).
- `internal`: visibility is "internal" (public to current compilation unit).

Accessing field, member, or structured data is done with `.`.  

Visibility modifiers can be applied to members of classes and resources.  
Mixing `_` convention with `protected` and `internal` is not allowed.  
Mixing `protected` and `internal` is not allowed.

[`▲ top`][top]

---

### 1.6 Mutability

In Wing we have two classes of "data": immutable and mutable.

Immutable data is data that is capture-able from preflight safely into inflight.
All primitive types are immutable (`bool`, `str`, `num`, and `nil`).  
Resources are also immutable by design and can be captured into inflight.  
Container types and structs of primitive types and resources are also immutable.

Optionality modifier `?` applied to any type does not change the mutability of
the underlying type. Read more about optionality in its section below.

Re-assignment to variables that are defined with `let` is not allowed in Wing.
Re-assignment to class fields is allowed if field is accessed through the "this"
keyword in class method definitions and it's marked with `mut`. Examples in the
class section below.

`mut` is available in the body of class and struct declarations.  
Assigning `mut` to immutables of the same type is allowed.

As a result of classes being able to represent mutable data, it is impossible to
capture them into inflight. Classes remain a pure compute feature in Wing.  
If a struct contains `mut` keyword or other classes, or other structs containing
the former, the struct becomes immutable and cannot be captured. This includes
container types of mutable data as well.

[`▲ top`][top]

---

### 1.7 Optionality

Symbol `?` can mark a type as optional.  
Optionality means the value behind type can be either present or nil.

Rules of optionality apply to the entire new container type of `type?` and not
the value behind it (`type`).  

Using the `??` operator allows one to safely access the value behind an optional
variable by always providing a default, in case the variable is nil. This forces
a value to be present for the l-value (left hand side of the assignment operator
and guarantees what's returned is type-stripped from its `?` keyword).

> ```TS
> // Wing Code:
> let x? = 44;
> let y = x ?? 55;
> ```
>
> ```TS
> // Equivalent TypeScript Code:
> const x: number? = 44;
> const y: number = x ?? 55;
> ```

[`▲ top`][top]

---

### 1.8 Type Inference

Type can optionally be put between name and the equal sign, using a colon.  
Partial type inference is allowed while using the `?` keyword immediately after
the variable name.

When type annotation is missing, type will be inferred from r-value type.  
r-value refers to the right hand side of an assignment here.

All defined symbols are immutable (constant) by default.  
Type casting is generally not allowed unless otherwise specified.

Function arguments and their return type is always required. Function argument
type is inferred iff a default value is provided.

> ```TS
> // Wing Code:
> let i = 5;
> let m = i;
> let arr_opt? = new array<number>();
> let arr: array<number> = [];
> let copy = arr;
> let i1? = nil;
> let i2: number? = i;
> ```
>
> ```TS
> // Equivalent TypeScript Code:
> const i: number = 5;
> const m: number = i;
> const arr_opt: number[]? = [];
> const arr: number[] = Object.freeze([]);
> const copy: number[] = Object.freeze([...arr]);
> const i1: any = undefined;
> const i2: number? = i;
> ```

[`▲ top`][top]

---

### 1.9 Error Handling

Exceptions and `try/catch/finally` is the error mechanism. Mechanics directly
translate to JavaScript. If exception is uncaught, it crashes your app with a
`panic` call. You can create a new exception with `throw`.

In the presence of `try`, `catch` is required but `finally` is optional.

`panic` is meant to be fatal error handling.  
`throw` is meant to be recoverable error handling.

An uncaught exception is considered user error but a panic call is not. Compiler
must guarantee exception safety by throwing a compile error if an exception is
expected from a call and it is not being caught.

> ```TS
> // Wing Code:
> try {
>   let x? = 1;
>   throw("hello exception");
> } catch e {
>   print(e);
> } finally {
>   print("done);
> }
> ```
>
> ```TS
> // Equivalent TypeScript Code:
> try {
>   let x: number? = 1;
>   throw new Error("hello exception");
> } catch (e) {
>   console.log(e);
> } finally {
>   console.log("done");
> }
> ```

[`▲ top`][top]

---

### 1.10 Formatting

Wing is opinionated about formatting and whitespace. The opinion is:

- indentations of lines are 2 spaces
- each statement must end with a semicolon
- interface names start with capital letter "I"
- enum members must be written in ALL_CAPS_SNAKE_CASE
- class, struct, interface, and resource names must be TitleCased
- every other declaration name must be snake_cased unless otherwise specified
- open curly brace must be at the same line of any declaration that requires it

If you are reading this section as a user and you are caught off guard by this
section, the philosophy behind this section is to end all unnecessary formatting
debates and instead make developers focus on writing the logic of their code.

We, as in Wing developers, find ourselves constantly applying this formatting to
languages that are not even opinionated about it. Therefore, we seize the moment
to make sure Wing code looks and feels uniform across the board.

Formatting is enforced by the compiler, however this is not enforced IFF it
occurs in a non entrypoint `.w` file AND the offending code is a direct import
and usage of a JSII module. This is to ensure isolated compatibility with third
party JSII modules. Users cannot explicitly turn formatting off. Compiler must
emit warnings for all implicit JSII formatting violations.

[`▲ top`][top]

---

### 1.11 Memory Management

There is no implicit memory de-allocation function, dynamic memory is managed by
Wing and is garbage collected (relying on JSII target GC for the meantime).

[`▲ top`][top]

---

### 1.12 Documentation Style

> ```TS
> /*\
> |*|  Document your code with meaningful comments.
> |*|
> |*|  You can use Markdown for formatting.
> |*|  Compiler can generate documentation for you from markdowns.
> \*/
> ```

[`▲ top`][top]

---

### 1.13 Execution Model

Execution model currently is delegated to the JSII target. This means if you are
targeting JSII with Node, Wing will use the event based IO that Node offers.

Program entrypoint in Wing is not like a typical entrypoint in other programs.
Rather it is an orchestration "manifest". This orchestration manifest contains
pure compute instruction acting on mostly immutable data.

Some of these instructions are executed in preflight and some are inflight.

Entrypoint is always a wing source with an extension of `.w`. Within this entry
point, a root resource is made available for all subsequent resources that are
initialized with the `def` keyword. Type of the root resource is determined by
the target being used by the compiler. The root resource might be of type `App`
in AWS CDK or `TerraformApp` in case of CDK for Terraform target.

[`▲ top`][top]

---

## 2. Expressions

### 2.1 bring expression

"bring" expression can be used to import and reuse code from other Wing files or
other JSII supported languages. The expression is detailed in its own section in
this document: [Module System](#5-module-system).

[`▲ top`][top]

---

### 2.2 break expression

**break** expression allows to end execution of a cycle. This includes for and
while loops currently.

> ```TS
> // Wing Code:
> for let i in 1..10 {
>   if i > 5 {
>     break;
>   }
>   print(i);
> }
> ```
>
> ```TS
> // Equivalent TypeScript Code:
> for (let i = 1; i < 10; i++) {
>   if (i > 5) {
>     break;
>   }
>   console.log(i);
> }
> ```

[`▲ top`][top]

---

### 2.3 continue expression

**continue** expression allows to skip to the next iteration of a cycle. This
includes for and while loops currently.

> ```TS
> // Wing Code:
> for let i in 1..10 {
>   if i > 5 {
>     continue;
>   }
>   print(i);
> }
> ```
>   
> ```TS
> // Equivalent TypeScript Code:
> for (let i = 1; i < 10; i++) {
>   if (i > 5) {
>     continue;
>   }
>   console.log(i);
> }
> ```

[`▲ top`][top]

---

### 2.4 return expression

**return** expression allows to return a value or exit from a called context.  
In case of a missing "return" statement in a method definition, the method will
return `nil` implicitly and inherently its return type becomes also `nil` if no
other type annotation with `?` is provided.

> ```TS
> // Wing Code:
> class MyClass {
>   myPublicMethod() {}
>   _myPrivateMethod(): nil {}
>   protected myProtectedMethod(): nil { return nil; }
>   internal myInternalMethod(): str { return "hi!"; }
> }
> ```
> 
> ```TS
> // Equivalent TypeScript Code:
> class MyClass {
>   public myPublicMethod(): void {}
>   private myPrivateMethod(): undefined {}
>   protected myProtectedMethod(): undefined { return undefined; }
>   public __wing__internal_myInternalMethod(): string { return "hi!"; }
> }
> ```

[`▲ top`][top]

---

### 2.5 await Expression

**await** expression allows to wait for a promise and grab its execution result.
"await" and "promise" are semantically similar to JavaScript's promises.  
"await" expression is only valid in async function declarations.  
awaiting non promises in Wing is a no-op just like in JavaScript.

> ```Rust
> // Wing program:
> class MyClass {
>   async foo(): number {
>     let x = await some_promise();
>     return x;
>   }
>   boo(): promise<number> {
>     let x = some_promise();
>     return x;
>   }
> }
> ```
>
> ```TS
> // Equivalent TypeScript:
> class MyClass {
>   async foo(): number {
>     let x = await some_promise();
>     return x;
>   }
>   boo(): Promise<number> {
>     let x = some_promise();
>     return x;
>   }
> }
>  ```

[`▲ top`][top]

---

## 3. Statements

### 3.1 if statement

Flow control can be done with `if/elif/else` statements.  
The `if` statement is optionally followed by `elif` and `else`.  
"If" statement condition expression in Wing is not surrounded by parenthesis.

> ```TS
> // Wing program:
> let x = 1;
> let y = "sample";
> if x == 2 {
>   print("x is 2");
> } elif y != "sample" {
>   print("y is not sample");
> } else {
>   print("x is 1 and y is sample");
> }
> ```
>
> ```TS
> // Equivalent TypeScript:
> const x: number = 1;
> const y: string = "sample";
> if (x === 2) {
>   console.log("x is 2");
> } else if (y !== "sample") {
>   console.log("y is not sample");
> } else {
>   console.log("x is 1 and y is sample");
> }
> ```

[`▲ top`][top]

---

### 3.2 for statement

`for..in` statement is used to iterate over an array or set.  
type annotation after an iteratee (left hand side of `in`) is optional.  
"For" statement condition expression in Wing is not surrounded by parenthesis.

> ```TS
> // Wing program:
> let arr = [1, 2, 3];
> let set = {1, 2, 3};
> for item in arr {
>   print(item);
> }
> for item: number in set {
>   print(item);
> }
> for item in 0..100 {
>   print(item);
> }
> ```
>
> ```TS
> // Equivalent TypeScript:
> const arr: number[] = [1, 2, 3];
> const set: Set<number> = new Set([1, 2, 3]);
> for (const item of arr) {
>   console.log(item);
> }
> for (const item of Object.freeze(Array.from(Array(100).keys()))) {
>   console.log(item);
> }
> for (const item of set) {
>   console.log(item);
> }
> ```

[`▲ top`][top]

---

### 3.3 while statement

while statement is used to execute a block of code while a condition is true.  
"While" statement condition expression in Wing is not surrounded by parenthesis.

> ```TS
> // Wing program:
> while call_some_function() {
>   print("hello");
> }
> ```
>
> ```TS
> // Equivalent TypeScript:
> while (call_some_function()) {
>   console.log("hello");
> }
> ```

[`▲ top`][top]

---

## 4. Declarations

### 4.1 Structs

Structs are loosely modeled after typed JSON literals in JavaScript.  
Structs are defined with the `struct` keyword.  
Structs are "bags" of data.

Structs can only have fields of primitive types, resources, and other structs.  
Array, set, and map of above types is also allowed in struct field definition.  
Visibility, storage and phase modifiers are not allowed in struct fields.

Structs cannot inherit from interfaces, resources or classes.  
Structs can inherit from multiple other structs.

> ```Rust
> // Wing program:
> struct MyDataModel1 {
>   field1: number;
>   field2: string;
> };
> struct MyDataModel2 {
>   field3: number;
>   field4: bool?;
> };
> struct MyDataModel3 implements MyDataModel1, MyDataModel2 {
>   field5: string;
> }
> let s1: = new MyDataModel1 { field1: 1, field2: "sample" };
> let s2: = new MyDataModel2 { field3: 1, field4: true };
> let s3: = new MyDataModel2 { field3: 1, field4: nil };
> let s4: = new MyDataModel3 {
>   field1: 12,
>   field2: "sample", 
>   field3: 11,
>   field4: false,
>   field5: "sample"
> };
> ```
>
> ```TS
> // Equivalent TypeScript:
> interface MyDataModel1 {
>   public readonly field1: number;
>   public readonly field2: string;
> }
> interface MyDataModel2 {
>   public readonly field3: number;
>   public readonly field4?: boolean;
> }
> interface MyDataModel3 extends MyDataModel1, MyDataModel2 {
>   public readonly field5: string;
>   public readonly field6: number;
> }
> const s1: MyDataModel1 = { field1: 1, field2: "sample" };
> const s2: MyDataModel2 = { field3: 1, field4: true };
> const s3: MyDataModel2 = { field3: 1, field4: undefined };
> const s4: MyDataModel3 = {
>   field1: 12,
>   field2: "sample",
>   field3: 11,
>   field4: false,
>   field5: "sample",
>   field6: 11
> };
> ```

[`▲ top`][top]

---

### 4.2 Classes

Class consists of fields and methods in any order,
The class system is single-dispatch class based object orientated system.

A class member function that has the name **new** is considered to be a class
constructor (or initializer, or allocator).

```TS
class Name extends Base
  implements MyInterface1, MyInterface2 {
  new() {
    // default constructor implementation
    // order is up to user
    this.field1 = 1;
    this.field2 = "sample";
  }

  // class fields (private by default)
  field1: number;
  field2: string;

  // private methods
  private_method(arg:type, arg:type, ...): type {
    // concrete implementation
  }
  static static_method(arg:type, arg:type, ...);
  // visible to outside the instance
  public public_method(arg:type, arg:type, ...);
  // visible to children only
  protected internal_method(type:arg, type:arg, ...) { }
  // public in current compilation unit only
  internal protect_method3(type:arg, type:arg, ...): type { }
}
```

Default initialization does not exist in Wing. All member fields must be
initialized in the constructor. Absent initialization is a compile error.

Member function and field access in constructor with the "this" keyword before
all fields are initialized is invalid and should throw a compile error.

```TS
class Foo {
  x: number;
  new() { this.x = 1; }
}
class Bar {
  y: number;
  z: Foo;
  new() {
    this.y = 1;
    this.z = new Foo();
  }
  public print() {
    print(this.y);
  }
}
let a = new Bar();
a.print(); // prints 20.
```

Overloading methods is allowed. This means functions can be overloaded with many
signatures only varying in the number of arguments and their unique type order.
Overloading the constructor is also allowed.  
Inheritance is allowed with the `extends` keyword. `super` can be used to access
the base class, immediately up the inheritance chain (parent class).

```TS
class Foo {
  x: number;
  new() { this.x = 0; }
  public method() { }
}
class Boo extends Foo {
  new() { super(); this.x = 10; }
  public override method() {
    // override implementation
  }
}
```

`extends` keyword accepts classes as its right hand side
and accepts resources iff left hand side is also a resource.

You can use the keyword `final` to stop the inheritance.

```TS
class Foo {
  x: number;
  new() { this.x = 0; }
  public method() { }
}
class Boo final extends Foo {
  new() { super(); this.x = 10; }
  public override method() {
    // override implementation
  }
}
// compile error
// class FinalBoo extends Boo {}
```

By default all methods are virtual. But if you are about to override a method,
you need to explicitly provide the keyword **override**.  
Static, private, and internal methods cannot be and are not virtual.  

Statics are not inherited.  
As a result, statics can be overridden mid hierarchy chain. Access to statics is
through the class name that originally defined it `<class name>.Foo`.  

Child class must not introduce additional signatures (overloads) for overridden
(virtual) methods.

Multiple inheritance is invalid and forbidden.  
Multiple implementations of various interfaces is allowed.  
Multiple implementations of the same interface is invalid and forbidden.

[`▲ top`][top]

---

### 4.3 Resources

Resources provide first class composite pattern support in Wing. They are
modeled and leverage the [construct programming
model](https://github.com/aws/constructs) and as such are fully interoperable
with CDK constructs.  
Resources can be defined like so:

```TS
// Wing Code:
resource Foo {
  new() { /* initialize preflight fields */ } // preflight constructor
  new~() {} // optional client initializer
  fin() {} // optional sync finalizer
  async fin() {} // async finalizer (can be either sync or async)

  // inflight members
  foo~(arg:number): number { return arg; }
  boo~(): number { return 32; }
  field1~: number;
  field2~: string;
  field3~: bool;

  // preflight members
  foo(arg:number): number { return arg; }
  boo(): number { return 32; }
  field1: number;
  field2: string;
  field3: bool;
}
```

Resources all have a scope and a unique ID. Compiler provides an implicit scope
and ID for each resource, both overrideable by user-defined ones in constructor.

The implicit scope is akin to "this" in regular CDK.  
The implicit ID is the type name of the resource combined with its occurrence in
a Wing program top down (`Bucket0`, `Bucket1`, ...). This is similar to how the
"key" of React components work in the JSX world.  
Resources instantiated at block scope level are assigned the root app construct
as their default implicit scope.

Resource instantiation syntax is as follows:

```pre
let <name>[: <type>] = <resource> [be <id>] [in <scope>];
```

```TS
// Wing Code:
let a = Foo(); // with default scope and id
let a = Foo() in scope; // with user-defined scope
let a = Foo() be "custom-id" in scope; // with user-defined scope and id
let a = Foo(...) be "custom-id" in scope; // with constructor arguments
```

"id" must be of type string. It can also be a string literal with substitution
support (normal strings as well as shell strings).  
"scope" must be a variable of resource type.

In addition to the `new` keyword for defining constructors, resources have a
unique `fin` definable method that offer async finalization of a resource in
preflight time.  
Order of execution of async finalization is not guaranteed.

Resources can be captured into inflight functions and once that happens, inside
the capture block only the inflight members are available. This new "type" is an
anonymous type, but guarantees to implement the same interface for two captures
of the same resource type in preflight. You can reference this type name with
the same type name as the resource type.

Resources can extend other resources (but not structs) and implement interfaces.
Resources can extend classes and all parent class methods are assumed preflight.

```TS
// Wing Code:
class MyResourcePreflightImplementation { /* ... */ };
interface IMyResourceInflightInterface { /* ... */ };
resource MyResource
  extends MyResourcePreflightImplementation
  implements IMyResourceInflightInterface {
    // inflight implementation
  }
```

Access to "tree" behind all resources is done with the `nodeof(resource)` call.
The tree is the constructs tree that enables composition of resources.

[`▲ top`][top]

---

### 4.4 Interfaces

Interfaces represent a contract that a class or resource must fulfill.  
Interfaces are defined with the `interface` keyword.  
Both preflight and inflight signatures are allowed.  
`implements` keyword is used to implement an interface or multiple interfaces
that are separated with commas.

All methods of an interface are public by default and cannot be of any other
type of visibility (private, protected, etc.). public keyword is compile error.

> ```TS
> // Wing program:
> interface IMyInterface1 {
>   field1: number;
>   method1(x: number): string;
> };
> interface IMyInterface2 {
>   field2~: string;
>   method2~(): string;
> };
> class MyClass implements IMyInterface1 {
>   field1: number;
>   new(x: number) {
>     // preflight constructor
>     this.field1 = x;
>   }
>   method1(x: number): string {
>     return "sample: ${x}";
>   }
> };
> resource MyResource extends MyClass
>   implements IMyInterface1, IMyInterface2 {
>   field2~: string;
>   new~() {
>     // inflight client initialization
>     this.field2~ = "sample";
>   }
>   method2~(): string {
>     return this.field2~;
>   }
> };
> ```
>
> ```TS
> // Equivalent TypeScript:
> interface MyInterface1 {
>   public readonly field1: number;
>   public method1(x: number): string;
> }
> interface MyInterface2 {
>   public readonly __inflight__field2: string;
>   public __inflight__method2(): string;
> }
> class MyClass implements MyInterface1 {
>   public readonly field1: number;
>   public constructor(x: number) {
>     // preflight constructor
>     Object.assign(this, { field1: x });
>   }
>   public method1(x: number): string {
>     return `sample: ${x}`;
>   }
> }
> class MyResource
>   extends constructs.Construct
>   implements MyInterface1, MyInterface2 {
>   public readonly field1: number;
>   public readonly __inflight__field2: string;
>   public constructor(scope: constructs.Construct, id: string, x: number) {
>     super(scope, id);
>     // preflight constructor
>     Object.assign(this, { field1: x });
>   }
>   public __inflight__constructor() {
>     // inflight client initialization
>     Object.assign(this, { __inflight__field2: "sample" });
>   }
>   public __inflight__method2(): string {
>     return this.__inflight__field2;
>   }
>   public method1(x: number): string {
>     return `sample: ${x}`;
>   }
> }
> ```

[`▲ top`][top]

---

### 4.5 Variables

```pre
let <name>[: <type>] = <value>;
```

Assignment operator is `=` and is optional if a default value is given or both
`opt` and `mut` are present in the type annotation.  
`opt`, `mut` and alligator brackets can be mixed together to form complex types.

> ```TS
> // Wing Code:
> let n = 10;
> let s: string = "hello";
> let a: mut string?;
> a = "world";
> ```
>
> ```TS
> // Equivalent TypeScript:
> const n: number = 10;
> const s: string = "hello";
> let a: string?;
> a = "world";
> ```

[`▲ top`][top]

---

### 4.6 Functions

#### 4.6.1 Free Functions

```pre
fn <name>[~](<args>)[: <return_type>] {
  <body>
}
```

Function definition starts with keyword **fn**, name and a list of arguments in
parenthesis. These definition are always at block level.  
List of arguments starts with one or more parameter names, separated by comma.
Parameter names must be all followed by a type annotation.  
After comma, a colon is followed by a type expression.  
After parenthesis, an optional colon with a type specifier can be specified to
forward declare the return type. If missing, `nil` is assumed.  
Function body must be enclosed in { } block.  
Default argument values must be compile time constants.  
Function argument type can be inferred only if it has default argument value.  
Function default argument value is specified by writing "= value" directly after
argument name.

In all definitions, presence of `~` indicates "inflight-ness".  

It is possible to have functions with same name but both preflight and inflight.
It is impossible to interact with preflight functions from inflight code and
vice versa.

Function names are all snake_case and lower case.  
If return statement missing, `return nil` is assumed.  
If return type is missing, `: nil` is assumed.

> ```Rust
> // Wing Code:
> fn foo(x: number, y = 12) {
>   print("preflight", x + y);
> }
> // inflight block level function
> fn foo~(x: number, y: number = 16) {
>   print("inflight", x + y);
> }
> struct MyProps {
>   x: number;
>   y: number;
>   z: number;
> }
> // use a struct as an argument with the expansion operator
> let s: MyProps = { x = 1, y = 2, z = 3 };
> // inflight block level function (full keyword)
> fn boo~(props: MyProps) {
>   print(props);
> }
> // preflight block level function (optional with full keyword)
> preflight fn too(props: MyProps, a = 12) {
>   print(props);
> }
> ```

Capturing variables works as you'd expect in other languages like JavaScript but
restrictions are applied when variable captures happen from preflight into all
inflight definitions.

Only following types are capture-able inside inflight functions:

1. Structs
1. Resources
1. Primitive types
1. Arrays, Maps, and Sets of above types

Of the captured variables, only their inflight members are accessible inside the
scope of another inflight function. It is possible to have both a preflight and
an inflight member with the same name.

Resources cannot be defined inside inflight functions. Also when a resource is
captured inside an inflight function, it no longer is the original type. The
captured type is opaque and only known to the compiler.

If "bring" expression is used to import non Wing code, it is assumed that the
imported code is safe to be executed in either preflight or inflight.

If JSII constructs code is imported, it is treated as a resource.

[`▲ top`][top]

---

#### 4.6.2 Closures

It is possible to create closures.  
It is not possible to create named closures.  
However, it is possible to create anonymous closures and assign to variables
(function literals). Inflight closures are also supported.

> ```TS
> // Wing Code:
> let f1 = (a: number, b: number): nil => { print(a + b) };
> // inflight closure:
> let f2 = (a: number, b: number) ~> { print(a + b) };
> ```

[`▲ top`][top]

---

#### 4.6.3 Promises

Promises (a.k.a futures) in Wing are defined with `promise<T>` syntax.  
Functions that use the keyword "await" in their body must return a promise.

> ```Rust
> // Wing Code:
> fn number(): promise<number> {
>   return 23;
> }
> fn handler(): promise<nil>
> {
>   let t = await number();
>   print(t);
> }
> ```
>
> ```TS
> // Equivalent TypeScript:
> async function number(): number {
>   return 23;
> }
> async function handler(): undefined {
>   const t: number = await number();
>   console.log(t);
> }
> ```

[`▲ top`][top]

---

### 4.7 Arrays

Arrays are dynamically sized in Wing and are defined with the `[]` syntax.  
Individual array items are also access with the `[]` syntax.
You can call `sizeof` to get the size of the array.
Numeric ranged arrays are supported: `[0..10]`.

> ```TS
> // Wing Code:
> let arr1: array<number> = [1, 2, 3];
> let arr1_2: array<number> = 1..3;
> let arr2: array<string> = ["a", "b", "c"];
> let arr3: mut array<mut string> = ["a1", "b2", "c3"];
> let l = sizeof(arr1) + sizeof(arr2) + sizeof(arr3) + arr1[0];
> ```
>
> ```TS
> // Equivalent TypeScript:
> const arr1: number[] = Object.freeze([1, 2, 3]);
> const arr1_2: number[] = Object.freeze([1, 2, 3]);
> const arr2: string[] = Object.freeze(["a", "b", "c"]);
> let arr3: string[] = ["a1", "b2", "c3"];
> const l = arr1.length + arr2.length + arr3.length + arr1[0];
> ```

[`▲ top`][top]

---

### 4.8 Enumeration

Enumeration type (enum) is a type that groups a list of named constant members.
Enumeration is defined by writing **enum**, followed by enumeration name and a
list of comma-separated constants in a {}. Last comma is optional in single line
definitions but required in multi line definitions.  
Naming convention for enums is to use "TitleCase" for name ALL_CAPS for members.

> ```TS
> // Wing Code:
> enum SomeEnum { One, Two, Three };
> enum MyFoo {
>   A,
>   B,
>   C,
> };
> let x: enum<MyFoo> = MyFoo.B;
> let y = x; // type is enum<MyFoo>
> ```
>
> ```TS
> // Equivalent TypeScript:
> enum SomeEnum { One, Two, Three };
> enum MyFoo {
>   A,
>   B,
>   C,
> };
> const x: MyFoo = MyFoo.B;
> const y: MyFoo = x;
> ```

[`▲ top`][top]

---

## 5. Module System

The module system in Wing uses the "bring" expression to reuse code.  
**bring** expression allows code to "import" functions, classes and variables
from other files, to allow reusability.  
**bring** expression is only allowed at the top of the file before any other
code. Comments before the first bring expression are valid.

### 5.1 Imports

#### 5.1.1 Verbose Notation

"bring" expression starts with `from` keyword and followed by a file path,
either with or without an extension. If there is no extension, file path is
treated as a Wing import, otherwise it is treated as a JSII import.  
In case of Wing, quotes around the file path are optional.  
The expression is followed by a `bring` keyword and a list of names to import.  
Names can be renamed with `as` keyword.  
`bring *;` is invalid. It is not possible to import an entire namespace unbound.

> ```TS
> // Wing Code:
> from std bring * as std2;
> from std bring io;
> from std bring io as io2;
> from std bring io, fs, name as module;
> ```
>
> ```TS
> // Equivalent TypeScript:
> import * from 'std'; // @monadahq/wingsdk is available as "std" in "wingrt"
> import * as std2 from 'std';
> import { io } from 'std';
> import { io as io2 } from 'std';
> import { io, fs, name as module } from 'std';
> ```

To promote polyglot programming, A string literal can also be placed after
**bring**. This allows importing and reusing code from JSII packages:

> ```TS
> // Wing Code:
> from "cdk-spa" bring * as spa;
> from "cdk-spa" bring SomeConstruct;
> from "cdk-spa" bring SomeConstruct as SomeConstruct2;
> from "cdk-spa" bring SomeConstruct, OtherType as module;
> ```
>
> ```TS
> // Equivalent TypeScript:
> import * from 'cdk-spa';
> import * as spa from 'cdk-spa';
> import { SomeConstruct } from 'cdk-spa';
> import { SomeConstruct as SomeConstruct2 } from 'cdk-spa';
> import { SomeConstruct, OtherType as module } from 'cdk-spa';
> ```

[`▲ top`][top]

---

#### 5.1.2 Shorthand Notation

The verbose notation of from <bag> bring * can be shortened to bring <bag>.

```TS
bring std; // from std bring *;
bring cloud; // from cloud bring *;
bring "path/to/what.js"; // from "path/to/what.js" bring *;
```

[`▲ top`][top]

---

### 5.2 Exports

In preflight, anything with `public` at block scope level is importable.  
This includes functions, classes, structs, interfaces and resources.  
In inflight, the above excluding resources are importable.  
Variables are not exportable.

Resources are not usable in inflight functions. There is no synthesizer inside
the inflight body to synthesize inflight resources.

[`▲ top`][top]

---

## 6. Dependency Injection

### 6.1 Pure Resources

You may declare a pure resource with the `resource` keyword. These types of
resources are not meant to have a body declaration and their implementation is
meant to be resolved by the compiler at compile time based on options provided.
These resources must always implement at least one interface.

```TS
resource MyPureResource implements IBucketApi;
```

`MyPureResource` is a pure resource. A resource with no concrete implementation.
All pure resources must resolve at compile time. Partial resolves are invalid.

[`▲ top`][top]

---

### 6.2 Symbol Resolution

Compiler implementation must provide the following options to allow resolve of
pure resources to concrete implementation at compile time:

1. Compiler must allow symbols to be overridden via command line. Choice of the
  command name is up to implementation. `--resolve "<PureSymbol>=<Symbol>"` is
  an example of such command line.
1. Compiler must allow symbols to be overridden via environment variables.
  Choice of the environment variable name is up to implementation.
  `WING_RESOLVE_<PureSymbol>` is an example of such environment variable. This
  mode must be explicitly enabled (e.g. by passing empty `--resolve`). This can
  prevent accidental usage of leftover environment variables.
  Content of this environment variable would be `<Symbol>`.
1. Compiler must allow symbols to be overridden via `wing.w` file. This mode is
  enabled by the existence of the `wing.w` file:

    ```Rust
    from cloud bring aws;
    from lib/my-resources bring MyPureResource;
    public fn build(ctx: mut Context): Context {
      ctx.resolver.assign(MyPureResource, aws.s3.Bucket);
      // OR:
      ctx.resolver.assign(
        "lib/my-resources.MyPureResource",
        "cloud/aws.s3.Bucket"
      );
    }
    ```

Format of both `<PureSymbol>` and `<Symbol>` is simple:

- up to first `.` is Wing module path to use
- after first `.` is the exported resource accessor

```pre
<path/to/wing/module>.<resource accessor>
```

[`▲ top`][top]

---

## 7. Miscellaneous

### 7.1 Strings

Type of string is UTF-16 internally.  
All string declaration variants are multi-line.  
You can call `sizeof` to get the length of the string.

[`▲ top`][top]

---

#### 7.1.1 Normal strings "..."

The string inside the double quotes is processed, and all notations of form
`${<expression>}` are substituted from their respective scopes. The behavior is
similar to `` `text ${sub.prop}` `` notation in JavaScript.  
Processing unicode escape sequences happens in these strings.

> ```TS
> // Wing Code:
> let name = "World";
> let s = "Hello, ${name}!";
> let l = sizeof(s);
> ```
>
> ```TS
> // Equivalent TypeScript:
> const name = "World";
> const s = `Hello, ${name}!`; // with substitution
> const l = s.length; // length of string
> ```

[`▲ top`][top]

---

#### 7.1.2 Shell strings \`...\`

If string is enclosed with backticks, the contents of that string will be
interpreted as a shell command and its output will be used as a string.
`` `echo "Hello"` `` is equal to `"Hello"`.  
The string inside the backtick is evaluated in shell at compile time and its
stdout is returned as a string. If command exits with non-zero, this throws
with an exception containing the stderr of the command and its return code.

The string is evaluated at compile time as a escape hatch for ops workflows.

Substitution is not allowed in shell strings.  
Shell strings are invalid in the bring expression.  
Not all targets support shell execution. Backticks throw in absence of a shell.

Internally compiler calls the host environment's command processor (e.g.
`/bin/sh`, `cmd.exe`, `command.com`) with the enclosed command.

> ```TS
> // Wing Code:
> let name = `echo "World"`;
> let s = "Hello, ${name}!";
> ```
>
> ```TS
> // Equivalent TypeScript:
> const name = (() => {
>   let _stdout = "";
>   try {
>     const { stdout, stderr, status } = spawnSync('echo', ['hello'], {
>       shell: true
>     });
>     if (status !== 0) {
>       throw new Error(stderr.toString());
>     } else {
>       _stdout = stdout.toString();
>       return _stdout;
>     }
>   } catch(error){
>     console.error('Error', error.message);
>     throw error;
>   }
> })();
> let s = `Hello, ${name}!`;
> ```

[`▲ top`][top]

---

### 7.2 Comments

Single line comments start with a `//` and continue to the end of the line.  
Multi-line comments are supported with the `/* ... */` syntax.

> ```TS
> // comment
> /* comment */
> /*
>    multi line comment
> */
> ```

[`▲ top`][top]

---

### 7.3 Operators

Unary operators are not supported except outline below.  
Arithmetic assignment operators are not supported.  
Ternary or conditional operators are not supported.

#### 7.3.1 Relational Operators

| Operator | Description                                      | Example  |
| -------- | ------------------------------------------------ | -------- |
| `==`     | Checks for equality                              | `a == b` |
| `!=`     | Checks for inequality                            | `a != b` |
| `>`      | Checks if left is greater than right             | `a > b`  |
| `<`      | Checks if left less than right                   | `a < b`  |
| `>=`     | Checks if left is greater than or equal to right | `a >= b` |
| `<=`     | Checks if left is less than or equal to right    | `a <= b` |

[`▲ top`][top]

---

#### 7.3.2 Logical Operators

| Operator     | Description          | Example              |
| ------------ | -------------------- | -------------------- |
| `&&`, `and`  | Logical AND operator | `a && b`, `a and b`  |
| `\|\|`, `or` | Logical OR operator  | `a \|\| b`, `a or b` |
| `!`, `not`   | Logical NOT operator | `!a`, `not a`        |

[`▲ top`][top]

---

#### 7.3.3 Bitwise Operators

| Operator | Description                 | Example  |
| -------- | --------------------------- | -------- |
| `&`      | Binary AND                  | `a & b`  |
| `\|`     | Binary OR                   | `a \| b` |
| `^`      | Binary XOR                  | `a ^ b`  |
| `~`      | Binary One's Complement     | `~a`     |
| `<<`     | Binary Left Shift Operator  | `a << 1` |
| `>>`     | Binary Right Shift Operator | `a >> 1` |

[`▲ top`][top]

---

#### 7.3.4 Mathematics Operators

| Operator | Description    | Example |
| -------- | -------------- | ------- |
| `*`      | Multiplication | `a * b` |
| `/`      | Division       | `a / b` |
| `\`      | Floor Division | `a \ b` |
| `%`      | Modulus        | `a % b` |
| `+`      | Addition       | `a + b` |
| `-`      | Subtraction    | `a - b` |
| `^`      | Exponent       | `a ^ b` |

[`▲ top`][top]

---

#### 7.3.5 Operator Precedence

| Operator             | Notes                                             |
| -------------------- | ------------------------------------------------- |
| ()                   | Parentheses                                       |
| +x, -x, ~x           | Unary plus, Unary minus, Bitwise NOT              |
| \*, /, \\, %         | Multiplication, Division, Floor division, Modulus |
| +, -                 | Addition, Subtraction                             |
| <<, >>               | Bitwise shift operators                           |
| &                    | Bitwise AND                                       |
| ^                    | Bitwise XOR                                       |
| \|                   | Bitwise OR                                        |
| ==, !=, >, >=, <, <= | Comparisons, Identity, operators                  |
| !,not                | Logical NOT                                       |
| &&,and               | Logical AND                                       |
| \|\|,or              | Logical OR                                        |

Table above is in descending order of precedence.  
`=` operator in Wing does not return a value so you cannot do `let x = y = 1`.  
Operators of the same row in the table above have precedence from left to right
in the expression they appear in (e.g. `4 * 2 \ 3`). In other words, order is
determined by associativity.

[`▲ top`][top]

---

#### 7.3.6 Short Circuiting

For the built-in logical NOT operators, the result is `true` if the operand is
`false`. Otherwise, the result is `false`.

For the built-in logical AND operators, the result is `true` if both operands
are `true`. Otherwise, the result is `false`. This operator is short-circuiting
if the first operand is `false`, the second operand is not evaluated.

For the built-in logical OR operators, the result is `true` if either the first
or the second operand (or both) is `true`. This operator is short-circuiting if
the first operand is `true`, the second operand is not evaluated.

Note that bitwise logic operators do not perform short-circuiting.

[`▲ top`][top]

---

#### 7.3.7 Equality

Of the operators above, the following can be used with non-numeric operands:

- `==`: can be used to check for equality of types and values in operands.
- `!=`: can be used to check for inequality of types and values in operands.

[`▲ top`][top]

---

### 7.4 Kitchen Sink

This is an example with almost every feature of the Wing, showing you a whole
picture of what the syntax feels like.

```TS
from std bring fs;
from std bring math;
from cloud bring poly;

// single line comment about "file"
let file = fs.File(content: 'hello world!');
let file2 = fs.File() be "my-file";
file2.write('hello file2!');

struct UploaderOptions {
  message: str?;
  foo: number?;
}

resource Uploader {
  // "fs.File" is a Resource
  public output: fs.File;
  // "poly.serverless.Bucket" is a Resource
  public bucket: poly.serverless.Bucket;
  // constructor with one argument
  new(file: fs.File, opts: UploaderOptions = {}) {
    this.output = file;
    this.bucket = poly.storage.Bucket() be "uploader-bucket-${file.ext}";
  }
  // when this is called in preflight by accident, panic
  public upload() {
    panic('not implemented');
  }
  // this is called in inflight. "bucket.upload" is inflight itself
  public upload~(): bool {
    try {
      let filename = math.random() * 100;
      if this.bucket.upload(
        key: "/path/to/${filename}.txt",
        file: this.output
      ) {
        print("uploaded ${filename}");
      } else {
        throw("upload failed");
      }
    } catch err {
      panic(err);
    }
  }
};

// create an uploader and make it a child of the root resource directly
let uploader = Uploader(file) be "my-uploader";
let root = nodeof(uploader).root;

// make a lambda handler that consumes the uploader and uploads the file
fn handler~() {
  if uploader.upload() {
    print('uploaded!');
  } else {
    panic('mayday mayday!');
  }
};

let function = poly.serverless.Function({
  handler: handler,
  runtime: "nodejs",
  timeout: "60s"
});

print("function created: ${function.name}")
```

#### 7.4.1 Deny List

A snippet of an example application with a user-defined resource with an inflight client.

```TS
bring cloud;
bring fs;

struct DenyListRule {
  package_name: str;
  version: str?;
  reason: str;
}

struct DenyListProps {
  rules: array<DenyListRule>;
}

resource DenyList {
  _bucket: cloud.Bucket;
  _object_key: str;

  new(props: DenyListProps) {
    this._bucket = bucket;
    this._object_key = "deny-list.json";

    let rules_dir = this._write_to_file(props.rules, this._object_key);
    let bucket = cloud.Bucket();
    bucket.upload("${rules_dir}/*/**", prune: true, retain_on_delete: true);
  }

  _write_to_file(list: array<DenyListRule>, filename: str): str {
    let tmpdir = fs.mkdtemp();
    let filepath = "${tmpdir}/${filename}";
    let map = new map<DenyListRule>();
    for rule in list {
      append_rule(map, rule);
    }
    fs.write_json(filepath, map);
    return tmpdir;
  }

  ~rules: map<DenyListRule>;

  ~new() {
    this.rules = this._bucket.get(this._object_key) ?? new map<DenyListRule>();
  }

  public ~lookup(name: str, version: str): DenyListRule? {
    return this.rules[name] ?? this.rules["${name}/v${version}"];
  }

  public ~add_rule(rule: DenyListRule) {
    append_rule(this.rules, rule)
    this._bucket.set(this._object_key, this.rules);
  }
}

fn append_rule(map: mut map<DenyListRule>, rule: DenyListRule) {
  let suffix = version != nil ? "/v${rule.version}" : "";
  let path = "${rule.package_name}${suffix}";
  map[path] = rule;
}

fn main() {
  let deny_list = DenyList();

  fn ~filter_fn(event: cloud.QueueEvent) {
    let package_name = event.data["package_name"];
    let version = event.data["version"];
    let reason = event.data["reason"];
    if deny_list.lookup(package_name, version) != nil {
      print("Package rejected: ${package_name}");
    } else {
      print("Package accepted: ${package_name}");
    }
  }

  queue = cloud.Queue();
  filter = cloud.Function(filter_fn);
  queue.add_consumer(filter);
}
```

[`▲ top`][top]

---
### 7.5 Credits

- <https://github.com/WheretIB/nullc>
- <https://github.com/chaos-lang/chaos>
- <https://github.com/BlazifyOrg/blazex>
- <https://github.com/YorickPeterse/inko>
- <https://github.com/thesephist/ink>
- <https://github.com/vlang/v>

[top]: #wing-language-reference
