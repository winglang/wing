---
title: "#4350 Containerized Workloads - Requirements"
description: Requirements for containerized workloads in the Wing Cloud Library
---

# Containerized Workloads - Requirements Specification

- **Author(s)**: @eladb
- **Submission Date**: 2023-10-01
- **Stage**: Proposal
- **Stage Date**: 2023-10-01

This specification lists the *requirements* we have identified so far that are related to using
containers to implement long running workloads (aka "services" or "microservices"). 

## Requirements

Requirements are marked with a *Reqtag* so they will be easy to trace in subsequent design
documents. Suggested priorities are marked inline as "(P1)", "(P2)" or "(P3)".

### Containerized workloads (P1)

> Reqtag: `c:workload`

A "workload" describes a unit of scalable deployment. It's akin to a K8S's deployment + service + ingress, or ECS's task or fly.io's machine or ControlPlane's workload.
Wing must support defining **containerized workloads** implemented through user-defined container
images. Images may either be pulled from a container registry or built from a `Dockerfile` within
the project directory.

### Simulator implementation (P1)

> Reqtag: `c:simulator`

When using Docker images, the Wing simulator will need to take care of seamlessly building and/or
pulling the container image and maintaining it's lifecycle and cleanup via a local docker
installation.

If docker is not installed, an error should provide useful instructions on how to install it.

### Hot reloading for fast local iteration (P1)

> Reqtag: `c:hot-reloading`

When developing a Wing application which references a locally defined container image, we would like
to support live updates which to instantly reload the program when the source changes.

