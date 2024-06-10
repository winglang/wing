// This file was auto generated from an example found in: 01-variable-declaration.md_example_5
// Example metadata: {"valid":true}
let s = "parent";
log(s); // prints parent
if true {
  let s = "inner";
  log(s); // prints inner
}
log(s); // prints parent
