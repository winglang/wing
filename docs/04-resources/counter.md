---
title: cloud.Counter 
id: counter
description: A built-in resource for representing an container for numbers in the cloud.
keywords: [Wing reference, Wing language, language, Wing sdk, Wing programming language, Counter]
---

The `cloud.Counter` resource represents a container for one or more counters in the cloud. The number can be increased or decreased atomically by any number of clients.

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

  assert(counter.peek() == 3);
};
```

### Using a bucket inflight

```js
bring cloud;

let bucket = new cloud.Bucket();

inflight () => {
  bucket.put("file.txt", "Hello, world!");
  bucket.putJson("person.json", Json { name: "Alice" });

  let fileData = bucket.get("file.txt");
  assert(fileData == "Hello, world!");

  let jsonData = bucket.getJson("person.json");
  assert(jsonData.get("name") == "Alice");

  let keys = bucket.list();
  assert(keys.at(0) == "file.txt");
  assert(keys.at(1) == "person.json");

  bucket.delete("file.txt");
};
```

### Run code on bucket events

You can use the preflight methods `onCreate`, `onUpdate`, and `onDelete` to define code that should run when an object is uploaded, updated, or removed from the bucket.

Each method creates a new `cloud.Function` resource which will be triggered by the given event type.

```js
let store = new cloud.Bucket();
let copies = new cloud.Bucket() as "Backup";

store.onCreate(inflight (key: str) => {
  let data = store.get(key);
  if !key.endsWith(".log") {
    copies.put(key, data);
  }
});

store.onDelete(inflight (key: str) => {
  copies.delete(key);
  log("Deleted ${key}");
});
```

## Target-specific details

### Simulator (`sim`)

Under the hood, the simulator uses a temporary local directory to store bucket data.

Note that bucket data is not persisted between simulator runs.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Bucket` uses [Amazon S3](https://aws.amazon.com/s3/).

### Azure (`tf-azure`)

The Azure implementation of `cloud.Bucket` uses [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview).

### GCP (`tf-gcp`)

The Google Cloud implementation of `cloud.Bucket` uses [Google Cloud Storage](https://cloud.google.com/storage).

## API Reference

The full list of APIs for `cloud.Bucket` is available in the [API Reference](../05-reference/wingsdk-api.md).



