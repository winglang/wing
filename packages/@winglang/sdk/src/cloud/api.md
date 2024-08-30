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
sidebar_position: 1
---

The `cloud.Api` resource represents a collection of HTTP endpoints that can be invoked by clients over the internet.
APIs often serve as the front door for applications to access data, business logic, or functionality from your backend services.

The `Api` resource models an endpoint as a collection of routes, each mapped to an event handler function.
A route is a combination of a path, like `"/users/:userid"` and a set of HTTP methods, like `GET`, `POST`, or `DELETE`.
When a client invokes a route, the corresponding event handler function executes.

## Usage

### REST API

The following example shows a complete REST API implementation using `cloud.Api`, `cloud.Bucket` & `cloud.Counter`

```ts playground example
bring cloud;

let api = new cloud.Api();
// Used for generating unique id
let counter = new cloud.Counter();
// our employee data
let store = new cloud.Bucket();

api.get("/employees", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let result = MutJson [];
  let var i = 0;
  for employee in store.list() {
    result.setAt(i, employee);
    i = i + 1;
  }
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(result)
  };
});


api.get("/employees/:id", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let employee = store.get(request.vars.get("id"));
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(employee)
  };
});

api.post("/employees", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
   if let body = request.body {
    let employeeData = Json.parse(body);
    let id = "{counter.inc()}";
    store.putJson(id, employeeData);
    return cloud.ApiResponse {
      status: 201,
      body: id
    };
   }
});

api.put("/employees/:id", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  if let body = request.body {
    let employeeData = Json.parse(body);
    let id = request.vars.get("id");
    store.putJson(id, employeeData);
    return cloud.ApiResponse {
      status: 200,
      body: Json.stringify(employeeData)
    };
  }
});

api.delete("/employees/:id", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let id = request.vars.get("id");
  store.delete(id);
  return cloud.ApiResponse {
    status: 204
  };
});
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Api` uses [nodejs express](https://expressjs.com/).

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Api` uses [Amazon API Gateway](https://aws.amazon.com/api-gateway/).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#625](https://github.com/winglang/wing/issues/625))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#624](https://github.com/winglang/wing/issues/624))
