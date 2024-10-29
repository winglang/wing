---
title: Functions
id: functions
slug: /functions
sidebar_label: Functions
description: Using functions with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/14-functions.md
---

Wing supports two function types [preflight and inflight](/docs/concepts/inflights).

- Preflight: Code that runs once, at compile time, and generates the infrastructure configuration of your cloud application. For example, setting up databases, queues, storage buckets, API endpoints, etc.

- Inflight: Code that runs at runtime and implements your application's behavior. For example, handling API requests, processing queue messages, etc. Inflight code can be executed on various compute platforms in the cloud, such as function services (such as AWS Lambda or Azure Functions), containers (such as ECS or Kubernetes), VMs or even physical servers.

By default functions are preflight functions.

```js playground example title="main.w"
bring cloud;

// preflight function - can be called at compile time
let plus = (num1: num, num2: num) => {
  return num1 + num2;
};

// Inflight code here is run at runtime
let func = new cloud.Function(inflight (payload:Json?) => {
  // When when the function it excuted on the cloud
  log(Json.stringify(payload));
});

let value = plus(1, 2);

log(value);
```

```bash title="Wing console output"
# Run locally with wing console
wing it

3
```