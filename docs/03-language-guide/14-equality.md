---
title: Equality
id: equality
description: A reference guide to equality in Wing.
keywords: [equality, equals, identity]
---

Checking for equality is performed with the `==` operator. It returns `true` if the two values are equal, and `false` otherwise.

The main difference between equality in JavaScript and Wing is that `==` in Wing is not allowed to compare values of different types. For example, `1 == "1"` is not allowed in Wing, and will result in a compile-time error.

The execution phase ([preflight or inflight](../02-core-concepts/01-preflight-and-inflight.md)) that a value was created in does not affect its equality. For example, a value created in preflight can be equal to a value created in inflight.

Equality in Wing is a symmetric and transitive relationship - that is, (1) if `a == b`, then `b == a`, and (2) if `a == b` and `b == c`, then `a == c`.

The following is a set of rules for checking equality:

## Basic types

1. Two `str` values are equal if they have the same characters in the same order.
2. Two `num` values are equal if they have the same floating-point value. The [IEEE 754] standard is used for storing numbers, which means that for example `-0 == +0`. `NaN` is not equal to any value, including itself.
3. Two `bool` values are equal if they are both `true` or both `false`.
4. Two `duration` values are equal if they have the same number of milliseconds.
5. Two `T?` types (optional `T` values) are equal if they are both empty (`nil`) or both non-empty, and if they are both non-empty, their inner values are equal. A value of type `T?` is never equal to a value of type `T`.

[IEEE 754]: https://en.wikipedia.org/wiki/IEEE_754

## Collection types

Wing contains six collection types: `Array`, `MutArray`, `Map`, `MutMap`, `Set`, and `MutSet`.The following rules apply to all of them:

1. Two collections are equal if they have the same number of elements, and if each element in the first collection is equal to the corresponding element in the second collection. (The order of elements only matters for `Array` and `MutArray`.)
2. The mutability of a collection does not affect its equality. In other words, a `MutArray` is equal to an `Array` with the same elements, and a `MutMap` is equal to a `Map` with the same keys and values.
3. Only collections of the same "kind" can be equal. For example, an `Array` cannot be equal to a `Map`, and a `MutArray` cannot be equal to a `MutMap`.

## Function types

Two functions are equal if they are both the same function. This means that two functions that have the same code are not necessarily equal, since they may have been defined in different places.

```js
let f1 = (x: num): num => x + 1;
let f2 = (x: num): num => x + 1;
let f3 = f1;

assert(f1 != f2);
assert(f1 == f3);
```

## Enums

Two enum values are equal if they refer to the same enum case.

```js
enum PizzaTopping {
  CHEESE,
  PINEAPPLE,
}

assert(PizzaTopping.CHEESE == PizzaTopping.CHEESE);
assert(PizzaTopping.CHEESE != PizzaTopping.PINEAPPLE);
```

## Classes and interfaces

Two class instances or interface-satisfying objects are equal if they are the same instance. This means that two class instances, or interface-satisfying objects that have the same data are not necessarily equal, since they may have been created in different places.

```js
class Shop {
  hats: num;
  init(hats: num) {
    this.hats = hats;
  }
}

let shop1 = new Shop(1);
let shop2 = new Shop(1);
let shop3 = shop1;

assert(shop1 != shop2);
assert(shop1 == shop3);
```

## `Json`

Two `Json` values are equal if they contain the same structure and values. The following rules apply:

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

## Structs

Two struct values are equal if they have the same type and all of their fields are equal. The order in which fields are defined does not matter.

```js
struct Node {
  left: Node?;
  right: Node?
}

let tree1 = Node {
  left: Node { left: nil, right: nil },
  right: Node { left: nil, right: nil },
};

let tree2 = Node {
  right: Node { left: nil, right: nil },
  left: Node { left: nil, right: nil },
};

assert(tree1 == tree2);

let tree3 = Node {
  left: nil,
  right: nil,
};

assert(tree1 != tree3);
```
