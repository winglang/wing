---
title: "Processing messages in a queue"
subtitle: "Example application that processes messages form a queue and puts information into a bucket"
type: 
  - "pattern"
platform:
  - "awscdk"
  - "tf-aws"
  - "sim"
language:
  - "wing"
githubURL: "https://github.com/winglang/examples.git"
repoDirectory: "examples/hello-wing"
coverImage: "/img/examples/basic-bucket-queue.png"
coverImageInPage: true
resources:
  - label: "Understanding inflight and preflight"
    href: "/docs/concepts/inflights"
  - label: "Explore the Wing queues"
    href: "/docs/api/standard-library/cloud/queue"
  - label: "Explore the Wing buckets"
    href: "/docs/api/standard-library/cloud/bucket"
authors:
  - name: "David Boyne"
    role: "Developer Advocate, Wing"
    twitter: "https://twitter.com/boyney123"
    github: "https://github.com/boyney123"
cloudResources:
  - queue
  - bucket
---

This pattern creates a [bucket](/docs/api/standard-library/cloud/bucket) and a [queue](/docs/api/standard-library/cloud/queue). When messages are pushed the queue an [inflight function](/docs/concepts/inflights#inflight-code) processes the message and puts the contents of the message into a bucket.

> The [inflight function](/docs/concepts/inflights#inflight-code) is executed at runtime. During this execution, inflight code can interact with resources through their inflight APIs (e.g. [bucket inflight APIS](/docs/api/standard-library/cloud/bucket#inflight-methods)). In this example, information is added to the bucket by using the inflight [put API](/docs/api/standard-library/cloud/bucket#@winglang/sdk.cloud.IBucketClient.put) provided by the bucket.

```js example playground
bring cloud;
bring util;
bring expect;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

queue.setConsumer(inflight (message) => {
  bucket.put("wing.txt", "Hello, {message}");
}, timeout: 30s);

test "Hello, world!" {
  queue.push("world!");

  let found = util.waitUntil(() => {
    log("Checking if wing.txt exists");
    return bucket.exists("wing.txt");
  });

  expect.equal(bucket.get("wing.txt"), "Hello, world!");
}
```

### Resources used in this example

- [Queue](/docs/api/standard-library/cloud/queue) - Resource for holding lists of messages. 
- [Bucket](/docs/api/standard-library/cloud/bucket) - Resource for storing data in the cloud.

