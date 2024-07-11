---
title: Service
id: service
description: A built-in resource for publishing messages to subscribers.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    services,
  ]
sidebar_position: 1
---

The `cloud.Service` class represents a cloud service that has a start and optional stop lifecycle.

Services are a common way to define long running code, such as microservices.

## Usage

### Creating a service

When defining a service, the first argument is an inflight closure that represents
the service handler. This handler is responsible to perform any initialization
activity and **return asynchronously** when initialization is complete.

```js
bring cloud;

new cloud.Service(inflight () => {
  // ...
  // kick off any initialization activities asynchronously
  // ...
  log("Service started...");
});
```

### Disable auto-start

By default the service resource will start automatically, however this can be disabled by passing
`autoStart: false` to the constructor.

```js
bring cloud;

let handler = inflight () => {
  log("service started...");
};

let service = new cloud.Service(handler, autoStart: false);
```

### Service cleanup

Optionally, the service handler inflight closure can return another inflight closure which will be
called when the service is stopped. Using a return closure allows naturally passing context between
the async calls.

```js
bring cloud;

new cloud.Service(inflight() => {
  let server = startHttpServer();
  log("Service started...");
  return () => {
    log("Service stopped...");
    server.close();
  };
});
```

### Stopping and starting a service

The inflight methods `start()` and `stop()` are used exactly how they sound, to stop and start the
service. The method `started()` returns a `bool` indicating if the service is currently started.

Here is an example of using a service that will track how often it is started and stopped using
counters. 

An important aspect to note is that consecutive starts and stops have no affect on a service. For
example, if a `service.start()` is called on a service that is already started, nothing will happen.

```js
bring cloud;

let startCounter = new cloud.Counter() as "start counter";
let stopCounter = new cloud.Counter() as "stop counter";

let handler = inflight() => {
  let i = startCounter.inc();
  log("Service started for the ${i}th time...");
  return () => {
    let i = stopCounter.inc();
    log("Service stopped for the ${i}th time...");
  };
};

let service = new cloud.Service(handler, autoStart: false);

// Functions to stop and start the service
new cloud.Function(inflight() => {
  service.start();
  assert(service.started());
}) as "start service";

new cloud.Function(inflight() => {
  service.stop();
  assert(!service.started());
}) as "stop service";
```

## Target-specific details

### Simulator (`sim`)

Within the context of the simulator, services are just spawned processes ran within a node vm.

### AWS (`tf-aws` and `awscdk`)

Within the context of AWS, services are created using AWS ECS, with a capacity provider of FARGATE. This also requires a VPC and a related resources
such as security groups, subnets, and an internet gateway, etc. If a VPC is not specified in `wing.toml`, a default VPC will be created.

The inflight closures are packaged up into a docker image and pushed to an AWS ECR repository.

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#1307](https://github.com/winglang/wing/issues/1307))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#1308](https://github.com/winglang/wing/issues/1308))
