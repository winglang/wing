let e1 = 2 + "2";
// ERR   ^^^^^^^ Cannot add a string to a number

let e2 = 2 == "2";
// ERR   ^^^^^^^ Cannot compare a string to a number

let str_example = "Hello World";
let num_example = 2;

let e3 = "${str_example}!" * num_example;
// ERR   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Cannot multiply a string with a number