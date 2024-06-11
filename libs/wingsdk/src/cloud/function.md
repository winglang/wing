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

When a function is invoked on a cloud provider, it is typically executed in a container/host which is provisioned on demand.

Functions may be invoked more than once, and some cloud providers may automatically retry failed invocations.
For performance reasons, most cloud providers impose a timeout on functions, after which the function is automatically terminated.

## Usage

A function can be invoked in two ways:

* **invoke()** - Executes the function with a payload and waits for the result.
* **invokeAsync()** - Kicks off the execution of the function with a payload and returns immediately while the function is running.

```ts playground example
bring cloud;
bring util;

// defining a cloud.Function resource
let countWords = new cloud.Function(inflight (s: str?): str => {
  return "{s?.split(" ")?.length ?? 0}";
}) as "countWords";

let longTask = new cloud.Function(inflight () => {
  util.sleep(30s);
  log("done!");
});

new cloud.Function(inflight () => {
  let sentence = "I am a sentence with 7 words";
  // invoking cloud.Function from inflight context
  let wordsCount = countWords.invoke(sentence);
  log("'{sentence}' has {wordsCount ?? "0"} words");

  longTask.invokeAsync("");
  log("task started");
}) as "Invoke Me";
```

## Function container reuse

Most cloud providers will opportunistically reuse the function's container in additional invocations.
It is possible to leverage this behavior to cache objects across function executions using `inflight new` and inflight fields.

The following example reads the `bigdata.json` file once and reuses it every time `query()` is called.

```ts playground example
bring cloud;

let big = new cloud.Bucket();

big.addObject("bigdata.json", Json.stringify({
  "my-key": "my-value"
}));

class MyDatabase {
  inflight bigdata: Json;
  inflight new() {
    // download big data once
    this.bigdata = big.getJson("bigdata.json");
  }

  pub inflight query(key: str): Json {
    return this.bigdata.get(key);
  }
}

let db = new MyDatabase();

new cloud.Function(inflight () => {
  log(Json.stringify(db.query("my-key")));
});
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Function` runs the inflight code as a JavaScript function.

By default, a maximum of 10 workers can be processing requests sent to a `cloud.Function` concurrently, but this number can be adjusted with the `concurrency` property:

```ts playground example
new cloud.Function(inflight () => {
  // ... code that shouldn't run concurrently ...
}, concurrency: 1);
```

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Function` uses [AWS Lambda](https://aws.amazon.com/lambda/).

To add extra IAM permissions to the function, you can use the `aws.Function` class as shown below.

```ts playground example
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

To access the AWS Lambda context object, you can use the `aws.Function` class as shown below.

```ts playground example
bring aws;
bring cloud;

let f = new cloud.Function(inflight () => {
  if let ctx = aws.Function.context() {
    log(ctx.logGroupName); // prints the log group name
    log(ctx.logStreamName); // prints the log stream name

    let remainingTime = ctx.remainingTimeInMillis();
    assert(remainingTime > 0);
  }
});
```

The `context()` method returns `nil` when ran on non-AWS targets.

### Azure (`tf-azure`)

The Azure implementation of `cloud.Function` uses [Azure Functions](https://azure.microsoft.com/en-us/products/functions).

🚧 `invoke` API is not supported yet (tracking issue: [#1371](https://github.com/winglang/wing/issues/1371))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#614](https://github.com/winglang/wing/issues/614))
