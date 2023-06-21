---
title: Language Reference
id: spec
description: The Wing Language Specification
keywords: [Wing reference, Wing language, language, Wing language spec, Wing programming language]
---

## 0. Preface

### 0.1 Motivation

The Wing Programming Language (aka Winglang) is a general
purpose programming language designed for building applications for the cloud.

What makes Wing special? Traditional programming languages are designed around
the premise of telling a single machine what to do. The output of the compiler
is a program that can be executed on that machine. But cloud applications are
distributed systems that consist of code running across multiple machines and
which intimately use various cloud services to achieve their
business goals.

Wing’s goal is to allow developers to express all pieces of a cloud application
using the same programming language. This way, we can leverage the power of the
compiler to deeply understand the intent of the developer and implement it with
the mechanics of the cloud.

[`▲ top`][top]

---

### 0.2 Design Tenets

- Developer Experience (DX) is priority #1 for Wing.
- Syntax design aims to be concise and minimal, while being "batteries included"
  at the same time in terms of tooling and DX.
- Developers coming from other mainstream cloud languages (C#, Java, and TS)
  should feel right at home.
- Public facing APIs and syntax are designed to be compatible with JSII. Wing
  Libraries are JSII libraries themselves.
- All clouds are treated equally.
- Syntactic sugar comes last.

[`▲ top`][top]

---

### 0.3 Table of Contents

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc}/>

---

## 1. General

### 1.1 Types

#### 1.1.1 Primitive Types

| Name   | Extra information                  |
| ------ | ---------------------------------- |
| `void` | represents the absence of a type   |
| `nil`  | represents the absence of a value  |
| `num`  | represents numbers (doubles)       |
| `str`  | UTF-16 encoded strings             |
| `bool` | represents true or false           |

> ```TS
> let x = 1;                  // x is a num
> let v = 23.6;               // v is a num
> let y = "Hello";            // y is a str
> let z = true;               // z is a bool
> let q: num? = nil;          // q is an optional num
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> const x: number = 1;
> const v: number = 23.6;
> const y: string = "Hello";
> const z: boolean = true;
> const q: number? = undefined;
> ```
  
</details>

[`▲ top`][top]

---

#### 1.1.2 Container Types

| Name          | Extra information                     |
| ------------- | ------------------------------------- |
| `Set<T>`      | set type (set of unique items)        |
| `Map<T>`      | map type (key-value with string keys) |
| `Array<T>`    | variable size array of a certain type |
| `MutSet<T>`   | mutable set type                      |
| `MutMap<T>`   | mutable map type                      |
| `MutArray<T>` | mutable array type                    |

> ```TS
> let z = {1, 2, 3};               // immutable set, Set<Num> is inferred
> let zm = MutSet<num>{};          // mutable set
> let y = {"a" => 1, "b" => 2};    // immutable map, Map<num> is inferred
> let ym = MutMap<num>{};          // mutable map
> let x = [1, 2, 3];               // immutable array, Array<num> is inferred
> let xm = MutArray<num>[];        // mutable array
> let w = new SampleClass();       // class instance (mutability unknown)
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> const z: Set<number> = Object.freeze(new Set([1, 2, 3]));
> const zm: Set = new Set();
> const y: Map<string, number> = Object.freeze(new Map([["a", 1], ["b", 2]]));
> const ym: Map = new Map();
> const x: number[] = Object.freeze([1, 2, 3]);
> const xm: number[] = [];
> const w: SampleClass = new SampleClass();
> ```

</details>

[`▲ top`][top]

---

#### 1.1.3 Function Types

Function type annotations are written as if they were closure declarations, with
the difference that body is replaced with return type annotation. 

The `inflight` modifier indicates that a function is an inflight function.  
`inflight` in Wing implies `async` in JavaScript.

```pre
(arg1: <type1>, arg2: <type2>, ...): returnType => <type>
inflight (arg1: <type1>, arg2: <type2>, ...): returnType => <type>
```

> ```TS
> // type annotation in wing: (num) => num
> let f1 = (x: num): num => { return x + 1; };
> // type annotation in wing: inflight (num, str) => void
> let f2 = inflight (x: num, s: str) => { /* no-op */ };
> ```

Return type is required for function types.
> ```TS
> let my_func = (callback: (num): void) => {  };
> let my_func2 = (callback: ((num): void): (str): void) => {  };
> ```
Return type is optional for closures.
> ```TS
> let my_func3 = (x: num) => {  };
> let my_func4 = (x: num): void => {  };
> let my_func5 = inflight (x: num) => {  };
> let my_func6 = inflight (x: num): void => {  };
```
[`▲ top`][top]

---

#### 1.1.4 Json type

Wing has a data type called `Json`. This type represents an immutable untyped [JSON
value](https://www.json.org/json-en.html), including JSON primitives (`string`, `number`,
`boolean`), arrays (both heterogenous and homogenous) and objects (key-value maps where keys are
strings and values can be any other JSON value).

`Json` objects are immutable and can be referenced across inflight context.

##### 1.1.4.1 Literals

Literals can be defined using the `Json` type initializers:

```TS
let jsonString  = Json "hello";
let jsonNumber  = Json 123;
let jsonBool    = Json true;
let jsonArray   = Json [ 1, 2, 3 ];
let jsonObj     = Json { boom: 123 };
let jsonMutObj = MutJson {
  hello: 123, 
  world: [ 1, "cat", 3 ],       // <-- heterogenous array
  "boom boom": { hello: 1233 }  // <-- non-symbolic key
};
```

The `Json` keyword can be omitted from `Json` object literals:

```TS
let jsonObj = { boom: 123, bam: [4, 5, 6] };
```

Every value within a `Json` array or object also has a type of `Json`.

##### 1.1.4.2 JSON objects

To access a field within an object, use `.get("{field name}")`:

```TS
let boom: Json = jsonObj.get("boom");
```

Trying to access a non-existent field will fail at runtime. For example:

```TS
log(jsonObj.get("boom").get("dude").get("world"));
// RUNTIME ERROR: Cannot read properties of undefined (reading 'world')
```

To obtain an array of all the keys within a JSON object use the `Json.keys(o)` method. 

```TS
let j = Json { hello: 123, world: [ 1, 2, 3 ] };
assert(Json.keys(j).at(0) == "hello");
assert(Json.keys(j).at(1) == "world");
```

To obtain an array of all the values, use `Json.values(o)`:

```TS
assert(Json.values(j).equals([ Json 123, Json [ 1, 2, 3 ] ]));
```

