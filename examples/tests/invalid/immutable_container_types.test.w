let m1 = Map<str>{"a" => "hi"};

m1.set("a", "bye");
// ^^^ Member "set" doesn't exist in "Map" (TODO: better error message https://github.com/winglang/wing/issues/1660)

let m2: Map<str> = MutMap<str> {};
//                 ^^^^^^^^^^^^^^ Expected type to be "Map<str>", but got "MutMap<str>" instead
let m3 = Map<bool> { "a" => "A" };
//                          ^^^ Expected type to be "bool", but got "str" instead
let m4 = {"1" => 1, "2" => 2 };
m4.set("2", 3);
// ^^^ Member "set" doesn't exist in "Map"
let m5 = m4.copy();
//          ^^^^ Member "copy" doesn't exist in "Map"
m4.delete("1");
// ^^^^^^ Member "delete" doesn't exist in "Map"
m4.clear();
// ^^^^^ Member "clear" doesn't exist in "Map"


let s1: Set<Array<num>> = MutSet<Array<num>>[[1]];
//                        ^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be "Set<Array<num>>", but got "MutSet<Array<num>>" instead
let s2 = Set<str> ["a", "b", "c"];
s2.delete("a");
// ^^^^^^ Member "delete" doesn't exist in "Set"
s2.add("d");
// ^^^ Member "add" doesn't exist in "Set"
let s3 = s2.copy();
//          ^^^^ Member "copy" doesn't exist in "Set"
s2.clear();
// ^^^^^ Member "clear" doesn't exist in "Set"
let s4: Set<bool> = Set<bool>[[3]];
//                  ^^^^^ Expected type to be "Set<bool>", but got "Set<Array<num>>" instead
