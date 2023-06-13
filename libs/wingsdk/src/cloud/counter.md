---
title: cloud.Counter 
id: counter
description: A built-in resource for representing an container for numbers in the cloud.
keywords: [Wing reference, Wing language, language, Wing standard library, Wing programming language, Counter]
---

The `cloud.Counter` resource represents a stateful container for one or more numbers in the cloud.

## Usage

### Defining a counter

```js
bring cloud;

let counter = new cloud.Counter(
  initial: 123, // optional, defaults to 0
);
```

### Using a counter inflight

```js
bring cloud;

let counter = new cloud.Counter();

inflight () => {
  let prev = counter.inc(); // increment by 1 and return previous value
  counter.inc(5);
  counter.dec(); // decrement by 1
  counter.dec(2);

  assert(counter.peek() == 3); // check the current value

  counter.set(100); // set to a specific value
};
```

### Using keys to manage multiple counter values

🚧 Not implemented yet (tracking issue: [#1375](https://github.com/winglang/wing/issues/1375))

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

## API Reference

The full list of APIs for `cloud.Counter` is available in the [API Reference](../04-api-reference.md).
