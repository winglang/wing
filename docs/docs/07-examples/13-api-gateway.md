---
title: API gateway
id: api-gateway
keywords: [Wing example]
---

### Creating routes
```js playground
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
```js playground
bring cloud;

let api = new cloud.Api();

api.get("/items/{id}/{value}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let itemId = req.vars.get("id");
  let itemValue = req.vars.get("value");
  log("Received itemId:${itemId}, itemValue:${itemValue}");
  return cloud.ApiResponse {
    status: 200,
    body: "Received itemId:${itemId}, itemValue:${itemValue}"
  };
});

```

### Json body
```js playground
bring cloud;

let api = new cloud.Api();

api.put("/items/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let itemId = req.vars.get("id");
  if let itemBody = Json.tryParse(req.body ?? "") {    
    return cloud.ApiResponse {
        status: 200,
        body: "Received id ${itemId} with body ${itemBody}"
    };
  }
  return cloud.ApiResponse {
      status: 400,
      body: "Missing body"
  };
});
```

### Complete REST API

The following example shows a complete REST API implementation using cloud.Api, ex.Table & cloud.Counter

```js playground
bring cloud;
bring ex;

let api = new cloud.Api();
// Used for generating unique id
let counter = new cloud.Counter();
// our employee database
let db = new ex.Table(
  name: "employees",
  primaryKey: "id",
  columns: {
    "name" => ex.ColumnType.STRING
  }
);

api.get("/employees", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let result = MutJson [];
  let var i = 0;
  for employee in db.list() {
    result.setAt(i, employee);
    i = i + 1;
  }
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(result)
  };
});


api.get("/employees/{id}", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let employee = db.get(request.vars.get("id"));
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(employee)
  };
});

api.post("/employees", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
   if let body = request.body {
    let employeeData = Json.parse(body);
    let id = "${counter.inc()}";
    db.insert(id, employeeData);
    return cloud.ApiResponse {
      status: 201,
      body: id
    };
   }
});

api.put("/employees/{id}", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  if let body = request.body {
    let employeeData = Json.parse(body);
    let id = request.vars.get("id");
    db.update(id, employeeData);
    return cloud.ApiResponse {
      status: 200,
      body: Json.stringify(employeeData)
    };
  }
});

api.delete("/employees/{id}", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let id = request.vars.get("id");
  db.delete(id);
  return cloud.ApiResponse {
    status: 204
  };
});
```


