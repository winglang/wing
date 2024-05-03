---
title: Resource
id: resource
description: Model a simulated resource with a lifecycle.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Resource,
    Simulator
  ]
---

The `sim.Resource` class models a simulated resource with a lifecycle.
It's can be used to represent any cloud service where API calls are made over HTTP
to interact with the service at runtime.

## Usage

As an example, consider a simulated service that represents an atomic counter, like the one in `cloud.Counter`.

First, an inflight class is defined that represents the stateful service:

```js
bring sim;

// a resource backend must implement the IResource interface
inflight class CounterBackend impl sim.IResource {
  var counter: num;

  new() {
    this.counter = 0;
  }

  pub onStart(ctx: sim.IResourceContext) {
    // startup code
  }

  pub onStop() {
    // shutdown code
  }

  pub inc(n: num?): num {
    let p = this.counter;
    this.counter += (n ?? 1);
    return p;
  }

  pub peek(): num {
    return this.counter;
  }
}
```

Every resource backend needs an `onStart` and `onStop` method, which are called when the resource is started and stopped, respectively.

Next, a preflight class is defined that represents the service itself:

```js
class Counter {
  backend: sim.Resource;

  new() {
    // this is a "backend factory". it returns an inflight class that implements the
    // resource.
    let factory = inflight (): sim.IResource => {
      return new CounterBackend();
    };

    this.backend = new sim.Resource(factory);
  }

  pub inflight inc(n: num?): num {
    let response = this.backend.call("inc", [Json (n ?? 1)]);
    return num.fromJson(response);
  }

  pub inflight peek(): num {
    let response = this.backend.call("peek");
    return num.fromJson(response);
  }
}
```

The `Counter` class is a simple wrapper around the `CounterBackend` class. It provides a way to interact with the resource using the `inc` and `peek` methods.

`sim.Resource` has a `call` method that takes the name of a method to call and an array of arguments.
The arguments are serialized and sent to the resource (possibly over the network), which then processes the request and returns a response.

The `Counter` class can be used like this:

```js
let c = new Counter();

new cloud.Function(inflight () => {
  log("counter is {c.peek()}");
  c.inc();
  log("counter is now {c.peek()}");
});
```

### Serializability

TODO

### Lazy tokens

Consider a use case where there is an attribute of a simulated service that only gets resolved during initialization (e.g. the exposed port of a container).
In order to create such resources, we need a way to obtain a lazy token that gets resolved during simulator initialization.

Use the preflight method `resource.attrToken(key)` to obtain a token that can be used to reference the value of the attribute at runtime.

During resource simulation, you must call `ctx.resolveAttribute(key, value)` during a resource's `onStart` method to set the runtime value.

```js playground
inflight class MyResourceBackend impl sim.IResource {
  pub onStart(ctx: sim.IResourceContext) {
    ctx.resolveAttr("startTime", "2023-10-16T20:47:39.511Z");
  }

  pub onStop() {}
}

class MyResource {
  backend: sim.Resource;
  pub startTime: str;

  new() {
    this.backend = new sim.Resource(inflight () => {
      return new MyResourceBackend();
    });
    this.startTime = this.backend.attrToken("startTime");
  }
}

let r = new ResourceWithState();

new cloud.Function(inflight () => {
  let time = util.env("START_TIME");
  log("start time is {time}");
}, env: {
  START_TIME: r.startTime, // lazy token can be used in preflight configuration
});

// ...or you can use it directly inflight, where the value is automatically resolved

new cloud.Function(inflight () => {
  log("start time is {r.startTime}");
});
```
