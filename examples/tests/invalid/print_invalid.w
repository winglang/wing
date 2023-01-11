print("hey").get("x");
// ^^^^^^^^^ Expression must be a class or resource instance to access property "get", instead found type "void"

let x = "my name is ${print("mister cloud")}";
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be one of "str,num", but got "void" instead

let x = 5 + print("hello");
//          ^^^^^^^^^^^^^^ Expected type to be "num", but got "void" instead