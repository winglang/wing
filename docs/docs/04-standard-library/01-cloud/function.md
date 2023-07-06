---
title: Function
id: function
description: A built-in resource for creating serverless functions.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Serverless function,
  ]
sidebar_position: 1
---

The `cloud.Function` resource represents a serverless function for performing short, stateless tasks.
Functions are typically used to run business logic in response to events, such as a file being uploaded to a bucket, a message being pushed to a queue, or a timer expiring.

When a function is invoked on a cloud provider, it is typically executed in a container that is spun up on demand.
The container is then destroyed after the function finishes executing.

Functions may be invoked more than once, and some cloud providers may automatically retry failed invocations.
For performance reasons, most cloud providers impose a timeout on functions, after which the function is automatically terminated.

## Usage

```ts playground
bring cloud;

// defining a cloud.Function resource
let countWords = new cloud.Function(inflight (s: str): str => {
  return "${s.split(" ").length}";
}) as "countWords";

new cloud.Function(inflight () => {
  let sentence = "I am a sentence with 7 words";
  // invoking cloud.Function from inflight context
  let wordsCount = countWords.invoke(sentence);
  log("'${sentence}' has ${wordsCount} words");
}) as "Invoke Me";
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Function` uses JavaScript's function

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Function` uses [Amazon Lambda](https://aws.amazon.com/lambda/).

### Azure (`tf-azure`)

The Azure implementation of `cloud.Function` uses [Azure Function](https://azure.microsoft.com/en-us/products/function).

🚧 `invoke` API is not supported yet (tracking issue: [#1371](https://github.com/winglang/wing/issues/1371))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#614](https://github.com/winglang/wing/issues/614))

## API Reference

The full list of APIs for `cloud.Function` is available in the [API Reference](./api-reference).
