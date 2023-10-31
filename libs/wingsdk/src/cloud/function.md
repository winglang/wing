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

A function can be invoked in two ways:

* **invoke()** - Executes the function with a payload and waits for the result.
* **invokeAsync()** - Kicks off the execution of the function with a payload and returns immediately while the function is running.

```ts playground
bring cloud;
bring util;

// defining a cloud.Function resource
let countWords = new cloud.Function(inflight (s: str): str => {
  return "${s.split(" ").length}";
}) as "countWords";

let longTask = new cloud.Function(inflight () => {
  util.sleep(30s);
  log("done!");
});

new cloud.Function(inflight () => {
  let sentence = "I am a sentence with 7 words";
  // invoking cloud.Function from inflight context
  let wordsCount = countWords.invoke(sentence);
  log("'${sentence}' has ${wordsCount} words");

  longTask.invokeAsync();
  log("task started");
}) as "Invoke Me";
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Function` runs the inflight code as a JavaScript function.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Function` uses [AWS Lambda](https://aws.amazon.com/lambda/).

To add extra IAM permissions to the function, you can use the `aws.Function` class as shown below.

```ts playground
bring aws;
bring cloud;

let f = new cloud.Function(inflight () => {
  log("Hello world!");
});
if let lambdaFn = aws.Function.from(f) {
  lambdaFn.addPolicyStatements(
    aws.PolicyStatement {
      actions: ["ses:sendEmail"],
      effect: aws.Effect.ALLOW,
      resources: ["*"],
    },
  );
}
```

### Azure (`tf-azure`)

The Azure implementation of `cloud.Function` uses [Azure Functions](https://azure.microsoft.com/en-us/products/functions).

🚧 `invoke` API is not supported yet (tracking issue: [#1371](https://github.com/winglang/wing/issues/1371))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#614](https://github.com/winglang/wing/issues/614))
