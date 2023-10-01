---
title: "#4350 Containers - Requirements"
description: Requirements for compute resources in the Wing Cloud Library
---

# Containers - Requirements Specification

- **Author(s)**: @eladb
- **Submission Date**: 2023-10-01
- **Stage**: Proposal
- **Stage Date**: 2023-10-01

The Wing Cloud Library includes a few resources designed to run workloads in the cloud. At the time
of this writing we have two:
[`cloud.Function`](https://www.winglang.io/docs/standard-library/cloud/function) and
[`cloud.Service`](https://www.winglang.io/docs/standard-library/cloud/service).

This specification is a list of *requirements* we have identified in the past few months related to
containers. The code snippets are provided to illustrate the requirements and inspire the design
phase to be followed.

## Container images as an alternative of inflight closures

> Reqtag: `c:containers-as-inflights`

At the moment, the `cloud.Service` and `cloud.Function` APIs accept [*inflight
closures*](https://www.winglang.io/docs/concepts/inflights) as input:

```js
new cloud.Function(inflight () => {
  log("compute!");
});

new cloud.Service(inflight () => {
  log("start service");
  return () => {
    log("stop service");
  };
})
```

This works well if you want to implement your workload using Winglang, but there are many use cases
where it makes more sense to implement the workload using a different stack. For example, I want to
implement my machine learning data pipeline through Python because it has great ML libraries.

So the high-level requirement here is to be able to provide a reference to a Docker image (from a
container repository) or a `Dockerfile` (from the local project directory) as an alternative way to
define `cloud.Service` and `cloud.Function` resources.

API sketch:

```js
new cloud.Function(image: "./my-docker-image/Dockerfile");
new cloud.Service(image: "redis:alpine3.18");
```

## Container runtime interface

The container images provided to `cloud.Function` and `cloud.Service` would need to adhere to a certain
runtime contract.

The container used by `cloud.Service` can be *any container* which starts a long-running process,
probably processing requests coming in through a network port.

The container used by `cloud.Function` would need to adhere to a runtime contract that can be
adapted to the interface required by the various container-based serverless compute services such as
AWS Lambda, Google Cloud Functions and Azure Functions, as well as CloudFlare workers.

## Simulator implementation

When using Docker images, the Wing simulator will need to take care of seamlessly building and/or
pulling the container image and maintaining it's lifecycle and cleanup.

## Hot reloading

Developer experience is our #1 priority, so when developing a Wing application that uses locally
defined container images we want to support some kind of hot reloading mechanism that will instantly
reload the program inside the container when the source changes.

Rebuilding the image every time will likely not be good enough and some kind of live update solution
will be needed. An example of such a mechanism can be found in
[tilt](https://docs.tilt.dev/tutorial/5-live-update.html). Similar to tilt's `live_update` clause,
this will likely require additional information such as where the code resides inside the container
and how to build it.

Notice that this mechanism is also needed for `cloud.Website`, so a more general pattern/mechanism
that can be reused across the Wing Cloud Library could be in place (at least in the long run). An idea worth exploring is explicit modeling of the relationships in Wing:

## Capabilities of `cloud.Service`

The existing `cloud.Service` API lacks many capabilities that are required for container-based
services. Eventually, all of these will likely need to be supported:

* Expose network ports of various types (http, http2, grpc, ??).
* Command line arguments to pass to the container.
* Environment variables.
* Entrypoint command to override (if you wish to use a pre-built container image and just change the entrypoint)
* CPU and memory requirements (in some normalized model such as vCPUs, GBs)
* GPUs
* Liveness probe
* Readiness probe
* Sidecar containers
* Autoscaling parameters
* etc...

One approach to determine the surface area for this is to identify the common APIs across multiple
container-based platforms such as Kubernetes, [ECS](https://aws.amazon.com/ecs/),
[fly.io](https://fly.io),
[ControlPlane](https://github.com/controlplane-com/terraform-provider-cpln/blob/main/docs/resources/workload.md),
[Porter](https://www.porter.run/) and more.

## Container builds and publishing

Wing should have built-in support for building and publishing container images. When referencing a
local container image (or a container image is implicitly created to wrap an inflight closure for
`cloud.Service`), the `wing compile` command should take care of building the container.


## Preflight object bindings


## Cloud implementation


When compiled to a cloud provider, `cloud.Function`s are normally implemented through a serverless compute resource such as AWS Lambda or Azure Functions. 

For `cloud.Service`, we still don't have an implementation, but the plan is to use a container-based compute platform such as ECS and/or Kubernetes.




## Build docker images

## Event handlers
