// This file was auto generated from an example found in: 09-arrays.md_example_1
// Example metadata: {"valid":true}
let a = MutArray<num>[1, 2, 3];

log("{a[0]}, {a[1]}, {a[2]}");

a[2] = 4;

log("mutated value: {a[2]}");
log("len: {a.length}");

let data = MutArray<num>[1, 2, 3];
let twoD = MutArray<MutArray<num>>[data];

for array in twoD {
  for item in array {
    log(item * 10);
  }
} 
