---
id: inflights
title: Preflight and Inflight 
description: "Wing's two execution phases: preflight and inflight"
keywords: [Inflights, Inflight functions, Preflight, Preflight code]
---

Every application built to run on the cloud can be thought of as being made up of two kinds of components.

The first set of components are the resources and network-accessible services that your application uses.
These resources are typically optimized for use cases like storing data or files (like buckets), processing HTTP requests (like API gateways), distributing content (like CDNs), or running user-defined code (such as Lambda functions or Kubernetes deployments).

The second set of components are the pieces of user-defined code that you write to interact with these resources.
For example, you may have code runs in a Lambda function or a Kubernetes cluster that makes requests to the internet, perform queries on your database, transforms data from storage, and does any number of other operations in response to an event.

Wing lets you express these two parts of a cloud application through the concepts of **preflight code** and **inflight code**.

## Preflight code

Preflight is where you define your app's infrastructure.
The entrypoint, or default phase, of every Wing program is the preflight phase.

For example, this code defines a storage bucket, and populates the bucket with a piece of static data when the app is deployed.

```js playground
bring cloud;

let data = new cloud.Bucket();

let orders = { "hummus": 100 };
data.addObject("orders.json", Json.stringify(orders));
```

`Bucket` is a class, and `addObject()` is a preflight method of `Bucket`.

Preflight code is executed at compile-time, before the application is deployed.

For example, in the previous example, creating a class during preflight means that after compiling the Wing app, a configuration file is synthesized that describes a bucket resource.

Some global functions  also have specific behaviors in preflight.
For example, adding a `log()` statement to your preflight code will result in Wing printing the string to the console after compilation.

```js playground
// hello.w
log("7 * 6 = ${7 * 6}");
```

```bash
$ wing compile hello.w
7 * 6 = 42
```

## Inflight code

Inflight blocks are where you write asynchronous runtime code that can seamlessly interact with resources through their inflight APIs.
Inflight functions can be easily packaged and executed onto compute platforms like containers, CI/CD pipelines or FaaS.
Let's walk through some examples.

Inflight code is always contained inside a block (or "scope") that starts with the word `inflight`.

```js playground
let greeting = inflight () => {
  log("Hello from the cloud!");
};
```

Inflight code can call other inflight functions and methods.
For example, `cloud.Bucket` has an inflight method named `list()` that can be called inside inflight scopes:

```js playground
bring cloud;

let bucket = new cloud.Bucket();

let firstObject = inflight (): str => {
  let items = bucket.list();
  return items.at(0);
};
```

Inflight code cannot be executed during preflight, because inflight APIs assume all resources have already been deployed.

```js
firstObject(); // error: method "firstObject" cannot be called in preflight phase
```

Likewise, inflight code cannot call preflight code, because preflight code has the capability to modify your application's infrastructure configuration, which is disallowed after deployment.
For example, since `addObject` is a preflight method, it cannot be called in inflight:

```js playground
bring cloud;

let bucket = new cloud.Bucket();

let saveCalculation = inflight () => {
  bucket.addObject("file1", "${2 ** 10}"); // error: method "addObject" cannot be called in inflight phase
};
```

Instead, to insert an object into the bucket at runtime you would have to use the inflight method `put`.

Since a class's initializer is just a special kind of preflight function, it also isn't possible to initialize regular classes during preflight:

```js playground
bring cloud;

inflight () => {
  new cloud.Bucket(); // error: preflight class "Bucket" cannot be created in inflight
};
```

> Note: It is possible to define inflight classes which only contain inflight methods and properties. Inflight classes are safe to create in inflight scopes.

For an inflight function to actually get executed, it must be provided to an API that expects inflight code. For example:

```js playground
bring cloud;

let func = new cloud.Function(inflight () => {
  log("Hello from the cloud!");
});
```

`cloud.Function` expects an inflight function as its first argument, and it's responsible for packaging the code (as well as any any other inflight code it calls) so that it can be executed on cloud compute platforms.

Today, inflights are typically compiled into machine code (like JavaScript), but Wing may also be able to compile them into state machines, orchestrated workflows, and other formats in the future.

## Combining preflight and inflight code

Preflight and inflight functions can be grouped together using classes.

Here's a class that models a queue that can replay its messages.
A `cloud.Bucket` stores the history of messages, and a `cloud.Counter` helps with sequencing each new message as it's added to the queue.

```js playground
class ReplayableQueue {
  queue: cloud.Queue;
  bucket: cloud.Bucket; 
  counter: cloud.Counter;
  
  init() {
    this.queue = new cloud.Queue();
    this.bucket = new cloud.Bucket();
    this.counter = new cloud.Counter();
  }

  setConsumer(fn: inflight (str): str){
    this.queue.setConsumer(fn);
  }
  
  inflight push(m: str) {
    this.queue.push(m);
    this.bucket.put("messages/${this.counter.inc()}", m);
  }
  
  inflight replay(){
    for i in this.bucket.list() {
      this.queue.push(this.bucket.get(i));
    }
  }
}
```

## Using preflight data from inflight

While inflight code can't call preflight code, it's perfectly ok to reference data from preflight.

For example, the `cloud.Api` class has a preflight field named `url`.
Since it's a piece of static data, it can be directly referenced inflight:

```js playground
bring cloud;
bring http;

let api = new cloud.Api();
api.get("/test", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200,
    body: "success!"
  };
});

let checkEndpoint = inflight () => {
  let url = api.url; // this is OK
  let path = "${url}/test";
  let response = http.get(path);
  assert(response.status == 200);
};
new cloud.Function(checkEndpoint);
```

## Phase-independent code

The global functions `log`, `assert`, `throw`, and `panic` can all be used in both preflight and inflight code.

Issue [#435](https://github.com/winglang/wing/issues/435) is tracking support for the capability to define phase-independent functions.
