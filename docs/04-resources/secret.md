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
