---
title: Cheatsheet
id: cheat-sheet
keywords: [Wing example, simulator, Wing simulator Reference]
---

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} maxHeadingLevel={5}/>

#### Variable declaration 
```js playground

```
#### Function declaration and invocations
#### Creating string, bool, numbers
#### Creating arrays, maps, set
#### Using javascript code
#### Creating tests 
#### Preflight Classes and Interfaces
```js playground
bring cloud;

interface IKVStore extends std.IResource {
  inflight get(key: str): Json;
  inflight set(key: str, value: Json): void;
}

class BucketBasedKeyValueStore impl IKVStore {
  bucket: cloud.Bucket;
  init() {
    this.bucket = new cloud.Bucket();
  }
  inflight get(key: str): Json {
    return this.bucket.getJson(key);
  }
  inflight set(key: str, value: Json): void {
    this.bucket.putJson(key, value);
  }
}

class TableBasedKeyValueStore impl IKVStore {
  table: cloud.Table;
  init() {
    this.table = new cloud.Table(
      name: "table",
      primaryKey: "key",
      columns: {
        value: cloud.ColumnType.STRING
      }
    );
  }
  inflight get(key: str): Json {
    return this.table.get(key);
  }
  inflight set(key: str, value: Json): str {
    this.table.insert(key, value);
  }
}

let bucketBased: IKVStore = new BucketBasedKeyValueStore();
let tableBased: IKVStore = new TableBasedKeyValueStore();

test "get and set on bucketBased" {
  bucketBased.set("k", Json { 
    value: "v" 
  });
  let result = bucketBased.get("k");
  assert("v" == str.fromJson(result.get("value")));
}

test "get and set on tableBased" {
  tableBased.set("k", Json { 
    value: "v" 
  });
  let result = tableBased.get("k");
  log("${result}");
  assert("v" == str.fromJson(result.get("value")));
}
```
#### Flow Controls: conditions, if statements & loops
#### Enumerating over arrays, maps, sets
#### Converting immutable to mutable
#### Creating jsons
```js playground
test "json" {
  let mixedJson = Json {
    k1: 1,
    k2: "hello",
    k3: true,
    k4: {
      k1: [1, "a", true, {} ]
    }
  };
  log(mixedJson);
}
test "string value" {
  let jsonStrValue = Json "Hello";
  log(jsonStrValue);
}
test "num value" {
  let jsonNumValue = Json 42;
  log(jsonNumValue);
}
test "bool value" {
  let jsonBoolValue = Json true;
  log(jsonBoolValue);
}
test "homogeneous array" {
  let jsonHomogeneousArrayValue = Json Array<str> ["a", "b"];
  log(jsonHomogeneousArrayValue);
}
test "parsing a json string" {
  let jsonFromParse = Json.parse("{\"k1\":\"v\"}");
  log(jsonFromParse);
}
test "try parsing a json string" {
  if let jsonFromTryParse = Json.tryParse("{\"k1\":\"v\"}") {
    log(jsonFromTryParse);
  }
}

  
```
#### Enumerating over Json
```js playground
let j = Json {
    k1: "v1",
    k2: "v2"
};
test "enumerate over keys" {
  for k in Json.keys(j) {
    let value = j.get(k);
    log("found key ${k} with value ${value}");
  }
}
test "enumerate over values" {
  for value in Json.values(j) {
     log("found value ${value}");
  }
}
test "enumerate over a json array" {
  let j = Json ["a", "b", "c"];
  for v in Json.values(j) {
    log("${v}");
  }
}
```
#### Converting Json to primitives
```js playground
let j = Json {
    k1: "hello",
    k2: 42,
    k3: true
};

test "converting to string" {
  let jsonStringValue = j.get("k1");
  let s = str.fromJson(jsonStringValue);
  assert(jsonStringValue == Json "hello");
  assert("hello" == s);
}

test "converting to num" {
  let jsonNumValue = j.get("k2");
  let n = num.fromJson(jsonNumValue);
  assert(jsonNumValue == Json 42);
  assert(n == 42);
}

test "converting to bool" {
  let jsonBoolValue = j.get("k3");
  let b = bool.fromJson(jsonBoolValue);
  assert(jsonBoolValue == Json true);
  assert(b);
}
```
#### Api gateway setting GET/POST/PUT/DELETE routes
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

#### Api gateway reading path parameters 
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

test "verify path params" {
  // TODO
}
```

#### Api gateway json body
```js playground
bring cloud;

let api = new cloud.Api();

api.put("/items/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let itemId = req.vars.get("id");
  if let itemBody = Json.tryParse(req.body) {
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