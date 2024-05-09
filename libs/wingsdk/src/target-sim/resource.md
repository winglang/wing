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

As an example, suppose we want to simulate a service that stores a number, like the one in `cloud.Counter`, which has two methods: `inc` and `peek`.

First, we'll define an inflight class that represents the service's backend:

```js
bring sim;

// a resource backend must implement IResource
inflight class CounterBackend impl sim.IResource {
  var counter: num;

  new(ctx: sim.IResourceContext) {
    // startup code
    this.counter = 0;
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

The class will be initialized by the simulator with its constructor (the `new()` method), and shut down using the `onStop` method.

Next, we have to define a preflight class which represents the service's frontend:

```js
class Counter {
  backend: sim.Resource;

  new() {
    // this is a "backend factory". it returns an inflight class that implements the
    // resource.
    let factory = inflight (ctx): sim.IResource => {
      return new CounterBackend(ctx);
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

`sim.Resource` has an inflight method named `call` that takes the name of a method to call and an array of arguments, and returns the serialized response from the resource.
The arguments are serialized and sent to the resource (usually over HTTP), which will process the request and returns a serialized response.

> Note: Since the `call` method is making a networked request, it's important that the resource implementation provided by the inflight class responds in a timely manner.
> If the resource takes over 30 seconds to respond, an error will be thrown and the simulator will terminate the resource.

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

Methods that are called on a `sim.Resource` instance must be serializable, meaning
all of their arguments and return values must be serializable.

The following types are serializable:

- `num`
- `str`
- `bool`
- `Json`
- `Array`
- `Map`
- `T?` where `T` is a serializable type
- enums
- structs that contain only serializable types

The `call` function on `sim.Resource` only supports arguments that are valid `Json` values.
To convert a value to `Json`, use the `Json` constructor:

```js
let x: num = 5;
let y: str = "a";
this.backend.call("myMethod", [Json x, Json y]);
```

Return values can be converted back from `Json` using an appropriate `fromJson` method.

```js
let response = this.backend.call("myMethod");
let result: num = num.fromJson(response);
```

> Note: some types are missing `fromJson` methods. To work around this, you may use `unsafeCast()` to cast the value into the desired type.
>
> ```js
> let response = this.backend.call("myOtherMethod");
> let result: MyEnum = unsafeCast(response);
> ```

### Late-bound Tokens

Consider a use case where there is an attribute of a simulated service that only gets resolved during initialization (e.g. the exposed port of a container).
In order to create such resources, we need a way to obtain a lazy token that gets resolved during simulator initialization.

Use the preflight method `resource.createToken(key)` to obtain a token that can be used to reference the value of the attribute at runtime.

During resource simulation, you must call `ctx.resolveToken(key, value)` during a resource's constructor method to set the runtime value.

```js playground
inflight class MyResourceBackend impl sim.IResource {
  new(ctx: sim.IResourceContext) {
    ctx.resolveToken("startTime", "2023-10-16T20:47:39.511Z");
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
    this.startTime = this.backend.createToken("startTime");
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
