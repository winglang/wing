# Wing Examples

This directory contains a collection of Wing examples of the kinds of apps you can build in Wing! Check out the [Wing Contributor's Handbook](../docs/06-contributors/docs#%EF%B8%8F-how-do-i-add-an-example) for a guide on on how to add your own example.

The examples in the `tests` directory are examples specifically used for testing the compiler. `tests/valid` are examples that should compile successfully, and `tests/invalid` are examples that should fail.

The examples in `proposed` are examples that may not yet work in the current version of Wing, but we want to make them work in the future!

## Examples

_Add yours here!_

### Cacheable function

* **Source code:** [./proposed/cacheable-function.w](./proposed/cacheable-function.w)
* **Description:** A Wing resource where a FaaS is augmented to cache input/output pairs using a object storage bucket.
* **Author:** [@Chriscbr](https://github.com/Chriscbr)

### In-memory search engine

* **Source code:** [./proposed/in-memory-search.w](./proposed/in-memory-search.w)
* **Description:** This is a concept for a Wing app where cloud functions are used to create a search engine where the entire search index exists in-memory, spread across many lambda functions.
* **Author:** [@Chriscbr](https://github.com/Chriscbr)

### Lock

* **Source code:** [./proposed/lock.w](./proposed/lock.w)
* **Description:** A naive distributed lock implementation. This lock uses the atomicity of `Counter` internally to guarantee that it can only be acquired by a single inflight function at a time, even if they are on different machines.
* **Author:** [@Chriscbr](https://github.com/Chriscbr)

### Counting semaphore

* **Source code:** [./proposed/counting-semaphore.w](./proposed/counting-semaphore.w)
* **Description:** A Wing resource that helps access control for a common resource in a cloud environment.
* **Author:** [@flyingImer](https://github.com/flyingImer)

### Replayable Queue

* **Source code:** [./proposed/replayable-queue.w](./proposed/replayable-queue.w)
* **Description:** A Wing Queue that saves all the messages sent to it on a bucket and allow you to replay all messages
* **Author:** [@ekeren](https://github.com/ekeren)

### Task Manager

* **Source code:** [./proposed/task-manager.w](./proposed/task-manager.w)
* **Description:** A task manager that lets you create background tasks asynchronously, and check their status at any point in time.
* **Author:** [@Chriscbr](https://github.com/Chriscbr)

### URL Shortener

* **Source code:** [./proposed/url-shortener.w](./proposed/url-shortener.w)
* **Description:** A URL shortener consisting of two API endpoints, `/create` and `/u/:id`. IDs are managed using buckets, but could be swapped with a table or other stateful storage mechanism. Requires installing `node-fetch@2` from npm.
* **Author:** [@Chriscbr](https://github.com/Chriscbr)

<!--

### Tweet queue

* **Source code:** [./tweet-queue.w](./tweet-queue.w)
* **Description:** This is a Wing app that lets you get a feed of Twitter search results into a queue. It works by periodically polling the freely available Twitter Standard Search API and sending all new tweets to the queue.
* **Author:** [@Octocat](https://github.com/octocat)

-->
