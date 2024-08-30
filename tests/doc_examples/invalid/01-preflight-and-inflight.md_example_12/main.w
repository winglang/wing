// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_12
// Example metadata: {"valid":false}
let var count = 3;
let names = MutArray<str>["John", "Jane", "Joe"];

count = count + 1; // OK
names.push("Jack"); // OK

inflight () => {
  count = count + 1; // error: Variable cannot be reassigned from inflight
  names.push("Jill"); // error: push doesn't exist in Array
};