> NOTE: `values()` returns an array inside a `Json` object because at the moment we
> cannot represent heterogenous arrays in Wing.

##### 1.1.4.4 Assignment from native types

It is also possible to assign the native `str`, `num`, `bool` and `Array<T>` values and they will
implicitly be casted to `Json`:

```TS
let myStr: str = "hello";
let myNum: num = 183;
let myBool: bool = true;
let myArr: Array<num> = [1,2,3];

let jsonObj = Json { 
  a: myString,
  b: myNum,
  c: myBool,
  d: myArr
};
```


##### 1.1.4.5 Assignment to native types

We only allow implicit assignment from *safe* to *unsafe* types because otherwise we cannot
guarantee safety (e.g. from `str` to `Json` but not from `Json` to `str`), so this won't work:

```TS
let j = Json "hello";
let s: str = j;
//           ^ cannot assign `Json` to `str`.
```

To assign a `Json` to a strong-type variable, use the `fromJson()` static method on the target
type:

```TS
let myStr = str.fromJson(jsonString);
let myNumber = num.fromJson(jsonNumber);
```

##### 1.1.4.6 Schema validation

All `fromJson()` methods will validate that the runtime type is compatible with the target type in
order to ensure type safety (at a runtime cost):

```TS
str.fromJson(jsonNumber);      // RUNTIME ERROR: unable to parse number `123` as a string.
num.fromJson(Json "\"hello\""); // RUNTIME ERROR: unable to parse string "hello" as a number
```

##### 1.1.4.8 Mutability

To define a mutable JSON container, use the `MutJson` type:

```TS
let myObj = MutJson { hello: "dear" };
```

Now you can mutate the contents by assigning values:

```TS
let myObj = MutJson { hello: "dear" };
let fooNum = 123;
myObj.set("world", "world");
myObj.set("dang", [1,2,3,4]);
myObj.set("subObject", MutJson {});
myObj.get("subObject").set("arr", MutJson [1,"hello","world"]);
myObj.set("foo", fooNum);
```

For the sake of completeness, it is possible to also define primitives using `MutJson` but that's
not very interesting because there is no way to mutate them:

```TS
let foo = MutJson "hello";
// ok what now?
```

Use the `Json.clone()` and `Json.cloneMut()` methods to get a *deep clone* of the object:

```TS
let mutJson = MutJson { hello: 123 };
let immut = Json.clone(mutJson);
mutJson.hello = 999;
assert(immut.hello == 123);
```

To delete a key from an object, use the `Json.delete()` method:

```TS
let myObj = MutJson { hello: 123, world: 555 };
Json.delete(myObj, "world");

let immutObj = Json { hello: 123 };
Json.delete(immutObj, "hello");
//          ^^^^^^^^^ expected `JsonMut`
```

##### 1.1.4.9 Serialization

The `Json.stringify(j: Json): str` static method can be used to serialize a `Json` as a string
([JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)):

```TS
let jsonString  = Json "hello";
let jsonObj = Json { boom: 123 };
assert(Json.stringify(jsonString) == "\"hello\"");
assert(Json.stringify(jsonObj) == "{\"boom\":123}");
```

The `Json.parse(s: str): Json` static method can be used to parse a string into a `Json`:

```TS
let j = Json.parse("{ \"boom\": 123 }");
let boom = num.fromJson(j.get("boom"));
```

`Json.tryParse` returns an optional:

```TS
let o = Json.tryParse("xxx") ?? Json [1,2,3];
```

##### 1.1.4.11 Logging

A `Json` value can be logged using `log()`, in which case it will be pretty-formatted:

```TS
log("my object is: ${jsonObj}");
// is equivalent to
log("my object is: ${Json.stringify(jsonObj)}");
```

This will output:

```TS
my object is: {
  boom: 123
}
```

[`▲ top`][top]

---

#### 1.1.5 `Duration`

The `Duration` (alias `duration`) type represents a time duration.

Duration literals are numbers with `m`, `s`, `h` suffixes:

```TS
let oneMinute = 1m;
let twoSeconds = 2s;
let threeHours = 3h;
let halfMinute: duration = 0.5m;
```

Then:

```TS
assert(oneMinute.seconds == 60);
assert(halfMinute.seconds == 30);
assert(threeHours.minutes == 180);
```

Duration objects are immutable and can be referenced across inflight context.

### 1.2 Utility Functions

| Name     | Extra information                                        |
| -------- | -------------------------------------------------------- |
| `log`    | logs str                                                 |
| `throw`  | creates and throws an instance of an exception           |
| `panic`  | exits with a serializable, dumps the trace + a core dump |
| `assert` | checks a condition and _panics_ if evaluated to false    |

`panic` is a fatal call by design. If the intention is error handling, panic is the
last resort. Exceptions are non fatal and should be used instead for effectively
communicating errors to the user.

> ```TS
> log("Hello ${name}");
> throw("a recoverable error occurred");
> panic("a fatal error encountered");
> assert(x > 0);
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> console.log("Hello ${name}");
> // throws
> throw new Error("a recoverable error occurred");
> // calling panic in wing is fatal
> (() => {
>   console.error("Something went wrong");
>   // generate core dump
>   // show stack trace
>   process.exit(1);
> })();
> // assertion
> (() => { assert.ok(x > 0); })();
> ```

</details>

[`▲ top`][top]

---

### 1.3 Phase Modifiers

In Wing, we differentiate between code that executes during compilation and code
that executes after the application has been deployed by referring to them as
`preflight` and `inflight` code respectively.

The default (and implicit) execution context in Wing is `preflight`. This is
because in cloud applications, the entrypoint is the definition of the app's
cloud architecture, and not the code that runs within a specific machine within
this cloud infrastructure.

