// arrays

assert([{a: 1}] == [{a: 1}]);

assert(MutArray<Json>[{a: 1}] == Array<Json>[MutJson{a: 1}]);
// this is fine- we ignore mutable

assert([1,2] == ["a", "b"]);
//     ^^^^^^^^^^^^^^^^^^^ Expected type to be "Array<num>", but got "Array<str>" instead

assert(["a", "b"] == [1,2]);
//     ^^^^^^^^^^^^^^^^^^^ Expected type to be "Array<str>", but got "Array<num>" instead

assert([{a: 1}] == ["1", "2"]);
//this doesn't throw an error since string is a subtype of json


assert(["1", "2"] == [{a: 1}]);
//     ^^^^^^^^^^^^^^^^^^^^^^ Expected type to be "Array<str>", but got "Array<Json>" instead

assert([["1", "2"]] == [[{a: 1}]]);
//     ^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be "Array<Array<str>>", but got "Array<Array<Json>>" instead

assert({"a" => ["a"]} == {"a" => [1]});
//     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be "Map<Array<str>>", but got "Map<Array<num>>" instead

assert([{"a" => [1]}] == [{"a" => ["a"]}]);
//     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be "Array<Map<Array<num>>>", but got "Array<Map<Array<str>>>" instead

let a1: Array<bool>? = nil;
let a2: Array<str>? = nil;

assert(a1 == a2);
//     ^^^^^^^^ Expected type to be "Array<bool>?", but got "Array<str>?" instead

let b1: Array<str> = [];
let b2: Array<str>? = [];

assert(b1 == b2);
//     ^^^^^^^^ Expected type to be "Array<str>", but got "Array<str>?" instead

assert([nil] == ["a"]);
//     ^^^^^^^^^^^^^^ Expected type to be "Array<nil>", but got "Array<str>" instead

assert(Array<Json>[nil] == ["a"]);
//                 ^^^ Expected type to be "Json", but got "nil" instead. hint: to allow "nil" assignment use optional type: "Json?"

assert(Array<Json?>[nil] == ["a"]);
// this is ok
