---
title: cloud.Service 
id: service
description: A built-in resource for publishing messages to subscribers.
keywords: [Wing reference, Wing language, language, Wing sdk, Wing programming language, services]
---

The `cloud.Service` class represents a cloud service that has a start and optional stop lifecycle.

Services are a common way to define long running code, such as web servers and custom daemons.

## Usage

### Creating a service

```js
bring cloud;

// At minimum a service needs to have an onStart handler.
let service = new cloud.Service(
  onStart: inflight() => {
    log("Service started...");
  }
);
```
### Disable auto-start

By default the service resource will start automatically, however this can be disabled by 
passing `autoStart: false` to the constructor.

```js
bring cloud;

let service = new cloud.Service(
  autoStart: false,
  onStart: inflight() => {
    log("Service started...");
  }
);
```

### Defining service with stop behavior

```js
bring cloud;

let service = new cloud.Service(
  onStart: inflight() => {
    log("Service started...");
  },
  onStop: inflight() => {
    log("Service stopped...");
  },
);
```

### Stopping and starting a service

The inflight methods `start` and `stop` are used exactly how they sound, to stop and start the service.
Here is an example of using a service that will track how often it is started and stopped using counters.
An important aspect to note is that consecutive starts and stops have no affect on a service. For example
if a `service.start()` is called on a service that is already started, nothing will happen.

```js
bring cloud;

let startCounter = new cloud.Counter() as "start counter";
let stopCounter = new cloud.Counter() as "stop counter";

let service = new cloud.Service(
  autoStart: false,
  onStart: inflight() => {
    let i = startCounter.inc();
    log("Service started for the ${i}th time...");
  },
  onStop: inflight() => {
    let i = stopCounter.inc();
    log("Service stopped for the ${i}th time...");
  },
);

// Functions to stop and start the service
new cloud.Function(inflight() => {
  service.start();
}) as "start service";

new cloud.Function(inflight() => {
  service.stop();
}) as "stop service";
```

## Target-specific details

### Simulator (`sim`)

Within the context of the simulator, services are just spawned processes ran within a node vm.

### AWS (`tf-aws` and `awscdk`)

🚧 Not supported yet (tracking issue: [#1306](https://github.com/winglang/wing/issues/1306))

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#1307](https://github.com/winglang/wing/issues/1307))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#1308](https://github.com/winglang/wing/issues/1308))

## API Reference

The full list of APIs for `cloud.Service` is available in the [API Reference](../04-api-reference.md).
