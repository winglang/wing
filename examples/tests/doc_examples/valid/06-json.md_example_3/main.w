// This file was auto generated from an example found in: 06-json.md_example_3
// Example metadata: {"valid":true}
let j = Json {
    k1: "v1",
    k2: "v2"
};
for k in Json.keys(j) {
  let value = j.get(k);
  log("found key {k} with value {value}");
}
