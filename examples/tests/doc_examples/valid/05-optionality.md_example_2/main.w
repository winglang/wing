// This file was auto generated from an example found in: 05-optionality.md_example_2
// Example metadata: {"valid":true}
let s1: str? = "Hello"; // type str? (optional), value "Hello"
let s2: str? = nil; // type str? (optional), value nil

if s1 != nil {
  log("x1 is not nil");
}
if s2 == nil {
  log("x2 is nil");
}
