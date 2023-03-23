log("hey").get("x");
// ^^^^^^^^^ Expression must be a class or resource instance to access property "get", instead found type "void"

let x = "my name is ${log("mister cloud")}";
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be one of "str,num", but got "void" instead

let y = 5 + log("hello");
//          ^^^^^^^^^^^^^^ Expected type to be "num", but got "void" instead

let returns_nothing = () => {};
let z = returns_nothing();
//      ^^^^^^^^^^^^^^^^^ Cannot assign expression of type "void" to a variable