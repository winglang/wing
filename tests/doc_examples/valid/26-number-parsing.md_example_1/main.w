// This file was auto generated from an example found in: 26-number-parsing.md_example_1
// Example metadata: {"valid":true}
let j = Json { a: 100 };

let x: num = num.fromStr("1");
let y: num = num.fromJson(j.get("a"));

log(x);
log(y);