The phase modifier `inflight` is allowed in the context of declaring interface
and class members (methods, fields and properties). Example code is shown in
the [preflight classes](#33-preflight-classes) section.

```TS
class Bucket {
  // preflight method
  allowPublicAccess() {

  }

  // inflight method
  inflight put(key: str, contents: str): void {

  }
}
```

Inflight members can only be accessed from an **inflight context** (an inflight
method or an inflight closure) and preflight members can only be accessed from a
**preflight context** (a preflight method or a preflight closure).

The `inflight` modifier is allowed when defining function closures or classes. This implies that
these types can only be used within inflight context.

```TS
let handler = inflight () => {
  log("hello, world");
};

inflight class Foo {
  // ...
}
```

For example (continuing the `Bucket` example above):

```TS
let bucket = new Bucket();
// OK! We are calling a preflight method from a preflight context
bucket.allowPublicAccess();
// ERROR: Cannot call into inflight phase while preflight
bucket.put("file.txt", "hello");

let handler = inflight () => {
  // now we are in inflight context
  // OK! We are calling an inflight methods from an inflight context
  bucket.put("file.txt", "hello");
};
```

Preflight classes can only be instantiated within **preflight** context:

```TS
class Bar {}

new Bar(); // OK! Bar is a preflight class

let handler2 = inflight() => {
  new Bar(); // ERROR: Cannot create preflight class "Bar" in inflight phase
}
```

Bridge between preflight and inflight is crossed with the help of immutable data
structures, "structs" (user definable and `Struct`), and the capture mechanism.

Preflight class methods and initializers can receive an inflight function as an argument. This
enables preflight classes to define code that will be executed on a cloud compute platform such as
lambda functions, docker, virtual machines etc.

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

Statics are supported in both inflight as well as preflight modes of execution.

A declaration for a static member is a member declaration whose declaration
specifiers contain the keyword static. The keyword static must appear before
other specifiers. More details in the [classes](#32-classes) section.

Code samples for `static` are not shown here. They are shown in the relevant
sections below.

To avoid confusion, it is invalid to have a static and a non-static with the
same name. Overloading a static is allowed however.  
Accessing static is done via the type name and the `.` operator.

Static class fields are not supported yet, see https://github.com/winglang/wing/issues/1668

[`▲ top`][top]

---

### 1.6 Reassignability

Re-assignment to variables that are defined with `let` is not allowed in Wing.

Variables can be reassigned to by adding the `var` modifier:

```TS
// wing
let var sum = 0;
for item in [1,2,3] {
  sum = sum + item;
}
```

Re-assignment to class fields is allowed if field is marked with `var`.
Examples in the class section below.

`var` is available in the body of class declarations.
Assigning `var` to immutables of the same type is allowed. That is similar
to assigning non `readonly`s to `readonly`s in TypeScript.

By default function closure arguments are non-reassignable. By prefixing `var`
to an argument definition you can make a re-assignable function argument:

```TS
// wing
let f = (arg1: num, var arg2: num) => {
  if (arg2 > 100) {
    // We can reassign a value to arg2 since it's marked `var`
    arg2 = 100;
  }
};
```

[`▲ top`][top]

---

### 1.7 Optionality

Nullity is a primary source of bugs in software. Being able to guarantee that a value will never be
null makes it easier to write safe code without constantly having to take nullity into account.

In order to allow the compiler to offer stronger guarantees, Wing includes a higher-level concept
called "optionality" which requires developers to be more intentional about working with the concept
of "lack of value".

Here's a quick summary of how optionality works in Wing:

* `x: T?` marks `x` as "optional of T". This means that `x` can either be `nil` (without a value) or
  have a value of type `T`.
* To test for a value, the unary expression `x?` returns a `true` if `x` has a value and `false`
  otherwise.
* `if let y = x { } else { }` is a special control flow statement which binds `y` inside the first
  block only if `x` has a value. Otherwise, the `else` block will be executed.
* The `x?.y?.z` notation can be used to access fields only if they have a value. The type of this
  expression is `Z?` (an optional based on the type of the last component).
* The `x ?? y` notation will return the value in `x` if there is one, `y` otherwise.
* The keyword `nil` can be used in assignment scenarios to indicate that an optional doesn't have a
  value. It cannot be used to test if an optional has a value or not.

#### 1.7.1 Declaration

##### 1.7.1.1 Struct fields

One of the more common use cases for optionals is to use them in struct declarations.

```TS
struct Person {
  name: str;
  address: str?;
}
```

In the `Person` struct above, the `address` field is marked as optional using `?`. This means that
we can initialize without defining the `address` field:

```TS
let david = Person { name: "david" };
let jonathan = Person { name: "jonathan", address: "earth" };
assert(david.address? == false);
assert(jonathan.address? == true);
```

##### 1.7.1.2 Variables

Use `T?` to indicate that a variable is optional. To initialize it without a value use `= nil`.

```TS
let var x: num? = 12;
let var y: num? = nil;
assert(y? == false); // y doesn't have a value
assert(x? == true); // x has a value

// ok to reassign another value because `y` is reassignable (`var`)
y = 123;
assert(y? == true);

x = nil;
assert(x? == false);
```

##### 1.7.1.3 Class fields

Similarly to struct fields, fields of classes can be also defined as optional using `T?`:

```TS
class Foo {
  myOpt: num?;
  var myVar: str?;

  init(opt: num?) {
    this.myOpt = opt;
    this.myVar = nil; // everything must be initialized, so you can use `nil` to indicate that there is no value
  }

  setMyVar(x: str) {
    this.myVar = x;
  }
}
```

##### 1.7.1.4 Function arguments

In the following example, the argument `by` is optional, so it is possible to call `increment()`
without supplying a value for `by`:

```TS
let increment = (x: num, by: num?): num => {
  return x + (by ?? 1);
};

assert(increment(88) == 89);
assert(increment(88, 2) == 90);
```

Non-optional arguments can only be used before all optional arguments:

```TS
let myFun = (a: str, x: num?, y: str): void => { /* ... */ };
//-----------------------------^^^^^^ ERROR: cannot declare a non-optional argument after an optional
```

If a function uses a keyword argument struct as the last argument, and there are other optional
arguments before, it also has to be declared as optional.

```TS
let parseInt = (x: str, radix: num?, opts?: ParseOpts): num { /* ... */ };
```

The optionality of keyword arguments is determined by the struct field's optionality:

```TS
struct Options {
  myRequired: str;
  myOptional: num?;
}

let f = (opts: Options) => { };

f(myRequired: "hello");
f(myOptional: 12, myRequired: "dang");
```

##### 1.7.1.5 Function return types

If a function returns an optional type, use the `return nil;` statement to indicate that the value
is not defined.

```TS
struct Name { 
  first: str;
  last: str;
}

let tryParseName = (fullName: str): Name? => {
  let parts = fullName.split(" ");
  if parts.length < 2 {
    return nil;
  }

  return Name { first: parts.at(0), last: parts.at(1) };
};

// since result is optional, it needs to be unwrapped in order to be used
if let name = tryParseName("Neo Matrix") {
  log("Hello, ${name.first}!");
}
```

#### 1.7.2 Testing using `x?`

To test if an optional has a value or not, you can either use `x == nil` or `x != nil` or the
special syntax `x?`.

```TS
struct MyPerson {
  name: str;
  address: str?;
}
let myPerson = MyPerson {name: "John", address: nil};


let isAddressDefined = myPerson.address?; // type is `bool`
let isAddressReallyDefined = myPerson.address != nil; // equivalent

// or within a condition
if myPerson.address? {
  log("address is defined but i do not care what it is");
}

// can be negated
if !myPerson.address? {
  log("address is not defined");
}

if myPerson.address == nil {
  log("no address");
}
```

#### 1.7.3 Unwrapping using `if let`

The `if let` statement can be used to test if an optional is defined and *unwrap* it into a
non-optional variable defined inside the block:

```TS
if let address = myPerson.address {
  log("${address.length}");
  log(address); // type of address is `str`
}
```

> NOTE: `if let` is not the same as `if`. For example, we currently don't support specifying
> multiple conditions, or unwrapping multiple optionals. This is something we might consider in the
> future.

#### 1.7.4 Unwrapping or default value using `??`

The `??` operator can be used to unwrap or provide a default value. This returns a value of `T` that
can safely be used.

```TS
let address: str = myPerson.address ?? "Planet Earth";
```

#### 1.7.5 Optional chaining using `?.`

The `?.` syntax can be used for optional chaining. Optional chaining returns a value of type `T?`
which must be unwrapped in order to be used.

```TS
let ipAddress: str? = options.networking?.ipAddress;

if let ip = ipAddress {
  log("the ip address is defined and it is: ${ip}");
}
```

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

Function arguments and their return type is always required.

> ```TS
> let i = 5;
> let m = i;
> let arrOpt: MutArray<num>? = MutArray<num> [];
> let arr = Array<num>[];
> let copy = arr;
> let i1: num? = nil;
> let i2: num? = i;
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> const i: number = 5;
> const m: number = i;
> const arrOpt: number[] | undefined = [];
> const arr: readonly number[] = Object.freeze([]);
> const copy: readonly number[] = Object.freeze([...arr]);
> const i1: number | undefined = undefined;
> const i2: number | undefined = i;
> ```

</details>

[`▲ top`][top]

---

### 1.9 Error Handling

Exceptions and `try/catch/finally` are the error mechanism. Mechanics directly
translate to JavaScript. You can create a new exception with a `throw` call.

In the presence of `try`, both `catch` and `finally` are optional but at least one of them must be present.
In the presence of `catch` the variable holding the exception (`e` in the example below) is optional.

`panic` is meant to be fatal error handling.  
`throw` is meant to be recoverable error handling.

An uncaught exception is considered user error but a panic call is not. Compiler
guarantees exception safety by throwing a compile error if an exception is
expected from a call and it is not being caught.

> ```TS
> try {
>   let x: num? = 1;
>   throw("hello exception");
> } catch e {
>   log(e);
> } finally {
>   log("done");
> }
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> try {
>   let x: number | undefined = 1;
>   throw new Error("hello exception");
> } catch (e) {
>   console.log(e);
> } finally {
>   console.log("done");
> }
> ```
  
</details>

[`▲ top`][top]

---

### 1.10 Recommended Formatting

Wing recommends the following formatting and naming conventions:

- Interface names should start with capital letter "I".
- Class, struct, and interface names should be PascalCased.
- Members of classes, and interfaces cannot share the same PascalCased
  representation as the declaring expression itself.
- Parentheses are optional in expressions. Any Wing expression can be surrounded
  by parentheses to enforce precedence, which implies that the expression inside
  an if/for/while statement may be surrounded by parentheses.

[`▲ top`][top]

---

### 1.11 Memory Management

There is no implicit memory de-allocation function, dynamic memory is managed by
Wing and is garbage collected (relying on JSII target GC for the meantime).

[`▲ top`][top]

---

### 1.12 Execution Model

Execution model currently is delegated to the JSII target. This means if you are
targeting JSII with Node, Wing will use the event based loop that Node offers.

In Wing, writing and executing at root block scope level is forbidden except for
the entrypoint of the program. Root block scope is considered special and
compiler generates special instructions to properly assign all preflight classes to
their respective scopes recursively down the constructs tree based on entry.

Entrypoint is always a Wing source with an extension of `.w`. Within this entry
point, a root preflight class is made available for all subsequent preflight classes that are
initialized and instantiated. Type of the root class is determined by the
target being used by the compiler. The root class might be of type `App` in
AWS CDK or `TerraformApp` in case of CDK for Terraform target.

> Following "shimming" is only done for the entrypoint file and nowhere else.
> Type of the "shim" changes from `cdk.Stack` to `TerraformStack` for cdk-tf.

> ```TS
> // Wing Entrypoint Code:
> let a = MyResource();
> let b = MyResource() be "my-resource";
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> (new class extends cdk.Stack {
>   constructor(scope: constructs.Construct, id: string) {
>     const a = new MyResource(this, "MyResource");
>     const b = new MyResource(this, "my-resource");
>   }
> })(new cdk.App(), "WingEntry");
> ```

</details>

[`▲ top`][top]

---

### 1.13 Asynchronous Model

Wing builds upon the asynchronous model of JavaScript currently and expands upon
it with new keywords and concepts. The `async` keyword of JavaScript is replaced
with `inflight` in Wing deliberately to indicate extended functionality.

Main concepts to understand:

- `preflight` implies synchronous execution.
- `inflight` implies asynchronous execution.

Contrary to JavaScript, any call to an async function is implicitly awaited in Wing.

## 2. Statements

### 2.1 bring

**bring** statement can be used to import and reuse code from
other JSII supported languages. The statement is detailed in its own section in
this document: [Module System](#4-module-system).

[`▲ top`][top]

---

### 2.2 break

**break** statement allows to end execution of a cycle. This includes `for` and
`while` loops.

> ```TS
> for i in 1..10 {
>   if i > 5 {
>     break;
>   }
>   log("${i}");
> }
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> for (let i = 1; i < 10; i++) {
>   if (i > 5) {
>     break;
>   }
>   console.log(i);
> }
> ```
  
</details>

[`▲ top`][top]

---

### 2.3 continue

**continue** statement allows to skip to the next iteration of a cycle. This
includes for and while loops currently.

> ```TS
> for i in 1..10 {
>   if i > 5 {
>     continue;
>   }
>   log("${i}");
> }
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> for (let i = 1; i < 10; i++) {
>   if (i > 5) {
>     continue;
>   }
>   console.log(i);
> }
> ```
  
</details>

[`▲ top`][top]

---

### 2.4 return

**return** statement allows to return a value or exit from a called context.  

> ```TS
> class MyClass {
>   myMethod() {}
>   myMethod2(): void {}
>   myMethod3(): void { return; }
>   myMethod4(): str { return "hi!"; }
> }
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> class MyClass {
>   public myMethod(): void {}
>   public myMethod2(): void {}
>   public myMethod3(): void { return; }
>   public myMethod4(): string { return "hi!"; }
> }
> ```
  
</details>

[`▲ top`][top]

---

### 2.6 if

Flow control can be done with `if/elif/else` statements.  
The **if** statement is optionally followed by **elif** and **else**.  

> ```TS
> // Wing program:
> let x = 1;
> let y = "sample";
> if x == 2 {
>   log("x is 2");
> } elif y != "sample" {
>   log("y is not sample");
> } else {
>   log("x is 1 and y is sample");
> }
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
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
  
</details>

[`▲ top`][top]

---

### 2.7 for

`for..in` statement is used to iterate over an array, a set or a range. 
Range is inclusive of the start value and exclusive of the end value.
The loop invariant in for loops is implicitly re-assignable (`var`).

> ```TS
> // Wing program:
> let arr = [1, 2, 3];
> let set = {1, 2, 3};
> for item in arr {
>   log("${item}");
> }
> for item: num in set {
>   log("${item}");
> }
> for item in 0..100 {
>   log("${item}"); // prints 0 to 99
> }
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> const arr: readonly number[] = Object.freeze([1, 2, 3]);
> const set: Set<number> = Object.freeze(new Set([1, 2, 3]));
> for (const item of arr) {
>   console.log(item);
> }
> for (const item of set) {
>   console.log(item);
> }
> // calling 0..100 does not allocate, just returns an iterator
> function* iterator(start: number, end: number) {
>   let i = start;
>   while (i < end) yield i++;
>   while (i > end) yield i--;
> }
> const iter = iterator(0, 100);
> for (const val of iter) {
>   console.log(val);
> }
> ```
  
</details>

[`▲ top`][top]

---

### 2.8 while

**while** statement is used to execute a block of code while a condition is true.  

> ```TS
> // Wing program:
> while callSomeFunction() {
>   log("hello");
> }
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> while (callSomeFunction()) {
>   console.log("hello");
> }
> ```
  
</details>

[`▲ top`][top]

---

## 3. Declarations

### 3.1 Structs

Structs are loosely modeled after typed JSON literals in JavaScript.  
Structs are defined with the `struct` keyword.  
Structs are "bags" of immutable data.

Structs can only have fields of primitive types, preflight classes, and other structs.  
Array, set, and map of above types is also allowed in struct field definition.  
Visibility, storage and phase modifiers are not allowed in struct fields.

Structs can inherit from multiple other structs.

> ```Rust
> // Wing program:
> struct MyDataModel1 {
>   field1: num;
>   field2: str;
> }
> struct MyDataModel2 {
>   field3: num;
>   field4: bool?;
> }
> struct MyDataModel3 extends MyDataModel1, MyDataModel2 {
>   field5: str;
> }
> let s1 = MyDataModel1 { field1: 1, field2: "sample" };
> let s2 = MyDataModel2 { field3: 1, field4: true };
> let s3 = MyDataModel2 { field3: 1 };
> let s4 = MyDataModel3 {
>   field1: 12,
>   field2: "sample", 
>   field3: 11,
>   field4: false,
>   field5: "sample"
> };
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> interface MyDataModel1 {
>   readonly field1: number;
>   readonly field2: string;
> }
> interface MyDataModel2 {
>   readonly field3: number;
>   readonly field4?: boolean;
> }
> interface MyDataModel3 extends MyDataModel1, MyDataModel2 {
>   readonly field5: string;
>   readonly field6: number;
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
  
</details>

[`▲ top`][top]

---

### 3.2 Classes

Similar to other object-oriented programming languages, Wing uses classes as its first-class
composition pattern. 

Classes consist of fields and methods in any order.  
The class system is a single-dispatch class based object-orientated system.  
Classes are instantiated with the `new` keyword.

Classes are associated with a specific execution phase (preflight or inflight). The phase indicates
in which scope objects can be instantiated from this class.

If a [phase modifier](#13-phase-modifiers) is not specified, the class inherits the phase from the
scope in which it is declared. This implies that, if a class is declared at the root scope (e.g. the
program's entrypoint), it will be a *preflight class*. If a class is declared within an inflight
scope, it will be implicitly an inflight class.

A method that has the name **init** is considered to be a class
constructor (or initializer).

```TS
inflight class Name extends Base impl IMyInterface1, IMyInterface2 {
  // class fields
  _field1: num;
  _field2: str;
  
  init() {
    // constructor implementation
    // order is up to user
    this._field1 = 1;
    this._field2 = "sample";
  }

  // static method (access with Name.staticMethod(...))
  static staticMethod(arg: type, arg: type, ...) { /* impl */ }
  // visible to outside the instance
  publicMethod(arg:type, arg:type, ...) { /* impl */ }
}
```
If no `init()` is defined, the class will have a default constructor that does nothing.

Implicit default field initialization does not exist in Wing. All member fields must be
initialized in the constructor. Absent initialization is a compile error. All
field types, including the optional types must be initialized.

```TS
class Foo {
  x: num;
  init() { this.x = 1; }
}
class Bar {
  y: num;
  z: Foo;
  init() {
    this.y = 1;
    this.z = new Foo();
    this.log(); // OK to call here
  }
  public log() {
    log("${this.y}");
  }
}
let a = new Bar();
a.log(); // logs 1
```

Overloading methods is allowed. This means functions can be overloaded with many
signatures only varying in the number of arguments and their unique type order.
Overloading the constructor is also allowed.  
Inheritance is allowed with the `extends` keyword. `super` can be used to access
the base class, immediately up the inheritance chain (parent class).

Calling using the member access operator `.` before calling `super` in inherited
classes is forbidden. The behavior is similar to JavaScript and TypeScript in
their "strict" mode.

```TS
class Foo {
  x: num;
  init() { this.x = 0; }
  public method() { }
}
class Boo extends Foo {
  init() {
    // this.x = 10; // compile error
    super();
    this.x = 10; // OK
  }
}
```

Classes can inherit and extend other classes using the `extends` keyword.  
Classes can implement interfaces iff the interfaces do not contain `inflight`.

```TS
class Foo {
  x: num;
  init() { this.x = 0; }
  public method() { }
}
class Boo extends Foo {
  init() { super(); this.x = 10; }
}

```

Statics are not inherited. As a result, statics can be overridden mid hierarchy
chain. Access to statics is through the class name that originally defined it: 
`<class name>.Foo`.  

Multiple inheritance is invalid and forbidden.  
Multiple implementations of various interfaces is allowed.  
Multiple implementations of the same interface is invalid and forbidden.

In methods if return type is missing, `: void` is assumed.

[`▲ top`][top]

---

### 3.3 Preflight Classes

Classes declared within a preflight scope (the root scope) are implicitly bound to the preflight
phase. These classes can have specific `inflight` members.

For example:

```TS
// Wing Code:
class Foo {
  // preflight fields
  field1: num;
  field2: str;
  field3: bool;

  // re-assignable class fields (preflight, in this case), read about them in the mutability section
  var field4: num;
  var field5: str;

  // inflight fields
  inflight field6: num;
  inflight field7: str;
  inflight field8: bool;

  // preflight constructor
  init(field1: num, field2: str, field3: bool, field4: num, field5: str) { 
    /* initialize preflight fields */
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.field5 = field5;
  } 

  // inflight constructor
  inflight init() { 
    /* initialize inflight fields */
    this.field6 = 123;
    this.field7 = "hello";
    this.field8 = true;
  }
  
  // preflight methods
  foo1(arg: num): num { return arg; }
  boo1(): num { return 32; }

  // inflight methods
  inflight foo2(arg: num): num { return arg; }
  inflight boo2(): num { return 32; }
}
```

Preflight objects all have a scope and a unique ID. Compiler provides an implicit scope
and ID for each object.

The default for scope is `this`, which means the scope in which the object was
defined (instantiated). The implicit ID is the type name of the class iff the type
is the only preflight object of this type being used in the current scope. In other words, if
there are multiple preflight objects of the same type defined in the same scope, they
must all have an explicit id.

Preflight objects instantiated at block scope root level of entrypoint are assigned the
root app as their default implicit scope.

Preflight object instantiation syntax uses the `let` keyword the same way variables are declared in
Wing. The `as` keyword can be used to customize the identifier assigned to this
preflight object.

It is currently impossible to override the default scope of a preflight object (see [Support specifying scopes for preflight objects](https://github.com/winglang/wing/issues/2386)).

```pre
let <name>[: <type>] = new <Type>(<args>) [as <id>];
```

```TS
// Wing Code:
let a = new Foo(); // with default scope and id
let a = new Foo() as "custom-id"; // with user-defined id
let a = new Foo(...) as "custom-id2"; // with constructor arguments
```

"id" must be of type string. It currently cannot be a string literal with substitution
support (see https://github.com/winglang/wing/issues/1739).  

Preflight objects can be captured into inflight scopes and once that happens, inside
the capture block only the inflight members are available.

Preflight classes can extend other preflight classes (but not [structs](#31-structs)) and implement
[interfaces](#34-interfaces).

Declaration of fields of the same name with different phases is not allowed due to the requirement of
having inflight fields of same name being implicitly initialized by the compiler. Declaration 
of methods with different phases is not allowed as well.

[`▲ top`][top]

---

### 3.4 Interfaces

Interfaces represent a contract that a class must fulfill.
Interfaces are defined with the `interface` keyword.
Currently, preflight interfaces are allowed, while inflight interfaces are not supported yet (see [`inflight interface`: cannot reference interfaces instances from an inflight context](https://github.com/winglang/wing/issues/1961)).
`impl` keyword is used to implement an interface or multiple interfaces that are
separated with commas.

All methods of an interface are implicitly public and cannot be of any other
type of visibility (private, protected, etc.).
Return type is required for interface methods.

Interface fields are not supported.

> ```TS
> // Wing program:
> interface IMyInterface1 {
>   method1(x: num): str;
>   inflight method3(): void;
> }
>
> interface IMyInterface2 {
>   method2(): str; 
> }
>
> class MyResource impl IMyInterface1, IMyInterface2 {
>   field1: num;
>   field2: str;
>
>   init(x: num) {
>     this.field1 = x;
>     this.field2 = "sample";
>   }
>   method1(x: num): str {
>     return "sample: ${x}";
>   }
>   inflight method3(): void { }
>   method2(): str {
>     return this.field2;
>   }
> }
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> interface IMyInterface1 {
>   readonly field1: number;
>   method1(x: number): string;
> }
> interface IMyInterface2 {
>   readonly __inflight__field2: string;
>   __inflight__method2(): string;
> }
> // this is only shown as a hypothetical sample
> class MyResource extends constructs.Construct
>   implements IMyInterface1, IMyInterface2 {
>   public readonly field1: number;
>   public readonly __inflight__field2: string;
>   public __inflight__constructor() {
>     // inflight client initialization
>     this.field1 = x;
>     this.__inflight__field2 = "sample";
>   }
>   public __inflight__method2(): string {
>     return this.__inflight__field2;
>   }
>   public method1(x: number): string {
>     return `sample: ${x}`;
>   }
> }
> ```
  
</details>

[`▲ top`][top]

---

### 3.5 Variables

> Let let be let. (Elad B. 2022)

```pre
let [var] <name>[: <type>] = [<type>] <value>;
```

Assignment operator is `=`.  
Assignment declaration keyword is `let`.  
Type annotation is optional if a default value is given.  

> ```TS
> let n = 10;
> let s: str = "hello";
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> const n: number = 10;
> const s: string = "hello";
> ```
  
</details>

[`▲ top`][top]

---

### 3.6 Functions

#### 3.6.1 Closures

It is possible to create closures.  
It is not possible to create named closures.  
However, it is possible to create anonymous closures and assign to variables
(function literals). Inflight closures are also supported.

> ```TS
> // preflight closure:
> let f1 = (a: num, b: num) => { log("${a + b}"); };
> // inflight closure:
> let f2 = inflight (a: num, b: num) => { log("${a + b}"); };
> // OR:
> // preflight closure:
> let f4 = (a: num, b: num): void => { log("${a + b}"); };
> // inflight closure:
> let f5 = inflight (a: num, b: num): void => { log("${a + b}"); };
> ```

[`▲ top`][top]

---

#### 3.6.3 Struct Expansion

If the last argument of a function call is a struct, then the struct in the call
is "expandable" with a special `:` syntax.  
In this calling signature, order of struct members do not matter.  
Partial struct expansion in terms of supplying less number of arguments than the
number of fields on type of the struct expected is not allowed. Omitting `nil`s
is allowed with the same rules as explicit initialization in class constructors.

This style of expansion can be thought of as having positional arguments passed
in before the final positional argument, which if happens to be a struct, it can
be passed as named arguments. As a result of named arguments being passed in, it
is safe to omit optional struct fields, or have order of arguments mixed.

```TS
struct MyStruct {
  field1: num;
  field2: num;
}
let f = (x: num, y: num, z: MyStruct) => {
  log("${x + y + z.field1 + z.field2}");
};
// last arguments are expanded into their struct
f(1, 2, field1: 3, field2: 4);
// f(1, 2, field1: 3); // can't do this, partial expansion is not allowed
```

[`▲ top`][top]

---

### 3.7 Arrays

`Array`s are dynamically sized in Wing and are defined with the `[]` syntax.  
Individual array items are accessed using the `.at(index: num)` method.  
Arrays are similar to dynamically sized arrays or vectors in other languages.

> ```TS
> let arr1 = [1, 2, 3];
> let arr2 = ["a", "b", "c"];
> let arr3 = MutArray<str>["a1", "b2", "c3"];
> let l = arr1.length + arr2.length + arr3.length + arr1.at(0);
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> const arr1: readonly number[] = Object.freeze([1, 2, 3]);
> const arr2: readonly string[] = Object.freeze(["a", "b", "c"]);
> const arr3: string[] = ["a1", "b2", "c3"];
> const l = arr1.length + arr2.length + arr3.length + arr1[0];
> ```
  
</details>

[`▲ top`][top]

---

### 3.8 Enumeration

Enumeration type (`enum`) is a type that groups a list of named constant members.
Enumeration is defined by writing **enum**, followed by enumeration name and a
list of comma-separated constants in a {}. 
Naming convention for enums is to use "TitleCase" for name and ALL_CAPS for members.

> ```TS
> enum SomeEnum { ONE, TWO, THREE }
> enum MyFoo {
>   A,
>   B,
>   C,
> }
> let x = MyFoo.B;
> let y = x; // type is MyFoo
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> enum SomeEnum { ONE, TWO, THREE };
> enum MyFoo {
>   A,
>   B,
>   C,
> };
> const x: MyFoo = MyFoo.B;
> const y: MyFoo = x;
> ```
  
</details>

[`▲ top`][top]

---

### 3.10 Unit tests

Unit tests can be defined in Wing using the built-in test statement.
A test statement expects a name and a block of inflight code to execute.

```TS
let b = new cloud.Bucket();

test "can add objects" {
  b.put("key", "value");
  assert(b.get("key") == "value");
}
```

The behavior of running tests with `wing test` CLI command is determined by the `cloud.TestRunner` resource in the Wing SDK, which can be implemented for any compiler target.

See the [CLI User Manual](https://docs.winglang.io/reference/cli#test-wing-test) for more details on running tests.

[`▲ top`][top]

---

## 4. Module System

The module system in Wing uses the `bring` expression to reuse code.  
**bring** expression allows code to "import" functions, classes, and variables
from other files, to allow reusability.  
**bring** expression is only allowed at the top of the file before any other
code. Comments before the first bring expression are valid.

### 4.1 Imports

To import a JSII package under a named import, you may use the following
syntax:

```TS
bring util; // from util bring * as util;
bring cloud; // from cloud bring * as cloud;
bring "cdktf" as cdktf; // from "cdktf" bring * as cdktf;
```

[`▲ top`][top]

---

### 4.2 Exports

Wing currently does not not support exporting symbols from a module.

[`▲ top`][top]

---

## 5. Interoperability

## 5.1 JSII Interoperability

### 5.1.1 External Libraries

You may import JSII modules in Wing and they are considered preflight classes if their
JSII type manifest shows that the JSII module is a construct. Wing is a consumer
of JSII modules currently.

```TS
bring "aws-cdk-lib" as awscdk;
let bucket = new awscdk.aws_s3.Bucket(
  blockPublicAccess: awscdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
);
```

## 5.2 JavaScript

The `extern "<commonjs module path or name>"` modifier can be used on method declarations in classes to indicate that a method is backed by an implementation imported from a JavaScript module. The module can either be a relative path or a name and will be loaded via [require()](https://nodejs.org/api/modules.html#requireid).

In the following example, the static inflight method `makeId` is implemented
in `helper.js`:

```TS
// task-list.w
class TaskList {
  // ...
  
  inflight addTask(title: str) {
    let id1 = TaskList.makeId();
    let id2 = TaskList.v4();
    log(id1);
    log(id2);
    // ...
  }

  // Load js helper file
  extern "./helpers.js" static inflight makeId(): str;

  // Alternatively, you can use a module name
  extern "uuid" static inflight v4(): str;
} 

// helpers.js
const uuid = require("uuid");

exports.makeId = function () {
  return uuid.v4();
};
```

Given a method of name X, the compiler will map the method to the JavaScript export with the 
matching name (without any case conversion).

We currently only support specifying `extern` for static methods (either inflight or preflight).

### 5.2.1 TypeScript

It is possible to use TypeScript to write helpers, but at the moment this is not
directly supported by Wing. This means that you will need to setup the TypeScript toolchain
to compile your code to JavaScript and then use `extern` against the JavaScript file.

### 5.2.2 Type model

The table below shows the mapping between Wing types and JavaScript types, represented with TypeScript syntax.
When calling **extern** function, the arguments are checked against these declared types and the return type is **assumed** to be satisfied by the called function.

If [frozen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#description), the value is expected to be immutable and will throw an error if any attempt is made to modify it.

| Built-In Wing Type     | JavaScript Type                                                       | Frozen? |
|------------------------|-----------------------------------------------------------------------|---------|
| `void`                 | `undefined`                                                           |         |
| `nil`                  | `null`                                                                |         |
| `any`                  | `any`                                                                 |         |
| `num`                  | `number`                                                              |         |
| `str`                  | `string`                                                              |         |
| `bool`                 | `boolean`                                                             |         |
| `Set<T>`               | `Set<T>`                                                              | Yes     |
| `Map<T>`               | `{ [key: string]: T }`                                                | Yes     |
| `Array<T>`             | `T[]`                                                                 | Yes     |
| `MutSet<T>`            | `Set<T>`                                                              |         |
| `MutMap<T>`            | `{ [key: string]: T }`                                                |         |
| `MutArray<T>`          | `T[]`                                                                 |         |
| `Json`                 | `string ⏐ number ⏐ boolean ⏐ null ⏐ json[] ⏐ { [key: string]: json }` | Yes     |
| `MutJson`              | `string ⏐ number ⏐ boolean ⏐ null ⏐ json[] ⏐ { [key: string]: json }` |         |

| User-Defined Wing Types | JavaScript Type                                                                        | Frozen? |
|-------------------------|----------------------------------------------------------------------------------------|---------|
| `class`                 | `class`, only with members whose phase is compatible with the function signature       |         |
| `interface`             | `interface`, only with members whose phase is compatible with the function signature   |         |
| `struct`                | `interface`                                                                            | Yes     |
| `enum`                  | `string`-based enum-like `Object`                                                      | Yes     |

[`▲ top`][top]

---

## 6. Miscellaneous

### 6.1 Strings

String reference doc is available [here](https://docs.winglang.io/reference/sdk#string-).
Type of string is UTF-16 internally.  
All string declaration variants are multi-line.  

[`▲ top`][top]

---

#### 6.1.1 Normal strings "..."

The string inside the double quotes is processed, and all notations of form
`${<expression>}` are substituted from their respective scopes. The behavior is
similar to `` `text ${sub.prop}` `` notation in JavaScript.  
Processing unicode escape sequences happens in these strings.  
`"` can be escaped with backslash `\` inside string substitutions.

> ```TS
> let name = "World";
> let s = "Hello, ${name}!";
> let l = s.length;
> ```

<details><summary>Equivalent TypeScript Code</summary>

> ```TS
> const name = "World";
> const s = `Hello, ${name}!`; // with substitution
> const l = s.length; // length of string
> ```

</details>

[`▲ top`][top]

---

### 6.2 Comments

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

### 6.3 Operators

Unary operators are not supported except outline below.  
Arithmetic assignment operators are not supported.  
Ternary or conditional operators are not supported.

#### 6.3.1 Relational Operators

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

#### 6.3.2 Logical Operators

| Operator | Description          | Example    |
| -------- | -------------------- | ---------- |
| `&&`     | Logical AND operator | `a && b`   |
| `\|\|`   | Logical OR operator  | `a \|\| b` |
| `!`      | Logical NOT operator | `!a`       |

[`▲ top`][top]

---

#### 6.3.3 Mathematics Operators

| Operator | Description    | Example  |
| -------- | -------------- | -------- |
| `*`      | Multiplication | `a * b`  |
| `/`      | Division       | `a / b`  |
| `\`      | Floor Division | `a \ b`  |
| `%`      | Modulus        | `a % b`  |
| `+`      | Addition       | `a + b`  |
| `-`      | Subtraction    | `a - b`  |
| `**`     | Power          | `a ** b` |

[`▲ top`][top]

---

#### 6.3.4 Operator Precedence

| Operator             | Notes                                             |
| -------------------- | ------------------------------------------------- |
| ()                   | Parentheses                                       |
| **                   | Power                                    |
| -x                   | Unary minus                                       |
| \*, /, \\, %         | Multiplication, Division, Floor division, Modulus |
| +, -                 | Addition, Subtraction                             |
| ==, !=, >, >=, <, <= | Comparisons, Identity, operators                  |
| !                    | Logical NOT                                       |
| &&                   | Logical AND                                       |
| \|\|                 | Logical OR                                        |

Table above is in descending order of precedence.  
`=` operator in Wing does not return a value so you cannot do `let x = y = 1`.  
Operators of the same row in the table above have precedence from left to right
in the expression they appear in (e.g. `4 * 2 \ 3`). In other words, order is
determined by associativity.

[`▲ top`][top]

---

#### 6.3.5 Short Circuiting

For the built-in logical NOT operators, the result is `true` if the operand is
`false`. Otherwise, the result is `false`.

For the built-in logical AND operators, the result is `true` if both operands
are `true`. Otherwise, the result is `false`. This operator is short-circuiting
if the first operand is `false`, and the second operand is not evaluated.

For the built-in logical OR operators, the result is `true` if either the first
or the second operand (or both) is `true`. This operator is short-circuiting if
the first operand is `true`, and the second operand is not evaluated.

Note that bitwise logic operators do not perform short-circuiting.

In conditionals, if an optional type is used as the only r-value expression of
the condition statement, it's equivalent to checking it against `nil`. Note that
using a `bool?` type in this short-circuit is a compile error due to ambiguity.
Using a `nil?` type is also ambiguous and results in a compile error.

```TS
let x: num? = 1;
if x? {
  // ...
}
```

Which is equivalent to:

```TS
let x: num? = 1;
if x != nil {
  // ...
}
```

[`▲ top`][top]

---

#### 6.3.6 Equality

Of the operators supported, the following can be used with non-numeric operands:

- `==`: can be used to check for equality of types and values in operands.
- `!=`: can be used to check for inequality of types and values in operands.

When these operators are used on immutable data, values are checked for equality
as well as types. When these operators are used on mutable data, types and refs
are checked for equality. Concept of "refs" is loosely defined as "any object"
that's instantiated through a class currently and then gets reassigned to other
names until a mutable method is called on it, which then turns into a new "ref".

This behavior is the same as JavaScript with the addition of structural equality
for immutable data (on top of nominal typing).

[`▲ top`][top]

---

### 6.6 Credits

* **Contributors (A-Z):**
  * Chris R. ([@Chriscbr](https://github.com/Chriscbr))
  * Cristian P. ([@skyrpex](https://github.com/skyrpex))
  * Elad B. ([@eladb](https://github.com/eladb))
  * Eyal K. ([@ekeren](https://github.com/ekeren))
  * Hasan AR. ([@hasanaburayyan](https://github.com/hasanaburayyan))
  * Mark MC. ([@MarkMcCulloh](https://github.com/MarkMcCulloh))
  * Pol A. ([@polamoros](https://github.com/polamoros))  
  * Revital B. ([@revitalbarletz](https://github.com/revitalbarletz))  
  * Sepehr L. ([@3p3r](https://github.com/3p3r))  
  * Shai A. ([@ainvoner](https://github.com/ainvoner))
  * Shai B. ([@ShaiBer](https://github.com/ShaiBer))
  * Tsuf C. ([@tsuf239](https://github.com/tsuf239))
  * Uri B. ([@staycoolcall911](https://github.com/staycoolcall911))
  * Yoav S. ([@yoav-steinberg](https://github.com/yoav-steinberg))  

[top]: #0-preface


