---
title: Function
id: function
description: A built-in resource for creating serverless functions.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Serverless function,
  ]
---

The `cloud.Function` resource represents a serverless function for performing short, stateless tasks.
Functions are typically used to run business logic in response to events, such as a file being uploaded to a bucket, a message being pushed to a queue, or a timer expiring.

When a function is invoked on a cloud provider, it is typically executed in a container that is spun up on demand.
The container is then destroyed after the function finishes executing.

Functions may be invoked more than once, and some cloud providers may automatically retry failed invocations.
For performance reasons, most cloud providers impose a timeout on functions, after which the function is automatically terminated.

## Usage

TODO

## Target-specific details

TODO

## API Reference

The full list of APIs for `cloud.Function` is available in the [API Reference](../api-reference).
