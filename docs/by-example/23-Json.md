---
title: Json
id: json
slug: /json
sidebar_label: Json
description: Create Json values in Wing
keywords: [Wing language, json]
image: /img/wing-by-example.png
---

Wing has a dedicated type named `Json` for representing [JSON](https://www.json.org/json-en.html). A `Json` value can be an object, but it can also be an array, string, boolean, number, or null.

```js playground example title="main.w"
let person = Json {
    firstName: "John",
    lastName: "Smith"
};

// stringify
log(Json.stringify(person));

// parse 
log(Json.parse("\{\"firstName\":\"John\",\"lastName\":\"Smith\"}"));

// Try and parse
if let jsonFromTryParse = Json.tryParse("\{\"firstName\":\"John\",\"lastName\":\"Smith\"}") {
  log("{jsonFromTryParse}");
} else {
  log("failed to parse string to JSON");
}

// Deep copy of Json
let newPerson = Json.deepCopy(person);
log(Json.stringify(person));

// iterate over keys
for k in Json.keys(person) {
  let value = person.get(k);
  log("found key {k} with value {value}");
}

// iterate over values
for value in Json.values(person) {
  log("found value {value}");
}

// iterate over array
let arrayValue = Json ["a", "b", "c"];
for v in Json.values(arrayValue) {
  log(str.fromJson(v));
}

// Convert to structs
struct Foo {
  val1: str;
  val2: num;
}

let jFoo = {
  val1: "cool",
  val2: 21
};

let foo = Foo.fromJson(jFoo);
log(Json.stringify(foo));
```

```bash title="Wing console output"
# Run locally with wing console
wing it

{"firstName":"John","lastName":"Smith"}
{ firstName: 'John', lastName: 'Smith' }
{"firstName":"John","lastName":"Smith"}
{"firstName":"John","lastName":"Smith"}
found key firstName with value "John"
found key lastName with value "Smith"
found value "John"
found value "Smith"
a
b
c
{"val1":"cool","val2":21}
```




