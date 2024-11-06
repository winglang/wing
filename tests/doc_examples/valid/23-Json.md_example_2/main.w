// This file was auto generated from an example found in: 23-Json.md_example_2
// Example metadata: {"valid":true}
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
