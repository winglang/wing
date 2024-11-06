// This file was auto generated from an example found in: 23-Json.md_example_5
// Example metadata: {"valid":true}
let j = Json {
    k1: "v1",
    k2: "v2"
};
for value in Json.values(j) {
  log("found value {value}");
}
