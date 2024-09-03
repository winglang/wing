// This file was auto generated from an example found in: 04-flow-controls.md_example_1
// Example metadata: {"valid":true}
let iterable = ["a", "b", "c", "d", "e", "f", "g", "h"];
for value in iterable {
  if value == "g" {
    // stopping at g
    break;
  }
  if value == "b" {
    // skipping b
    continue;
  }
  log(value);
}
/** 
 * prints
 a
 c
 d
 e
 f
**/
