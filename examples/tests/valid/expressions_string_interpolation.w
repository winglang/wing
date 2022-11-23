let regular_string = "str\n\"";
let empty_string = "";
let number = 1;

let cool_string = "cool \"\${${regular_string}}\" test";
let really_cool_string = "${number}${empty_string}\n${cool_string}\n\${empty_string}${"string-in-string"}!";
