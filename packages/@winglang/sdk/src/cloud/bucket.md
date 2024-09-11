---
title: Bucket
id: bucket
description: A built-in resource for handling object storage in the cloud.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Object storage,
    Buckets,
  ]
sidebar_position: 1
---

The `cloud.Bucket` resource represents a container for storing data in the cloud.

Buckets are a common way to store arbitrary files (images, videos, etc.), but can also be used to store structured data like JSON or CSV files.

Buckets in the cloud use object storage, which is optimized for storing large amounts of data with high availability.
Unlike other kinds of storage like file storage, data is not stored in a hierarchical structure, but rather as a flat list of objects, each associated with a key.

## Usage

### Defining a bucket

```js example
bring cloud;

let bucket = new cloud.Bucket(
  public: true, // optional, defaults to `false`
);
```

### Populating objects during deployment

If you have static data that you want to upload to the bucket each time your app is deployed, you can call the preflight method `addObject`:

```js example
bring cloud;

let bucket = new cloud.Bucket();

bucket.addObject("my-file.txt", "Hello, world!");
```

### Using a bucket inflight

```js playground example
bring cloud;

let bucket = new cloud.Bucket();

let bucketFunc = inflight () => {
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

new cloud.Function(bucketFunc);
```

### Run code on bucket events

You can use the preflight methods `onCreate`, `onUpdate`, and `onDelete` to define code that should run when an object is uploaded, updated, or removed from the bucket.
Use the `onEvent` method for responding to any event.

Each method creates a new `cloud.Function` resource which will be triggered by the given event type.

```js playground example
bring cloud;

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
  log("Deleted {key}");
});
```

### Configuring CORS

By default, buckets are configured with CORS for any origin. When a bucket is private (the default), CORS options only come into play when the bucket's objects are accessed through a signed URL.

```js playground example
bring cloud;
bring http;

let uploads = new cloud.Bucket(
  // these are the default values
  public: false,
  cors: true,
  corsOptions: {
    allowedMethods: [http.HttpMethod.GET, http.HttpMethod.POST, http.HttpMethod.PUT, http.HttpMethod.DELETE, http.HttpMethod.HEAD],
    allowedOrigins: ["*"],
    allowedHeaders: ["*"],
    exposeHeaders: [],
    maxAge: 0s
  },
);
```

The CORS configuration can be disabled by passing `cors: false` to the constructor. CORS rules can also be configured after the bucket is created by calling the `addCorsRule` method:

```js playground example
bring cloud;
bring http;

let bucket = new cloud.Bucket(
  cors: false, // disable any default CORS rules
);

bucket.addCorsRule({
  allowedOrigins: ["https://example.com"],
  allowedMethods: [http.HttpMethod.GET],
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
