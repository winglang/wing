let regularString = "str\n\"";
let emptyString = "";
let number = 1;

let coolString = "cool \"\{{regularString}}\" test";
let reallyCoolString = "{number}{emptyString}\n{coolString}\n\{empty_string}{"string-in-string"}!";

let beginingWithCoolStrings = "{regularString} {number} <- cool";
let endingWithCoolStrings = "cool -> {regularString} {number}";

assert("{1+1}" == "2");
assert("\{1+1}" == "\{1+1}");
assert("\{1+1}" != "2");
assert("\{1+1}" != "\{2}");

test "str interpolation with lifted expr" {
    let i = 1336;
    let s = "leet: {i+number}";
    assert(s == "leet: 1337");
}