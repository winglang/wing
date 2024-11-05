---
title: Json
id: json
slug: /json
sidebar_label: Json
description: Create Json values in Wing
keywords: [Wing language, json]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/23-Json.md
---

Wing has a dedicated type named `Json` for representing [JSON](https://www.json.org/json-en.html). A `Json` value can be an object, but it can also be an array, string, boolean, number, or null.

```js playground example title="main.w"
let person = Json {
    firstName: "John",
    lastName: "Smith"
};

// stringify
log(Json.stringify(person)); // {"firstName":"John","lastName":"Smith"}

// parse 
log(Json.parse("\{\"firstName\":\"John\",\"lastName\":\"Smith\"}")); // { firstName: 'John', lastName: 'Smith' }

// Try and parse
if let jsonFromTryParse = Json.tryParse("\{\"firstName\":\"John\",\"lastName\":\"Smith\"}") {
  log("{jsonFromTryParse}"); // {"firstName":"John","lastName":"Smith"}
} else {
  log("failed to parse string to JSON");
}

// Deep copy of Json
let newPerson = Json.deepCopy(person);
log(Json.stringify(person)); // {"firstName":"John","lastName":"Smith"}


```

## Using Json literals
```js playground example title="main.w"
let j = Json {
  k1: 1,
  k2: "hello",
  k3: true,
  k4: {
    k1: [1, "a", true, {} ]
  }
};
log("{j}"); // {"k1":1,"k2":"hello","k3":true,"k4":{"k1":[1,"a",true,{}]}}

let jsonStrValue = Json "Hello";
log("{jsonStrValue}"); // "Hello"

let jsonNumValue = Json 42;
log("{jsonNumValue}"); // 42

let jsonBoolValue = Json true;
log("{jsonBoolValue}"); // true 

let jsonHomogeneousArrayValue = Json ["a", "b"];
log("{jsonHomogeneousArrayValue}"); // ["a","b"]
```

## From existing variables
```js playground example title="main.w"
let x: num = 42;
let jsonNum = Json x;
log("{jsonNum}"); // 42

let chars = Array<str>["a", "b"];
let jsonChars = Json chars;
log("{jsonChars}"); // ["a","b"]

let jsonComplex = Json { "first": x, "second": chars };
log("{jsonComplex}"); // {"first": 42, "second": ["a","b"]}
```

## Enumerating 
### Over keys
```js playground example
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
```js playground example
let j = Json {
    k1: "v1",
    k2: "v2"
};
for value in Json.values(j) {
  log("found value {value}");
}
```

### Over a json array
```js playground example
let arrayValue = Json ["a", "b", "c"];
for v in Json.values(arrayValue) {
  log(str.fromJson(v));
}
```


## Safely convert to primitives
### To `str`
```js playground example
let j = Json {
    k: "hello"
};

log(j.get("k").asStr());
```

### To `num`
```js playground example
let j = Json {
  k: 12
};
log("{j.get("k").asNum()}");
```

### To `bool`

```js playground example
let j = Json {
  k:true
};
log("{j.get("k").asBool()}");
```

## Safely convert to structs
```js playground example
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