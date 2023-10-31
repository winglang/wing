---
title: Stream
id: stream
description: A built-in resource for working with streaming data endpoints.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Streaming Data,
  ]
sidebar_position: 1
---

The `cloud.Stream` resource represents a real-time streaming service typically used to ingest continuous data transmissions.
They typically involve high throughput, low size transmissions like: sensors, mobile devices, web servers, etc.

When a data stream is created in a cloud provider, it typically exposes an endpoint acting as a "put" endpoint for all data sources. The cloud provider manages the ingest and temporary storage of your data. 

Most cloud providers have a data horizon for their streaming data to help providers reduce cost, prevent unbounded data growth, encourage real-time processing, and implement data governance best practices. However, developers have the ability to modify the data horizon.

## Usage

```ts
bring cloud;

let stream = new cloud.Stream(
    name: 'test-data-stream',
    horizon: 96,  // optional, defaults to 24 hours
);
```

## Advanced Usage

If the expected throughput of your data is static and known, you can leverage provisioned throughput.

```ts
bring cloud;

let stream = new cloud.Stream(
  name: ,
  read: ,
  write: ,
  horizon: ,
)

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Stream` uses a set of temporary local directories to store incoming data.

Note that data is not persisted between simulator runs.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Stream` uses [AWS Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/).

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




