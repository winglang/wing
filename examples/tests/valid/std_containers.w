let s_array = ["one", "two"];
let mut_array = s_array.copy_mut();
mut_array.push("three");
let immut_array = mut_array.copy();

let s_set = {"one", "two"};
let mut_set = s_set.copy_mut();
mut_set.add("three");
let immut_set = mut_set.copy();

let s_map = {"one": 1, "two": 2};
let mut_map = s_map.copy_mut();
mut_map.set("five", 5);
let immut_map = mut_map.copy();

let s: str = s_array.at(1);
assert(s == "two");
assert(s_array.at(1) == "two");
assert(s_array.length == 2);
assert(immut_array.length == 3);

assert(s_set.has("one"));
assert(s_set.size == 2);
assert(immut_set.size == 3);

assert(s_map.get("one") == 1);
assert(s_map.size == 2);
assert(immut_map.size == 3);