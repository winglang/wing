---
title: "#4350 Containers - Requirements"
description: Requirements for compute resources in the Wing Cloud Library
---

# Containers - Requirements Specification

- **Author(s)**: @eladb
- **Submission Date**: 2023-10-01
- **Stage**: Proposal
- **Stage Date**: 2023-10-01

The Wing Cloud Library includes a few resources designed to run workloads in the cloud. At the time of this writing we have two: [`cloud.Function`](https://www.winglang.io/docs/standard-library/cloud/function) and [`cloud.Service`](https://www.winglang.io/docs/standard-library/cloud/service).

This specification is a list of *requirements* we have identified in the past few months related to containers. The code snippets are provided to illustrate the requirements and inspire the design phase to be followed.





## Container images as an alternative of inflight closures

> Reqtag: `c:containers-as-inflights`

At the moment, the `cloud.Service` and `cloud.Function` APIs accept [*inflight closures*](https://www.winglang.io/docs/concepts/inflights) as input:

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

Users should be able to


When compiled to a cloud provider, `cloud.Function`s are normally implemented through a serverless compute resource such as AWS Lambda or Azure Functions. 

For `cloud.Service`, we still don't have an implementation, but the plan is to use a container-based compute platform such as ECS and/or Kubernetes.



## Build docker images

## Event handlers