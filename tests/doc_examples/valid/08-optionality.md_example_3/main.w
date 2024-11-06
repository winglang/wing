// This file was auto generated from an example found in: 08-optionality.md_example_3
// Example metadata: {"valid":true}
let s1: str? = nil; // type str? (optional), value nil
let s2 = s1 ?? "default value";  // s2 is of type str
log(s2); // prints default value
