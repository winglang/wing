---
title: Wing Programming Language Reference
id: language-reference
description: The Wing Language Reference
sidebar_label: Language Reference
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

[`▲ top`][top]

---

#### 1.1.3 Function Types

Function type annotations are written as if they were closure declarations, with
the difference that body is replaced with return type annotation. 

The `inflight` modifier indicates that a function is an inflight function.  
`inflight` in Wing implies `async` in JavaScript.

```pre
(arg1: <type1>, arg2: <type2>, ...): <returnType> => <type>
inflight (arg1: <type1>, arg2: <type2>, ...): <returnType> => <type>
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
> ```

[`▲ top`][top]

---

#### 1.1.4 Json type

> 🚧 Json support is still a work in progress 🚧<br/>
> Check out the [roadmap](#1149-roadmap) section below, to see what parts are still not implemented.

Wing has a primitive data type called `Json`. This type represents an immutable untyped [JSON
value](https://www.json.org/json-en.html), including JSON primitives (`string`, `number`,
`boolean`), arrays (both heterogenous and homogenous) and objects (key-value maps where keys are
strings and values can be any other JSON value).

`Json` objects are immutable and can be referenced across inflight context.

JSON is the "wire protocol of the cloud" and as such Wing offers built-in support for it. However,
since Wing is statically-typed (type must be known during compilation) and JSON is dynamically typed
(type is only known at runtime), bridging is required between these two models.

Let's look at a quick example:
```js
struct Employee { 
  id: str;
  name: str;
}

let response = http.get("/employees"); 
 // returns something like { "items": [ { "id": "12234", "name": "bob" }, ... ] }

let employees = Array<Employee>.fromJson(response.get("items")); //NOTE: Array.fromJson is currently not implemented

for e in employees {
  log("hello, ${e.name}, your employee id is ${e.id}");
}
```
In the above example, the `http.get` function returns a `Json` object from the server that has a
single field `items`, with a JSON array of JSON objects, each with an `id` and `name` fields.

The expression `response.get("items")` returns a `Json` array, and we use `Array<T>.fromJson` to 
convert this array from `Json` to an `Array<Employee>`. Note that by default `fromJson` will 
perform schema validation on the array and on each item (based on the declaration of the `Employee`
struct).

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
log("${jsonObj.get("boom").get("dude").get("world")}");
// ERROR: Cannot read properties of undefined (reading 'world')
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

##### 1.1.4.3 Assignment from native types

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

##### 1.1.4.4 Assignment to native types

If the `Json` object is statically known to structurally match a certain type, it is possible 
to assign it to a variable of that type with no runtime cost:

```TS
let j = Json "hello";
let s: str = j;

struct J2 { a: num; }
let j2: J2 = { a: 2 }
```

This can only be done when the `Json` literal is present in the program. Otherwise, we cannot
guarantee safety.

```TS
let response = http.get("/employees");
let s: str = response;
//           ^ cannot assign `Json` to `str`.
```

To dynamically assign a `Json` to a strong-type variable, use the `fromJson()` static method on the target
type:

```TS
let myStr = str.fromJson(jsonString);
let myNumber = num.fromJson(jsonNumber);
```

##### 1.1.4.5 Schema validation

All `fromJson()` methods will validate that the runtime type is compatible with the target type in
order to ensure type safety (at a runtime cost):

```TS
str.fromJson(jsonNumber);      // RUNTIME ERROR: unable to parse number `123` as a string.
num.fromJson(Json "\"hello\""); // RUNTIME ERROR: unable to parse string "hello" as a number
```

For each `fromJson()`, there is a `tryFromJson()` method which returns an optional `T?` which
indicates if parsing was successful or not:
```js
let s = str.tryFromJson(myJson) ?? "invalid string";
``````

##### 1.1.4.6 Mutability

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

Use the `Json.deepCopyMut(MutJson json)` method to get an mutable *deep copy* of a `Json` object.
Use the `MutJson.deepCopy(Json json)` method to get an immutable *deep copy* of a `MutJson` object:

```TS
let mutObj = MutJson { hello: 123 };
let immutObj = MutJson.deepCopy(mutObj);
mutObj.set("hello", 999);
assert(immutObj.get("hello") == 123);
```

To delete a key from an object, use the `Json.delete()` method:

```TS
let myObj = MutJson { hello: 123, world: 555 };
Json.delete(myObj, "world");

let immutObj = Json { hello: 123 };
Json.delete(immutObj, "hello");
//          ^^^^^^^^^ expected `JsonMut`
```

##### 1.1.4.7 Assignment to user-defined structs
All [structs](#31-structs) also have a `fromJson()` method that can be used to parse `Json` into a
struct:
```js
struct Contact {
  first: str;
  last: str;
  phone: str?;
}

let j = Json { first: "Wing", last: "Lyly" };
let myContact = Contact.fromJson(j);
assert(myContact.first == "Wing");
```
When a `Json` is parsed into a struct, the schema will be validated to ensure the result is
type-safe:
```js
let p = Json { first: "Wing", phone: 1234 };
Contact.fromJson(p);
// RUNTIME ERROR: unable to parse Contact:
// - field "last" is required and missing
// - field "phone" is expected to be a string, got number.
```

##### 1.1.4.8 Serialization

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

##### 1.1.4.9 Logging

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

#### 1.1.4.10 Roadmap

The following features are not yet implemented, but we are planning to add them in the future:

* Array/Set/Map.fromJson() - see https://github.com/winglang/wing/issues/1796 to track.
* Json.entries() - see https://github.com/winglang/wing/issues/3142 to track.
* Equality, diff and patch - see https://github.com/winglang/wing/issues/3140 to track.

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

#### 1.1.6 `Datetime`

The `Datetime` (alias `datetime`) type represents a single moment in time in a platform-independent
format.
Datetime objects are immutable and can be referenced across inflight context.
Here is the initial API for the Datetime type:

```TS
struct DatetimeComponents {
  year: num;
  month: num;
  day: num;
  hour: num;
  min: num;
  sec: num;
  ms: num;
  tz: num; // timezone offset in minutes from UTC
}

class Datetime {
  static utcNow(): Datetime;             // returns the current time in UTC timezone
  static systemNow(): Datetime;          // returns the current time in system timezone
  static fromIso(iso: str): Datetime;    // creates an instance from an ISO-8601 string, represented in UTC timezone
  static fromComponents(c: DatetimeComponents): Datetime;

  timestamp: num;     // Date.valueOf()/1000 (non-leap seconds since epoch)
  timestampMs: num;  // Date.valueOf() (non-leap milliseconds since epoch)

  hours: num;         // Date.getHours()
  min: num;           // Date.getMinutes()
  sec: num;           // Date.getSeconds()
  ms: num;            // Date.getMilliseconds()
  dayOfMonth: num;    // Date.getDate()
  dayOfWeek: num;     // Date.getDay()
  month: num;         // Date.getMonth()
  year: num;          // Date.getFullYear()

  timezone: num;      // (offset in minutes from UTC)
  utc: Datetime;      // returns the same time in UTC timezone

  toIso(): str;      // returns ISO-8601 string
}
```

A few examples:

```TS
let now = Datetime.utcNow();
log("It is now ${now.month}/${now.dayOfMonth}/${now.year} at ${now.hours}:${now.min}:${now.sec})");
assert(now.timezone == 0); // UTC

let t1 = DateTime.fromIso("2023-02-09T06:20:17.573Z");
log("Timezone is GMT${d.timezone() / 60}"); // output: Timezone is GMT-2
log("UTC: ${t1.utc.toIso())}");            // output: 2023-02-09T06:21:03.000Z
```


### 1.2 Utility Functions

| Name     | Extra information                                        |
| -------- | -------------------------------------------------------- |
| `log`    | logs str                                                 |
| `assert` | checks a condition and _throws_ if evaluated to false    |

> ```TS
> log("Hello ${name}");
> assert(x > 0);
> ```

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

### 1.5 Reassignability

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

### 1.6 Optionality

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

#### 1.6.1 Declaration

##### 1.6.1.1 Struct fields

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

##### 1.6.1.2 Variables

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

##### 1.6.1.3 Class fields

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

##### 1.6.1.4 Function arguments

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

##### 1.6.1.5 Function return types

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

#### 1.6.2 Testing using `x?`

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

#### 1.6.3 Unwrapping using `if let`

The `if let` statement (or `if let var` for a reassignable variable) can be used to test if an 
optional is defined and *unwrap* it into a non-optional variable defined inside the block:

```TS
if let address = myPerson.address {
  log("${address.length}");
  log(address); // type of address is `str`
}
```

> NOTE: `if let` is not the same as `if`. For example, we currently don't support specifying
> multiple conditions, or unwrapping multiple optionals. This is something we might consider in the
> future.

#### 1.6.4 Unwrapping or default value using `??`

The `??` operator can be used to unwrap or provide a default value. This returns a value of `T` that
can safely be used.

```TS
let address: str = myPerson.address ?? "Planet Earth";
```

#### 1.6.5 Optional chaining using `?.`

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

#### 1.6.6 Roadmap

The following features are not yet implemented, but we are planning to add them in the future:

* Default value: the default value notation (`= y`) may appear in declarations of struct fields, class fields or function arguments.
  See https://github.com/winglang/wing/issues/3121 to track.
* Chaining `??` operations: the `x ?? y ?? z` notation will return the value in `x` if there is one, `y` otherwise or `z`. The last expression in a `??` chain (e.g. `z`) must be of type `T` (not `T?`).
  See https://github.com/winglang/wing/issues/1875 to track.
* The `x ??= y` notation returns `x` if it has a value or assigns `x` with `y` and returns the value of `y`.
  See https://github.com/winglang/wing/issues/2103 to track.
* `x ?? throw("message")` to unwrap `x` or throw if `x` is not defined.
  See https://github.com/winglang/wing/issues/2103 to track.
* `x ??= value` returns `x` or assigns a value to it and returns it to support lazy
  evaluation/memoization (inspired by [Nullish coalescing
  assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment)).
  See https://github.com/winglang/wing/issues/2103 to track.
* Support `??` for different types if they have a common ancestor (and also think of interfaces).
  See https://github.com/winglang/wing/issues/2103 to track.

### 1.7 Type Inference

Type can optionally be put between name and the equal sign, using a colon.  
Partial type inference is allowed while using the `?` keyword immediately after
the variable name.

When type annotation is missing, type will be inferred from r-value type.  
r-value refers to the right hand side of an assignment here.

All defined symbols are immutable (constant) by default.  
Type casting is generally not allowed unless otherwise specified.

Type annotations are required for method arguments and their return value but optional for anonymous closures.

> ```TS
> let i = 5;
> let m = i;
> let arrOpt: MutArray<num>? = MutArray<num> [];
> let arr = Array<num>[];
> let copy = arr;
> let i1: num? = nil;
> let i2: num? = i;
> ```

[`▲ top`][top]

---

### 1.8 Error Handling

Exceptions and `try/catch/finally` are the error mechanism. Mechanics directly
translate to JavaScript. You can create a new exception with a `throw` call.

In the presence of `try`, both `catch` and `finally` are optional but at least one of them must be present.
In the presence of `catch` the variable holding the exception (`e` in the example below) is optional.

`throw` is meant to be recoverable error handling.

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

[`▲ top`][top]

---

### 1.9 Recommended Formatting

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

### 1.10 Memory Management

There is no implicit memory de-allocation function, dynamic memory is managed by
Wing and is garbage collected (relying on JSII target GC for the meantime).

[`▲ top`][top]

---

### 1.11 Execution Model

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

[`▲ top`][top]

---

### 1.12 Asynchronous Model

Wing builds upon the asynchronous model of JavaScript currently and expands upon
it with new keywords and concepts. The `async` keyword of JavaScript is replaced
with `inflight` in Wing deliberately to indicate extended functionality.

Main concepts to understand:

- `preflight` implies synchronous execution.
- `inflight` implies asynchronous execution.

Contrary to JavaScript, any call to an async function is implicitly awaited in Wing.

#### 1.12.1 Roadmap

The following features are not yet implemented, but we are planning to add them in the future:

* `await`/`defer` statements - see https://github.com/winglang/wing/issues/116 to track.
* Promise function type - see https://github.com/winglang/wing/issues/1004 to track.

### 1.13 Roadmap

Access modifiers (`private`/`public`/`internal`/`protected`) are not yet implemented.
See https://github.com/winglang/wing/issues/108 to track.

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
  
[`▲ top`][top]

---

### 2.5 if

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

[`▲ top`][top]

---

### 2.6 for

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
> for item in set {
>   log("${item}");
> }
> for item in 0..100 {
>   log("${item}"); // prints 0 to 99
> }
> ```

[`▲ top`][top]

---

### 2.7 while

The **while** statement evaluates a condition, and if it is true, a set of statements is repeated until the condition is false.

> ```TS
> // Wing program:
> while callSomeFunction() {
>   log("hello");
> }
> ```

[`▲ top`][top]

---

### 2.8 throw

The **throw** statement raises a user-defined exception, which must be a string expression.
Execution of the current function will stop (the statements after throw won't be executed), and control will be passed to the first catch block in the call stack.
If no catch block exists among caller functions, the program will terminate.
(An uncaught exception in preflight causes a compilation error, while an uncaught exception in inflight causes a runtime error.)

> ```TS
> // Wing program:
> throw "Username must be at least 3 characters long.";
> ```

[`▲ top`][top]

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

Overloading methods is currently not allowed. This means functions cannot be overloaded with many
signatures only varying in the number of arguments and their unique type order.
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

#### Roadmap

The following features are not yet implemented, but we are planning to add them in the future:

* Overloading class methods (including `init`) - see https://github.com/winglang/wing/issues/3123 to track.
* Overriding class methods - see https://github.com/winglang/wing/issues/1124 to track.
* Using the `final` keyword to stop the inheritance chain - see https://github.com/winglang/wing/issues/460 to track. 

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
Wing. The `as` and `in` keywords can be used to customize the identifier and scope assigned to this
preflight object respectively.

```pre
let <name>[: <type>] = new <Type>(<args>) [as <id>] [in <scope>];
```

```TS
// Wing Code:
let a = new Foo(); // with default scope and id
let a = new Foo() in scope; // with user-defined scope
let a = new Foo() as "custom-id" in scope; // with user-defined scope and id
let a = new Foo(...) as "custom-id2" in scope; // with constructor arguments
```
"id" must be of type string. It can also be a string literal with substitution
support (normal strings as well as shell strings).  
"scope" must be an expression that resolves to a preflight object.

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
Currently, preflight interfaces are allowed, while inflight interfaces are not supported yet (see https://github.com/winglang/wing/issues/1961).
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
`var` keyword after `let` makes a variable mutable.

> ```TS
> let n = 10;
> let s: str = "hello";
> s = "world"; // error: Variable is not reassignable
> ```

> ```TS
> let var s = "hello";
> s = "hello world"; // compiles
> ```

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

#### 3.6.2 Struct Expansion

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

#### 3.6.3 Variadic Arguments
When a function signature's final parameter is denoted by `...` and annotated as an `Array` type,
then the function accepts typed variadic arguments. 
Inside the function, these arguments can be accessed using the designated variable name, 
just as you would with a regular array instance.
```TS
let f = (x: num, ...args: Array<num>) => {
  log("${x + args.length}");
};
// last arguments are expanded into their array
f(4, 8, 15, 16, 23, 42); // logs 9
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

[`▲ top`][top]

---

### 3.9 Unit tests

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

See the [Test Concenpt Doc](https://www.winglang.io/docs/concepts/tests) for more details on running tests.

### 3.10 Roadmap

The following features are not yet implemented, but we are planning to add them in the future:

* Computed properties (syntactic sugar for getters and setters) - see https://github.com/winglang/wing/issues/128 to track.

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

Wing currently does not not support exporting symbols from a module - see https://github.com/winglang/wing/issues/129 to track.

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

Extern methods do not support access to class's members through `this`, so they must be declared `static`.

### 5.2.1 TypeScript

It is possible to use TypeScript to write helpers, but at the moment this is not
directly supported by Wing. This means that you will need to setup the TypeScript toolchain
to compile your code to JavaScript and then use `extern` against the JavaScript file.

### 5.2.2 Type model

The table below shows the mapping between Wing types and JavaScript values, shown with TypeScript types.
When calling **extern** function, the parameter and return types are **assumed** to be satisfied by the called function.


| Built-in Wing type        | TypeScript type                                                       |
|---------------------------|-----------------------------------------------------------------------|
| `void`                    | `undefined`                                                           |
| `nil`                     | `null`                                                                |
| `any`                     | `any`                                                                 |
| `num`                     | `number`                                                              |
| `str`                     | `string`                                                              |
| `bool`                    | `boolean`                                                             |
| `Set<T>`, `MutSet<T>`     | `Set<T>`                                                              |
| `Map<T>`, `MutMap<T>`     | `{ [key: string]: T }`                                                |
| `Array<T>`, `MutArray<T>` | `Array<T>`                                                            |
| `Json`, `MutJson`         | `string ⏐ number ⏐ boolean ⏐ null ⏐ Json[] ⏐ { [key: string]: Json }` |

| User-defined Wing type  | TypeScript type                                                                        |
|-------------------------|----------------------------------------------------------------------------------------|
| `class`                 | `class`, only with members whose phase is compatible with the function signature       |
| `interface`             | `interface`, only with members whose phase is compatible with the function signature   |
| `struct`                | `interface`                                                                            |
| `enum`                  | `string`-based enum-like `Object`                                                      |

[`▲ top`][top]

---

## 6. Miscellaneous

### 6.1 Equality

Checking for equality is performed with the `==` operator. It returns `true` if the two values are equal, and `false` otherwise. Similarly, inequality is performed with the `!=` operator.

> The main difference between equality in JavaScript and Wing is that `==` in Wing is not allowed to compare values of different types. For example, `1 == "1"` is not allowed in Wing, and will result in a compile-time error.

Equality in Wing is a symmetric and transitive relationship - that is, (1) if `a == b`, then `b == a`, and (2) if `a == b` and `b == c`, then `a == c`.

The execution phase ([preflight or inflight](/docs/concepts/inflights)) that a value was created in does not affect its equality. For example, a value created in preflight can be equal to a value created in inflight.

Some types are compared *by value*, which means that two values are equal if their contents are equivalent. For example, two `str` values are equal if they have the same characters in the same order, even if they are stored in different places in memory.

Other types are compared *by reference*, which means that two values are equal if they point to the same object in memory. For example, two functions are equal if they are the same object, even if they have the same code.

The following is a set of rules for checking equality:

#### 6.1.1 Basic types

Basic types are compared *by value*.

1. Two `str` values are equal if they have the same characters in the same order.
2. Two `num` values are equal if they have the same floating-point value. The [IEEE 754] standard is used for storing numbers, which means that for example `-0 == +0`. `NaN` is not equal to any value, including itself.
3. Two `bool` values are equal if they are both `true` or both `false`.
4. Two `duration` values are equal if they have the same number of milliseconds.
5. Two `T?` types (optional `T` values) are equal if they are both empty (`nil`) or both non-empty, and if they are both non-empty, their inner values are equal. A value of type `T?` is never equal to a value of type `T`.

[IEEE 754]: https://en.wikipedia.org/wiki/IEEE_754

> *Note*: Equality checking for `duration` is not fully implemented. See [#2941](https://github.com/winglang/wing/issues/2941).

#### 6.1.2 Collection types

Wing contains six collection types: `Array`, `MutArray`, `Map`, `MutMap`, `Set`, and `MutSet`. The following rules apply to all of them:

1. Two collections are equal if they have the same number of elements, and if each element in the first collection is equal to the corresponding element in the second collection (according to the rules of equality of that type). The order of elements only matters for `Array` and `MutArray`.
2. The mutability of a collection does not affect its equality. In other words, a `MutArray` is equal to an `Array` with the same elements, and a `MutMap` is equal to a `Map` with the same keys and values.
3. Only collections of the same "kind" can be equal. For example, an `Array` cannot be equal to a `Map`, and a `MutArray` cannot be equal to a `MutMap`.

```js
assert(Array<num>[1, 2, 3] == Array<num>[1, 2, 3]);
assert(Array<num>[1, 2, 3] != Array<num>[3, 2, 1]);
assert(MutArray<num>[1, 2, 3] == Array<num>[1, 2, 3]);

assert(Map<str>{"a": "1", "b": "2"} == Map<str>{"a": "1", "b": "2"});
assert(Map<str>{"a": "1", "b": "2"} == Map<str>{"b": "2", "a": "1"});

assert(Set<num>{1, 2, 3} == Set<num>{1, 2, 3});
assert(Set<num>{1, 2, 3} == Set<num>{3, 2, 1});
```

> *Note*: Collection type equality checking is not fully implemented. See [#2867](https://github.com/winglang/wing/issues/2867), [#2940](https://github.com/winglang/wing/issues/2940).


#### 6.1.3 Function types

Two functions are equal if they are both the same object (by reference). This means that two functions that have the same code are not necessarily equal, since they may have been defined in different places.

```js
let f1 = (x: num): num => { return x + 1; };
let f2 = (x: num): num => { return x + 1; };
let f3 = f1;

assert(f1 != f2);
assert(f1 == f3);
```

Functions can only be compared if they have the same signature (including its execution phase). For example, a function defined in preflight cannot be compared to a function defined in inflight, even if they have the same code.

```js
let f1 = (x: num): num => { return x + 1; }; // (preflight)
let f2 = inflight (x: num): num => { return x + 1; };

assert(f1 != f2); // compile error (can't compare different types)
```

#### 6.1.4 Enums

Two enum values are equal if they refer to the same case.

```js
enum PizzaTopping {
  CHEESE,
  PINEAPPLE,
}

let topping1 = PizzaTopping.CHEESE;
let topping2 = PizzaTopping.CHEESE;
let topping3 = PizzaTopping.PINEAPPLE;

assert(topping1 == topping2);
assert(topping1 != topping3);
```

#### 6.1.5 Classes and interfaces

Two class instances or interface-satisfying objects are equal if they are the same instance (by reference). This means that two class instances, or interface-satisfying objects that have the same data are not necessarily equal, since they may have been created in different places.

```js
class Shop {
  hats: num;
  init(hats: num) {
    this.hats = hats;
  }
}

let shop1 = new Shop(1) as "Shop1";
let shop2 = new Shop(1) as "Shop2";
let shop3 = shop1;

assert(shop1 != shop2);
assert(shop1 == shop3);
```

#### 6.1.6 Json

Two `Json` values are equal if they contain the same structure and values. Another way to think about it is the two `Json` values are equal if their stringified representation is equal. The following rules apply:

1. Two `Json` values are equal if they are both `null`.
2. Two `Json` values are equal if they are both `bool` values and are equal.
3. Two `Json` values are equal if they are both `num` values and are equal.
4. Two `Json` values are equal if they are both `str` values and are equal.
5. Two `Json` values are equal if they are both `Array` values and are equal.
6. Two `Json` values are equal if they are both `Map` values and are equal.

```js
assert(Json true == Json true);
assert(Json false == Json false);
assert(Json 1 == Json 1);
assert(Json -0.42 == Json -0.42);
assert(Json "foo" == Json "foo");
assert(Json [1, 2, 3] == Json [1, 2, 3]);
assert(Json { "foo": 1, "bar": 2 } == Json { "foo": 1, "bar": 2 });
```

> *Note*: `Json` equality is not fully implemented. See [#2938](https://github.com/winglang/wing/issues/2938), [#2937](https://github.com/winglang/wing/issues/2937).

#### 6.1.7 Structs

Two structs are equal if they have the same type and all of their fields are equal (based on rules of equality of their type).

```js
struct Cat {
  name: str;
  age: num;
}
struct Dog {
  name: str;
  age: num;
}

let cat1 = Cat { name: "Mittens", age: 3 };
let cat2 = Cat { name: "Mittens", age: 3 };
let cat3 = Cat { name: "Mittens", age: 4 };
let dog = Dog { name: "Mittens", age: 3 };

assert(cat1 == cat2); // fields and types match
assert(cat1 != cat3); // field "age" does not match
assert(cat1 != dog); // compile time error (can't compare different types)
```

> *Note*: Struct equality is not fully implemented. See [#2939](https://github.com/winglang/wing/issues/2939).

### 6.2 Strings

String reference doc is available [here](https://www.winglang.io/docs/standard-library/std/api-reference#string-).
Type of string is UTF-16 internally.  
All string declaration variants are multi-line.  

[`▲ top`][top]

---

#### 6.2.1 Normal strings "..."

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

[`▲ top`][top]

---

### 6.3 Comments

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

### 6.4 Operators

Unary operators are not supported except outline below.  
Arithmetic assignment operators are not supported.  
Ternary or conditional operators are not supported.

#### 6.4.1 Relational Operators

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

#### 6.4.2 Logical Operators

| Operator | Description          | Example    |
| -------- | -------------------- | ---------- |
| `&&`     | Logical AND operator | `a && b`   |
| `\|\|`   | Logical OR operator  | `a \|\| b` |
| `!`      | Logical NOT operator | `!a`       |

[`▲ top`][top]

---

#### 6.4.3 Mathematics Operators

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

#### 6.4.4 Operator Precedence

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

#### 6.4.5 Short Circuiting

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

### 6.5 Roadmap

- [ ] Asynchronous Execution Safety Model.
- [ ] Make the language `async` by default.
- [ ] First class support for `regex`, `glob`, and `cron` types.
- [ ] Support of math operations over `date` and `duration` types.
- [ ] More useful enums: Support for Enum Classes and Swift style enums.
- [ ] Reflection: add an extended `typeof` operator to get type information.
- [ ] Advanced OOP: Support for `abstract` and `private` implementations.
- [ ] Enforce naming conventions on public APIs (required by JSII).
- [ ] Develop a conformance test suite for ISO certification.
- [ ] Launch a formal spec site with ECMA standards.
- [ ] Built-in automatic formatter and linter.
- [ ] Distributed concurrency primitives.
- [ ] Distributed data structures.

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
