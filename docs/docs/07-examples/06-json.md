---
title: Json
id: json
keywords: [Wing example]
---
## Create Json values

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
log("{j}");

let jsonStrValue = Json "Hello";
log("{jsonStrValue}");

let jsonNumValue = Json 42;
log("{jsonNumValue}");

let jsonBoolValue = Json true;
log("{jsonBoolValue}");

let jsonHomogeneousArrayValue = Json ["a", "b"];
log("{jsonHomogeneousArrayValue}");
```

### From existing variables

```js playground
let x: num = 42;
let jsonNum = Json x;
log("{jsonNum}"); // 42

let chars = Array<str>["a", "b"];
let jsonChars = Json chars;
log("{jsonChars}"); // ["a","b"]

let jsonComplex = Json { "first": x, "second": chars };
log("{jsonComplex}"); // {"first": 42, "second": ["a","b"]}
```

### Parsing `str`
```js playground
let jsonFromParse = Json.parse("{\"k1\":\"v\"}");
log("{jsonFromParse}");

if let jsonFromTryParse = Json.tryParse("{\"k1\":\"v\"}") {
  log("{jsonFromTryParse}");
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
  log("found key {k} with value {value}");
}
```
### Over values
```js playground
let j = Json {
    k1: "v1",
    k2: "v2"
};
for value in Json.values(j) {
  log("found value {value}");
}
```

### Over a json array
```js playground
let arrayValue = Json ["a", "b", "c"];
for v in Json.values(arrayValue) {
  log(str.fromJson(v));
}
```

## Safely convert to primitives
### To `str`
```js playground
let j = Json {
    k: "hello"
};

log(j.get("k").asStr());
```

### To `num`
```js playground
let j = Json {
    k: 12
};
log(j.get("k").asNum());
```

### To `bool`

```js playground
let j = Json {
    k:true
};
log(j.get("k").asBool());
```

## Safely convert to structs
```js playground
struct Foo {
  val1: str;
  val2: num;
}

let jFoo = {
  val1: "cool",
  val2: 21
};

let foo = Foo.fromJson(jFoo);
```