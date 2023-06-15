---
title: Equality
id: equality
description: A reference guide to equality in Wing.
keywords: [equality, equals, identity]
---

Checking for equality is performed with the `==` operator. It returns `true` if the two values are equal, and `false` otherwise.

> The main difference between equality in JavaScript and Wing is that `==` in Wing is not allowed to compare values of different types. For example, `1 == "1"` is not allowed in Wing, and will result in a compile-time error.

Equality in Wing is a symmetric and transitive relationship - that is, (1) if `a == b`, then `b == a`, and (2) if `a == b` and `b == c`, then `a == c`.

The execution phase ([preflight or inflight](../02-core-concepts/01-preflight-and-inflight.md)) that a value was created in does not affect its equality. For example, a value created in preflight can be equal to a value created in inflight.

Some types are compared *by value*, which means that two values are equal if their contents are equivalent. For example, two `str` values are equal if they have the same characters in the same order, even if they are stored in different places in memory.

Other types are compared *by reference*, which means that two values are equal if they point to the same object in memory. For example, two functions are equal if they are the same object, even if they have the same code.

The following is a set of rules for checking equality:

## Basic types

Basic types are compared *by value*.

1. Two `str` values are equal if they have the same characters in the same order.
2. Two `num` values are equal if they have the same floating-point value. The [IEEE 754] standard is used for storing numbers, which means that for example `-0 == +0`. `NaN` is not equal to any value, including itself.
3. Two `bool` values are equal if they are both `true` or both `false`.
4. Two `duration` values are equal if they have the same number of milliseconds.
5. Two `T?` types (optional `T` values) are equal if they are both empty (`nil`) or both non-empty, and if they are both non-empty, their inner values are equal. A value of type `T?` is never equal to a value of type `T`.

[IEEE 754]: https://en.wikipedia.org/wiki/IEEE_754

> *Note*: Equality checking for `duration` is not fully implemented. See [#2941](https://github.com/winglang/wing/issues/2941).

## Collection types

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


## Function types

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

## Enums

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

## Classes and interfaces

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

## `Json`

Two `Json` values are equal if they contain the same structure and values. Another way to think about it is the two `Json` values are equal if their stringified representation is equal. The following rules apply:

1. Two `Json` values are equal if they are both `null`.
2. Two `Json` values are equal if they are both `bool` values and are equal.
3. Two `Json` values are equal if they are both `num` values and are equal.
4. Two `Json` values are equal if they are both `str` values and are equal.
5. Two `Json` values are equal if they are both `Array` values and are equal.
6. Two `Json` values are equal if they are both `Map` values and are equal.

```js
assert(Json nil == Json nil); // TODO: https://github.com/winglang/wing/issues/1819
assert(Json true == Json true);
assert(Json false == Json false);
assert(Json 1 == Json 1);
assert(Json -0.42 == Json -0.42);
assert(Json "foo" == Json "foo");
assert(Json [1, 2, 3] == Json [1, 2, 3]);
assert(Json { "foo": 1, "bar": 2 } == Json { "foo": 1, "bar": 2 });
```

> *Note*: `Json` equality is not fully implemented. See [#2938](https://github.com/winglang/wing/issues/2938), [#2937](https://github.com/winglang/wing/issues/2937).

## Structs

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
