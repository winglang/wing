// This file was auto generated from an example found in: 01-variable-declaration.md_example_4
// Example metadata: {"valid":false}
let var x1 = "Hello"; // type str, value "Hello"
let var x2: str = "Hello"; // same as above 
let var x3: str? = "Hello"; // type str? (optional), value "Hello"
let var x4: str? = nil; // type str? (optional), value nil

x1 = nil; // ERROR: Expected type to be "str", but got "nil" instead
x3 = nil; // OK (x3 is optional)
