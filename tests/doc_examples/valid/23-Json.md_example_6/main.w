// This file was auto generated from an example found in: 23-Json.md_example_6
// Example metadata: {"valid":true}
let arrayValue = Json ["a", "b", "c"];
for v in Json.values(arrayValue) {
  log(str.fromJson(v));
}