>
> **Implementation Note:** Rebuilding the image every time will likely not be good enough and some
> kind of live update solution will be needed. An example of such a mechanism can be found in
> [Tilt](https://docs.tilt.dev/tutorial/5-live-update.html). Similar to Tilt's `live_update` clause,
> this will likely require additional information such as where the code resides inside the
> container and how to build it.
>

### Local debugging (P2)

> Reqtag: `c:debugging`

It should be possible to attach a debugger to a containerized workload (P2).

### Building images in `wing compile` (P1)

> Reqtag: `c:building`

When referencing a local container image, `wing compile` should take care of building the image
using `docker build`.

> **Implementation Note:** Since `docker build` is potentially expensive, we should implement a
> source hash-based mechanism to avoid building if the docker source context hasn't changed.

### Publishing images during deployment (P1)

> Reqtag: `c:publishing`

During deployment, the image needs to be pushed into a container registry (e.g. Docker Hub or ECR or
any other registry) and the latest image address wired up the to the IaC configuration.

This flow can wildly vary for different platforms (e.g. some organizations might prefer to use a
separate deployment system to publish images), but for the Terraform-based platforms (such as
`tf-aws`), we should treat this like we treat publishing an AWS Lambda zip archives to an S3 bucket
during deployment. Platform providers will need to explore a variety of configuration options to
control this behavior (P2).

We might be able to leverage the [Docker provider for
Terraform](https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs) with the approach
[suggested here](https://stackoverflow.com/a/76608435) to push the image during deployment to a
container registry.

>
> **Implementation Note:** Design the publishing mechanism with heavy hash-based caching in mind so
> that both `wing compile` and the Terraform image publishing step will be no-op if the container
> image hasn't changed.
>

### Workload runtime environment

> Reqtag: `c:environment`

It should be possible to configure the runtime environment of the containers.

The following is a non-exhaustive list of capabilities we will need to support:

* Expose network ports of various types (http, http2, grpc, ??) (P1)
* Command line arguments to pass to the container (P1)
* Environment variables (P1)
* Entrypoint command to override (if you wish to use a pre-built container image and just change the
  entrypoint) (P1)
* CPU and memory requirements (in some normalized model such as vCPUs, GBs) (P2)
* GPUs (P2)
* Liveness probe
* Readiness probe (P1)
* Sidecar containers (P2)
* Volumes (P2)
* etc...

Additional work is required to determine the correct surface area for this API. We recommend to try
and identify the common denominator across multiple container-based platforms such as Kubernetes
Deployment + Service, [ECS](https://aws.amazon.com/ecs/), [fly.io](https://fly.io),
[ControlPlane](https://github.com/controlplane-com/terraform-provider-cpln/blob/main/docs/resources/workload.md),
[Porter](https://www.porter.run/), etc.

### API endpoints (P1)

> Reqtag: `c:endpoints`

Users must be able to define path-based routing rules so that requests will be routed to the
workload.

Common underlying providers for this are the various Application Load Balancers which are usually
configured via Kubernetes [ingress
rules](https://kubernetes.io/docs/concepts/services-networking/ingress/).

## Cloud implementations

> Reqtag: `c:backends`

Wing platform providers should be able to use one of these container orchestration systems as a
backend to run containerized workloads:

1. EKS/GKE/AKS (P1)
2. [ECS](https://aws.amazon.com/ecs/)
3. Helm (basically Kubernetes `Deployment`, `Service` and `Ingress` resources)
4. [fly.io](https://fly.io)
5. [ControlPlane](https://github.com/controlplane-com/terraform-provider-cpln/blob/main/docs/resources/workload.md#nestedblock--options)

The default behavior for `tf-aws` should be to create a dedicated EKS cluster for the app (P1) but
users should be able to point to an existing EKS cluster through platform configuration options
(P2).

## Autoscaling

> Reqtag: `c:autoscaling`

It should be possible to define autoscaling parameters for a workload. 

Further research is needed to determine the desired degrees of freedom and default behavior. Ideally the default should "just work" and scale up and down elastically based on best practices and common metrics.



## Preflight object bindings

> Reqtag: `c:bindings`

Containers should be able to interact with Wing preflight objects through their inflight APIs
(similarly to how inflight closures can invoke inflight APIs of captured preflight objects). Since
the Winglang compiler cannot infer this automatically, we will need an API for explicitly specifying
these bindings.

We will also need a way for the code inside the container to be able to connect to the relevant
inflight client instance and interact with the object.

We can decompose this requirement into three:

1. Call non-Wing services using native clients (P1) (e.g. use the Redis client in Go to interact with a
   Redis resource). In this case, the code inside the container just uses a native client to
   interact with the cloud resource but we need a way to give the container the right connection
   string in order to be able to work across simulator and the cloud (in this case we don't have an
   abstraction for the resource).
1. Call Wing SDK clients from within a TypeScript/JavaScript container (P1). This means that the
   inflight client JavaScript code will need to be injected into the container during build, but the
   container code can just `import` the `@winglang/sdk` type definitions.
1. Call any SDK and user-defined Wing inflight API from TypeScript/JavaScript (P2). This means that
   we will need to inject the inflight client of Wing classes into the container during build and
   somehow emit typescript type definitions for development (another reason why the Wing compile
   needs to perform the build).
1. Call any Wing inflight API from other languages (P3): this is lower priority for now given the
   technical complexity but it would be healthy to start thinking about the path forward here. This
   could also be a multi-phased project where we start with something like a sidecar/child process
   (with generated client bindings) and then compile our inflight clients to WebAssembly when the
   ecosystem is mature enough (currently there is no AWS SDK for WebAssembly). 

The bindings APIs will need to also allow the user to specify the qualification of the bind (e.g.
the permission requirements) so that the relevant permissions can be created.

### Implementation for `cloud.Service` (P1)

> Reqtag: `c:cloud-service`

The `cloud.Service` resource exposes an API to implement a long running workload through a simple
inflight closure:

```js
new cloud.Service(inflight () => {
  log("service started");
  return () => {
    log("service stopped");
  };
});
```

This resource currently only has a simulator implementation. It bundles the inflight closure into a
Node.js program and runs it within a sandbox. We currently don't have a cloud implementation for
this resource, which is obviously a major gap.

Once we have support for containerized workloads, it should be possible to implement this resource
by synthesizing a Node.js docker image with the inflight closure code and a small wrapper (which
invokes the start/stop callbacks), and deploy it as a container. Technically we would be able to
remove the simulator implementation at that moment, because the simulator implementation of the
container should be sufficient.

This will also allow us to extend the `cloud.Service` API and support the various container
capabilities such as exposing ports and adding API routes.

### Implementation for `ex.Redis`, `ex.DynamoDb` (P2)

> Reqtag: `c:ex-redis`

We will also be able to implement other simulated resources such as `ex.Redis` and `ex.DynamoDb`
using this new API and remove the duplicated container-management code from them.

## Design Notes

This section includes a few notes related to the design and implementation of these requirements.
Consider them recommendations and pointers for the next phase of this project.

### SDK resources

I would recommend implementing this as a single "monolithic" resource called `cloud.Workload` which
will expose all of the features described in this spec. This will produce a rich model for
containerized workloads that will enable a powerful local implementation but also a high degree of
control when implementing platform providers.

I am not sure exactly what's the best way to model routing rules. One option could be to simply add
an API such as `workload.addRoute("/foo")`, which is not very different from specifying an ingress
rule in Kubernetes.

### Wing as a build system

The requirement to support **building** and **hot reloading** of containers also exists in other use
cases such as web applications and serverless functions implemented using non-Wing stacks. Basically
every time Wing needs to use some external build artifact.

This means that Wing needs to intimately understand the build process of the project. It needs to
understand the relationship between the Dockerfile and its source code (and invalidate the it as
needed both in "build" and in "watch"), and the same thing for a web application.

It might make sense to think about this as a more general purpose dependency graph (similar to how
Tilt is implemented) where nodes can be invalidated either in a "watch" mode or during compilation
and their consumers are invalidated accordingly.

Practically, we will need to think of the Wing preflight phase as *the build phase of the project*
and model our build within the Wing codebase instead of outside.
