---
title: cloud.Bucket 
id: bucket
description: A built-in resource for handling object storage in the cloud.
keywords: [Wing reference, Wing language, language, Wing sdk, Wing programming language, secrets]
---

The `cloud.Bucket` resource represents a container for storing data in the cloud.

Buckets are a common way to store arbitrary files (images, videos, etc.), but can also be used to store structured data like JSON or CSV files.

Buckets in the cloud use object storage, which is optimized for storing large amounts of data with high availability.
Unlike other kinds of storage like file storage, data is not stored in a hierarchical structure, but rather as a flat list of objects.

## Usage

### Creating a bucket

```js
bring cloud;

let bucket = new cloud.Bucket(
  public: true, // optional, defaults to `false`
);
```

If you have static data that you want to upload to the bucket each time your app is deployed, you can call the preflight method `addObject`:

```js
bring cloud;

let bucket = new cloud.Bucket();

bucket.addObject("my-file.txt", "Hello, world!");
```

### Using a bucket inflight

TODO

### Run code on bucket events

TODO

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

The full list of APIs for `cloud.Secret` is available in the [API Reference](../05-reference/wingsdk-api.md).



