// This file was auto generated from an example found in: 06-json.md_example_5
// Example metadata: {"valid":true}
let arrayValue = Json ["a", "b", "c"];
for v in Json.values(arrayValue) {
  log(str.fromJson(v));
}
