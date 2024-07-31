---
title: "Using Redis with Wing"
subtitle: "Example application that uses Redis to set values in a Redis cache"
type: 
  - "pattern"
platform:
  - "awscdk"
  - "sim"
language:
  - "wing"
githubURL: "https://github.com/winglang/examples.git"
repoDirectory: "examples/redis"
coverImage: "/img/examples/redis.png"
coverImageInPage: true
resources:
  - label: "Redis winglib"
    href: "https://github.com/winglang/winglibs/tree/main/redis"
  - label: "Explore Wing functions"
    href: "/docs/api/standard-library/cloud/function"
authors:
  - name: "David Boyne"
    role: "Developer Advocate, Wing"
    twitter: "https://twitter.com/boyney123"
    github: "https://github.com/boyney123"
cloudResources:
  - function
---

This basic pattern uses the [redis winglib](https://github.com/winglang/winglibs/tree/main/redis) with a [cloud function](/docs/api/standard-library/cloud/function).

When the cloud function is invoked a value is set in the redis database using the redis inflight API.


```js
bring redis;
bring cloud;

// Create a reddit resource
let redisInstance  = new redis.Redis();

new cloud.Function(inflight () => {
  // Set value in the redis cache
  redisInstance.set("mykey", "myvalue");
});
```


### Resources used in this example

- [Function](/docs/api/standard-library/cloud/function) - Resource for holding lists of messages. 
- [Redis winglib](https://github.com/winglang/winglibs/tree/main/redis) - Resource for storing data in the cloud.

