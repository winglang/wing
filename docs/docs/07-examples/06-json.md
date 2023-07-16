---
title: Json
id: json
keywords: [Wing example]
---
## Create Json values

### Using Json literal
```js playground
bring cloud;

  new cloud.Function(inflight () => {
  let j = Json {
    k1: 1,
    k2: "hello",
    k3: true,
    k4: {
      k1: [1, "a", true, {} ]
    }
  };
  log("${j}");
  
  let jsonStrValue = Json "Hello";
  log("${jsonStrValue}");
  
  let jsonNumValue = Json 42;
  log("${jsonNumValue}");
  
  let jsonBoolValue = Json true;
  log("${jsonBoolValue}");
  
  let jsonHomogeneousArrayValue = Json ["a", "b"];
  log("${jsonHomogeneousArrayValue}");
}) as 'main';
```

### From existing variables

```js playground
bring cloud;

new cloud.Function(inflight () => {
  let x: num = 42;
  let jsonNum = Json x;
  log("${j}"); // 42
  
  let chars = Array<str>["a", "b"];
  let jsonChars = Json chars;
  log("${chars}"); // ["a","b"]
  
  let jsonComplex = Json { "first": x, "second": chars };
  log("${jsonComplex}"); // {"first": 42, "second": ["a","b"]}
}) as 'main';
```

### Parsing `str`
```js playground
bring cloud;

new cloud.Function(inflight () => {
  let jsonFromParse = Json.parse("{\"k1\":\"v\"}");
  log("${jsonFromParse}");
  
  if let jsonFromTryParse = Json.tryParse("{\"k1\":\"v\"}") {
    log("${jsonFromTryParse}");
  } else {
    log("failed to parse string to JSON");
  }
}) as 'main';
```

## Enumerating 
### Over keys
```js playground
bring cloud;

new cloud.Function(inflight () => {
  let j = Json {
      k1: "v1",
      k2: "v2"
  };
  for k in Json.keys(j) {
    let value = j.get(k);
    log("found key ${k} with value ${value}");
  }
}) as 'main';
```
### Over values
```js playground
bring cloud;

new cloud.Function(inflight () => {
  let j = Json {
      k1: "v1",
      k2: "v2"
  };
  for value in Json.values(j) {
    log("found value ${value}");
  }
}) as 'main';
```

### Over a json array
```js playground
bring cloud;

new cloud.Function(inflight () => {
  let arrayValue = Json ["a", "b", "c"];
  for v in Json.values(arrayValue) {
    log(str.fromJson(v));
  }
}) as 'main';
```

## Safely convert to primitives
### To `str`
```js playground
bring cloud;

new cloud.Function(inflight () => {
  let j = Json {
      k: "hello"
  };
  
  log(j.get("k").asStr());
}) as 'main';
```

### To `num`
```js playground
bring cloud;

new cloud.Function(inflight () => {
  let j = Json {
      k: 12
  };
  log(j.get("k").asNum());
}) as 'main';
```

### To `bool`

```js playground
bring cloud;

new cloud.Function(inflight () => {
  let j = Json {
      k:true
  };
  log(j.get("k").asBool());
}) as 'main';
```

Future support for converting to structs and other types: [#2188](https://github.com/winglang/wing/issues/2118)
