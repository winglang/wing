let e1 = 2 + "2";
// ERR   ^^^^^^^ Cannot add a string to a number

let e2 = 2 == "2";
// ERR   ^^^^^^^ Cannot compare a string to a number

let strExample = "Hello World";
let numExample = 2;

let e3 = "{strExample}!" * numExample;
// ERR   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Cannot multiply a string with a number

let var a = 2;
let b = "2";
a += b;
// ERR   ^^^^^ Cannot add a number to a string
