---
title: API gateway
id: api-gateway
keywords: [Wing example]
---

### Creating routes
```js playground example
bring cloud;

let api = new cloud.Api();

api.get("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200,
      body: "Hello GET"
    };
});
api.post("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200,
      body: "Hello POST"
    };
});
api.put("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200, body:
      "Hello PUT"
    };
});
api.delete("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200,
      body: "Hello DELETE"
    };
});
```

### Path parameters 
```js playground example
bring cloud;

let api = new cloud.Api();

api.get("/items/:id/:value", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let itemId = req.vars.get("id");
  let itemValue = req.vars.get("value");
  log("Received itemId:{itemId}, itemValue:{itemValue}");
  return cloud.ApiResponse {
    status: 200,
    body: "Received itemId:{itemId}, itemValue:{itemValue}"
  };
});

```

### Json body
```js playground example
bring cloud;

let api = new cloud.Api();

api.put("/items/:id", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let itemId = req.vars.get("id");
  if let itemBody = Json.tryParse(req.body ?? "") {    
    return cloud.ApiResponse {
        status: 200,
        body: "Received id {itemId} with body {itemBody}"
    };
  }
  return cloud.ApiResponse {
      status: 400,
      body: "Missing body"
  };
});
``` 