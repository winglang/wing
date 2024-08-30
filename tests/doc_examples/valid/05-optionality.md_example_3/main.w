// This file was auto generated from an example found in: 05-optionality.md_example_3
// Example metadata: {"valid":true}
let s1: str? = "Hello"; // type str? (optional), value "Hello"

// unwrap optional s1 and create s from type str
if let s = s1 {
  log("s is not optional, value {s}");
} else {
  log("s1 was nil, s doesn't exists in this scope");
}

// same as above but shadowing s1 variable
if let s1 = s1 {
  log("s1 type is str, value {s1}");
} else {
  log("s1 was nil");
}
log("s1 type is optional str");
