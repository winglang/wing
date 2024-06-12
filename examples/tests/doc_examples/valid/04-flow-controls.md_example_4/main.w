// This file was auto generated from an example found in: 04-flow-controls.md_example_4
// Example metadata: {"valid":true}
let var i = 0;
while i < 100 {
  i = i + 1;
  if i == 20 {
    // although the while loop goes to 100, we break it at 20
    break;
  }
  if i % 2 == 0 {
    // continue for even numbers
    continue;
  }
  log("{i}");
}
/** 
 * prints
  1
  3
  5
  7
  9
  11
  13
  15
  17
  19
**/
