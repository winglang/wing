---
title: Json
id: json
keywords: [Wing example]
---
## Creation
### Using Json literal
```js playground
let j = Json {
    k1: 1,
    k2: "hello",
    k3: true,
    k4: {
      k1: [1, "a", true, {} ]
    }
  };
  log(j);
```
### From `str`
```js playground
let jsonStrValue = Json "Hello";
log(jsonStrValue);
```
### From `num`
```js playground
let jsonNumValue = Json 42;
log(jsonNumValue);
```
### From `bool`
```js playground
let jsonBoolValue = Json true;
log(jsonBoolValue);
```
### From `array`
```js playground
let jsonHomogeneousArrayValue = Json Array<str> ["a", "b"];
log(jsonHomogeneousArrayValue);
```
----------
```js playground
test "json" {
  
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
### Parsing `str`
```js playground
let jsonFromParse = Json.parse("{\"k1\":\"v\"}");
log(jsonFromParse);

if let jsonFromTryParse = Json.tryParse("{\"k1\":\"v\"}") {
  log(jsonFromTryParse);
} else {
  log("failed to parse string to JSON");
}

```
## Enumerating 
### Over keys
```js playground
let j = Json {
    k1: "v1",
    k2: "v2"
};
for k in Json.keys(j) {
  let value = j.get(k);
  log("found key ${k} with value ${value}");
}
```
### Over values
```js playground
let j = Json {
    k1: "v1",
    k2: "v2"
};
for value in Json.values(j) {
  log("found value ${value}");
}
```

### Over a json array
```js playground
let arrayValue = Json ["a", "b", "c"];
for v in Json.values(arrayValue) {
  log(str.fromJson(v));
}
```
### To Primitives
#### To `str`
```js playground
let j = Json {
    k1: "hello"
};

let jsonStringValue = j.get("k1");
let s = str.fromJson(jsonStringValue);
assert(jsonStringValue == Json "hello");
assert("hello" == s);
```

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