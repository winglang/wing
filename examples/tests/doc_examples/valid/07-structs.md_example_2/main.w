// This file was auto generated from an example found in: 07-structs.md_example_2
// Example metadata: {"valid":true}
struct Example {
  a: str?;
  b: num?;
  c: bool?;
}

let example = Example { };
if ! example.a? {
  log("a is nil"); 
}
