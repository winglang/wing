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
    horizon: 96h,  // optional, defaults to 24 hours
) as "TestDataStream";
```

## Advanced Usage

If the expected throughput of your data is static and known, you can leverage provisioned throughput.

```ts
bring cloud;

let stream = new cloud.Stream(
  read: ,
  write: ,
  horizon: ,
) as "MyStream";
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Stream` uses a set of temporary local directories to store incoming data.

Note that data is not persisted between simulator runs.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Stream` uses [AWS Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/).

### Azure (`tf-azure`)

The Azure implementation of `cloud.Stream` uses [Event Hubs](https://azure.microsoft.com/products/event-hubs).

🚧 Not supported yet (tracking issue: [](https://github.com/winglang/wing/issues/))

### GCP (`tf-gcp`)

The GCP implementation of `cloud.Stream` uses [Pub/Sub](https://cloud.google.com/pubsub)

🚧 Not supported yet (tracking issue: [#](https://github.com/winglang/wing/issues/))
