# Wing for JavaScript Developers

> This is under construction, let us know how we can make it better!

## Primitives

* `str`, `num`, `bool`
* `Array<T>`, `MutArray<T>`
* `Set<T>`, `MutSet<T>`
* `Map<T>`, `MutMap<T>`

## Assignment

```js
let x = 12;
x = 77; // ERROR: x is non reassignable
```

```js
let var y = "hello";
y = "world"; // OK (y is reassignable)
```

## Control Flow

```js
for i in iterable {
  break;
  continue;
}
```

```js
if condition {

} elif condition {

} else {

}
```

```js
while condition {
  break;
  continue;
}
```

## Classes

```js
class Foo extends Bar implements IBlink {
  field1: str;     // <-- readonly
  var field2: num; // <-- reassignable
  inflight field3: Array<str>;

  init() {
    // constructor
    this.field1 = "hello";
    this.field2 = 123;
  }

  setField3(value: num): num {
    this.field3 = value;
  }

  inflight init() {
    // initialize the inflight client
    this.field3 = [];
  }

  inflight doStuff(h: num) {
    // all code is async and runs on the cloud
  }
}
```

```js
inflight class {
  // all members are inflight
}
```

## Functions

```js
let dup = (s: str, count: num): str => {
  // code
};

// is equivalent (unsupported YET):

fn dup(s: str, counter: num): str {
  // code
}
```

```js
let handler = inflight (message: str): void => {
  // code
};
```

```js
struct Options {
  prefix: str;
  delim: str?;
}

let join_str = (a: Array<str>, opts: Options) => {
  let delim = opts.delim ?? ".";
  return prefix + a.join(delim);
};

assert(join_str(["hello", "world"], "!") == "!hello.world");
assert(join_str(["hello", "world"], "!!", delim: "/") == "!!hello/world");
```

## Structs

```js
struct Another {
  hello: str;
}

struct MyData {
  a: str;
  b: num?;
  c: Another,
}

let data = MyData {
  a: "hello",
  c: {
    hello: "two"
  }
};

assert(data.a == "hello");
```

## Optionality

```js
let var x: str? = "hello";

if x? {
  print("x has a value")
}

let y = x ?? zz ?? "default-value";

x = nil;
```

```js
struct Foo {
  optValue: num?;
}
```

```js
fn my_func(x: str, y: num?) {
  // code
}
```

## Utility Functions

* `log(s)`
* `throw(s)`
* `assert(condition)`

# TODO

* [ ] JSON support
* [ ] enums
* [ ] `duration`
* [ ] `bring`
