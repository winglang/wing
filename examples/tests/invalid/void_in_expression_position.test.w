log("hey").get("x");
// ^^^^^^^^^ Expression must be a class to access property "get", instead found type "void"

let x = "my name is ${log("mister cloud")}";
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be one of "str,num", but got "void" instead

let y = 5 + log("hello");
//          ^^^^^^^^^^^^^^ Expected type to be "num", but got "void" instead

let returnsNothing = () => {};
let z = returnsNothing();
//      ^^^^^^^^^^^^^^^^^ Cannot assign expression of type "void" to a variable