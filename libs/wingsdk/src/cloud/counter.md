---
title: Counter
id: counter
description: A built-in resource for representing an container for numbers in the cloud.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Counter,
  ]
sidebar_position: 1
---

The `cloud.Counter` resource represents a stateful container for one or more numbers in the cloud.

## Usage

### Defining a counter

```js example
bring cloud;

let counter = new cloud.Counter(
  initial: 123, // optional, defaults to 0
);
```

### Using a counter inflight

```js playground example
bring cloud;

let counter = new cloud.Counter();

let counterFunc = inflight () => {
  let prev = counter.inc(); // increment by 1 and return previous value
  counter.inc(5); // increment by 5
  counter.dec(); // decrement by 1
  counter.dec(2); // decrement by 2

  assert(counter.peek() == 3); // check the current value

  counter.set(100); // set to a specific value
};

new cloud.Function(counterFunc);
```

### Using keys to manage multiple counter values

```js playground example
bring cloud;

let counter = new cloud.Counter(initial: 100);

let counterFunc = inflight () => {
  let k1 = "key-1";
  let k2 = "key-2";

  counter.dec(1, k1); // decrement k1 by 1
  counter.inc(11, k2); // increment k2 by 11

  assert(counter.peek(k1) == 99); // check the current value of k1
  assert(counter.peek(k2) == 111); // check the current value of k2
};

new cloud.Function(counterFunc);
```

## Target-specific details

### Simulator (`sim`)

Under the hood, the simulator stores the counter value in memory.

Note that counter data is not persisted between simulator runs.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Counter` uses [Amazon DynamoDB](https://aws.amazon.com/dynamodb/).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#629](https://github.com/winglang/wing/issues/629))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#628](https://github.com/winglang/wing/issues/628))
