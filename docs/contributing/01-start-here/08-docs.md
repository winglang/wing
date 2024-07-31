---
title: Docs and examples
id: docs
keywords: [Wing contributors, contributors]
---

## 📕 How do I update documentation

Our documentation lives under the [`docs`](https://github.com/winglang/wing/tree/main/docs)
directory of the Wing GitHub repository. 

To propose an update to the docs, simply submit a pull request against the relevant markdown file.

## 📕 Can I view the local documentation website on my machine?

Yes, you can! We use the awesome [Docusaurus](https://docusaurus.io/) project for our docs.

To start the documentation website, run the following command from the root of the repo:

```sh
pnpm docs
```

This magical script will clone the [winglang/docsite](https://github.com/winglang/docsite)
repository into `~/.winglang-docsite`, symlink your local copy into it and start a browser with the
site.

## 📕 Adding examples to the website

[Wing examples](/docs/examples) is a collection of community patterns and tutorials for Wing. These examples are designed to help developers understand Wing with practical use cases, tutorials and patterns.

Wing examples are powered by simple markdown files and [frontmatter](https://jekyllrb.com/docs/front-matter/).

**Adding a new example**

1. Create a new markdown file in the [docs/examples directory](https://github.com/winglang/wing/tree/main/docs/examples) ([see example](https://github.com/winglang/wing/tree/main/docs/examples/processing-messages-in-a-queue.md))
1. Enter example details in the frontmatter of the markdown file.
1. Write details in markdown to explain your example with code snippets.

**Example**

```md title="/docs/examples/redis.md"
---
# title that is displayed
title: "Using Redis with Wing"
# subtitle displayed for example
subtitle: "Example application that uses Redis to set values in a Redis cache"
# type of example (pattern/interactive-tutorial)
type: 
  - "pattern"
# What Wing platforms does your example support?
platform:
  - "awscdk"
  - "sim"
# What language? (wing/typescript)
language:
  - "wing"
# GitHub URL for your pattern
githubURL: "https://github.com/winglang/examples.git"
# Folder directory of your pattern
repoDirectory: "examples/redis"
# Image that is rendered on example page
coverImage: "/img/examples/redis.png"
# Shows the cover image on your page
coverImageInPage: true
# Additional optional resources for developers to learn more
resources:
  - label: "Redis winglib"
    href: "https://github.com/winglang/winglibs/tree/main/redis"
  - label: "Explore Wing functions"
    href: "/docs/api/standard-library/cloud/function"
# Your name, role and social handles.
authors:
  - name: "David Boyne"
    role: "Developer Advocate, Wing"
    twitter: "https://twitter.com/boyney123"
    github: "https://github.com/boyney123"
# Any cloud resources that are used (optional), used for filtering
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
``


### Resources used in this example

- [Function](/docs/api/standard-library/cloud/function) - Resource for holding lists of messages. 
- [Redis winglib](https://github.com/winglang/winglibs/tree/main/redis) - Resource for storing data in the cloud.

```

This example would render a new pattern on the [examples page](/docs/examples).

:::info Want to embed the playground in your example?

Wing has an [online playground](https://www.winglang.io/play/) which allows developers to try Wing without installing anything locally. 

You can embed the playground in your examples by including the `playground` keyword against your code snippets.

Example:

```js playground
```js playground
bring redis;
bring cloud;

// Create a reddit resource
let redisInstance  = new redis.Redis();

new cloud.Function(inflight () => {
  // Set value in the redis cache
  redisInstance.set("mykey", "myvalue");
});
`` `
```

:::