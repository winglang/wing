---
title: cloud.Secret 
id: secret
description: A built-in resource for securely storing secrets in the cloud.
keywords: [Wing reference, Wing language, language, Wing sdk, Wing programming language, secrets]
---

The `cloud.Secret` class represents a secret value (like an API key, certificate, etc.) that is securely stored in the cloud.

Secrets are encrypted at rest and in transit, and are only decrypted when they are used in a task.
Storing a secret allows you to use the value in different compute tasks while only having to rotate or revoke it in one place.

## Usage

### Creating a secret

```js
bring cloud;

let secret = new cloud.Secret(
  name: "my-secret", // optional, defaults to a generated name
);
```

Before deploying your application, you will be expected to store the secret value in a secure place according to the target-specific instructions below.

### Using a secret

```js
bring cloud;

let secret = new cloud.Secret(
  name: "my-api-key",
);

new cloud.Function(inflight () => {
  let secretValue = secret.value(); // retrieve the secret as a `str` value
  let secretValueAsJson = secret.valueJson(); // retrieve the secret as a `Json` value
});
```

## Target-specific details

### Simulator (`sim`)

When using a secret in Wing's simulator, a secrets file must be added to your home directory at `~/.wing/secrets.json`.
The simulator will look up secrets in this file by their `name`.
Secrets should be saved in a JSON format:

```json
// secrets.json
{
  "my-api-key": "1234567890"
}
```

### AWS (`tf-aws` and `awscdk`)

AWS implementations of `cloud.Secret` use [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html).
Before deploying your application, you must create a secret in the AWS account with the same `name` as the secret in your Wing application.
You can do this using the AWS CLI:

```bash
aws secretsmanager create-secret --name my-api-key --secret-string 1234567890
```

It's also possible to create a secret using the AWS console.
See [AWS documentation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) for more details.

### Azure (`tf-azure`)

Tracking issue: [#2178](https://github.com/winglang/wing/issues/2178)

### GCP (`tf-gcp`)

Tracking issue: [#2179](https://github.com/winglang/wing/issues/2179)

## API Reference

The full list of APIs for `cloud.Secret` is available in the [API Reference](../05-reference/wingsdk-api.md).


---
title: cloud.Bucket 
id: bucket
description: A built-in resource for handling object storage in the cloud.
keywords: [Wing reference, Wing language, language, Wing sdk, Wing programming language, secrets]
---

The `cloud.Bucket` resource represents a container for storing data in the cloud.

Buckets are a common way to store arbitrary files (images, videos, etc.), but can also be used to store structured data like JSON or CSV files.

Buckets in the cloud use object storage, a form of storage that is optimized for storing large amounts of data with high availability.
Unlike other forms of storage like file storage, data is not stored in a hierarchical structure, but rather as a flat list of objects.

## Usage

### Creating a bucket

```js
bring cloud;

let bucket = new cloud.Bucket(
  public: true, // optional, defaults to `false`
);
```

If you have data that you want to be uploaded to the bucket every time your app is deployed, you can call the preflight method `addObject`:

```js
bring cloud;

let bucket = new cloud.Bucket();

bucket.addObject("my-file.txt", "Hello, world!");
```

### Using a bucket

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



