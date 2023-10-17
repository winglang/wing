---
title: State
id: state
description: Key/value in-memory state for the simulator.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    In-memory state,
    State,
    Simulator
  ]
---

The `sim.State` is a simple key/value in-memory store for the simulator with support for lazy
tokens.

Consider a use case where there is an attribute of a simulated service that only gets resolved during initialization (e.g. the exposed port of a container). In order to create such resources, we need a way to obtain a lazy token that gets resolved during simulator initialization. It just so happens that we already have a mechanism like this, but it was not exposed as a public API.

Use the preflight method `state.token(key)` to obtain a token that can be used to reference the
value of the state at runtime.

During simulator app initialization (i.e. `cloud.OnDeploy` or `cloud.Service` startup), you must
call the inflight method `state.set(key, value)` to set the runtime value. The value will be
available at runtime through the inflight method `state.get(key)`, or via a resolved token.

## Usage

Let's say I want to create a simulated service that has property called `startTime` which returns
the time the service was started. This information is also known when the service is actually
initialized.

```js
bring cloud;
bring sim;

class MyService {
  startTime: str;

  init() {
    let state = new sim.State();

    new cloud.Service(inflight () => {
      state.set("start", std.Datetime.utcNow().toIso());
    });

    this.startTime = state.token("start");
  }
}
```

In this example, the `startTime` property will resolve to a *simulator token* (something like
`${root/MyService/State#attrs.start)}`) which can be referenced ("lifted") into inflight context
naturally:

```js
let s = new MyService();

new cloud.Function(inflight () => {
  log("service start time is ${s}");
});
```

This creates an implicit dependency between the `cloud.Function` and `MyService` such that only when
the state `start` is set, the `cloud.Function` will be initialized with the actual value.
