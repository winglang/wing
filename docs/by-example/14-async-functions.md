---
title: Inflight functions
id: inflight-functions
slug: /inflight-functions
sidebar_label: Async inflight functions
description: Using functions with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/14-async-functions.md
---

Wing supports two function types, [preflight and inflight](/docs/concepts/inflights).

- Preflight: Code that runs once, at compile time, and generates the infrastructure configuration of your cloud application. For example, setting up databases, queues, storage buckets, API endpoints, etc.

- Inflight: Code that runs at runtime and implements your application's behavior. For example, handling API requests, processing queue messages, etc. Inflight code can be executed on various compute platforms in the cloud, such as function services (such as AWS Lambda or Azure Functions), containers (such as ECS or Kubernetes), VMs or even physical servers.

By default, most functions are preflight. A function is inflight if it has the `inflight` keyword or if the function is defined inside of another inflight function.

```js playground example title="main.w"
bring cloud;
bring util;

// defining a cloud.Function resource
let countWords = new cloud.Function(inflight (payload: Json?): Json => {
  return "{payload?.tryAsStr()?.split(" ")?.length ?? 0}";
}) as "countWords";

// simulate a long running task, to run async
let longTask = new cloud.Function(inflight () => {
  util.sleep(30s);
  log("done!");
});

new cloud.Function(inflight () => {
  let sentence = "I am a sentence with 7 words";
  // invoking cloud.Function from inflight context
  let wordsCount = countWords.invoke(sentence);
  log("'{sentence}' has {wordsCount ?? "0"} words");

  // invokes async
  longTask.invokeAsync("");
  
  // continue to execute
  log("task started");
}) as "Invoke Me";
```

```bash title="Wing console output"
# Run locally with wing console
wing it

3
```