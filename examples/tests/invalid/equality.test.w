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


let c1: num? = nil;
let c2: str? = nil;
assert([c1] == [c2]);
//     ^^^^^^^^^^^^ Expected type to be "Array<num?>", but got "Array<str?>" instead


assert([[1]] == [["1"]]);
//     ^^^^^^^^^^^^^^^^ Expected type to be "Array<Array<num>>", but got "Array<Array<str>>" instead

assert([["1"]] == [[1]]);
//     ^^^^^^^^^^^^^^^^ Expected type to be "Array<Array<str>>", but got "Array<Array<num>>" instead

let d1 = {"a" => 1};
let d2 = {"b" => "b"};
assert(d1 == d2);
//     ^^^^^^^^ Expected type to be "Map<num>", but got "Map<str>" instead

let e1 = MutSet<bool>[true, true, true];
let e2 = Set<num>[1,2,3,3,3,2];

assert(e1 == e2);
//     ^^^^^^^^ Expected type to be "MutSet<bool>", but got "Set<num>" instead

let f1 = Set<num>[1,2,3,3,3,2];
let f2 = MutSet<num>[1,2,3,3,3,2];

assert(f1 == f2);
// this is ok