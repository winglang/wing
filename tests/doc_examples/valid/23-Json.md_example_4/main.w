// This file was auto generated from an example found in: 23-Json.md_example_4
// Example metadata: {"valid":true}
let j = Json {
    k1: "v1",
    k2: "v2"
};
for k in Json.keys(j) {
  let value = j.get(k);
  log("found key {k} with value {value}");
}
