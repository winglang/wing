---
title: OnDeploy
id: on-deploy
description: A resource that runs inflight code during the application's deployment.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    OnDeploy,
    Trigger,
    Deployment,
  ]
sidebar_position: 1
---

The `cloud.OnDeploy` resource runs a block of inflight code each time the application is deployed.

## Usage

```ts playground
bring cloud;

let bucket = new cloud.Bucket();

// each time the application is deployed, all objects in the bucket are deleted
let setup = new cloud.OnDeploy(inflight () => {
  for key in bucket.list() {
    bucket.delete(key);
  }
});
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.OnDeploy` uses a JavaScript function.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.OnDeploy` uses a [Amazon Lambda](https://aws.amazon.com/lambda/) function, which is invoked during the Terraform or CloudFormation deployment.

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#3565](https://github.com/winglang/wing/issues/3565))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#3564](https://github.com/winglang/wing/issues/3564))
