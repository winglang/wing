let regularString = "str\n\"";
let emptyString = "";
let number = 1;

let coolString = "cool \"\${${regularString}}\" test";
let reallyCoolString = "${number}${emptyString}\n${coolString}\n\${empty_string}${"string-in-string"}!";

let beginingWithCoolStrings = "${regularString} ${number} <- cool";
let endingWithCoolStrings = "cool -> ${regularString} ${number}";