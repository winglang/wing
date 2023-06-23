---
title: Api
id: api
description: A built-in resource for creating HTTP endpoints in the cloud.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    APIs,
    Endpoints,
    HTTP endpoint,
  ]
---

The `cloud.Api` resource represents a collection of HTTP endpoints that can be invoked by clients over the internet.
APIs often serve as the front door for applications to access data, business logic, or functionality from your backend services.

The `Api` resource models an endpoint as a collection of routes, each mapped to an event handler function.
A route is a combination of a path, like `"/users/{userid}"` and a set of HTTP methods, like `GET`, `POST`, or `DELETE`.
When a client invokes a route, the corresponding event handler function executes.

## Usage

TODO

## Target-specific details

TODO

## API Reference

The full list of APIs for `cloud.Api` is available in the [API Reference](../api-reference).
