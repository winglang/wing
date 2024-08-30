// This file was auto generated from an example found in: 06-json.md_example_1
// Example metadata: {"valid":true}
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
