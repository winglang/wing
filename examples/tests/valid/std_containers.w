let s_array = ["one", "two"];
let mut_array = s_array.copy_mut();
mut_array.push("three");
let immut_array = mut_array.copy();
let s: str = s_array.at(1);
assert(s == "two");
assert(s_array.at(1) == "two");
assert(s_array.length == 2);
assert(immut_array.length == 3);
let s_array2 = ["if", "you", "build", "it"];
let s_array3 = ["he", "will", "come", "for", "you"];
let merged_array = s_array2.concat(s_array3);
assert(merged_array.contains("build"));
assert(!merged_array.contains("bring"));
assert(merged_array.index_of("you") == 1);
assert(merged_array.join(" ") == "if you build it he will come for you");
assert(merged_array.join() == "if,you,build,it,he,will,come,for,you");
assert(merged_array.last_index_of("you") == 8);

let s_set = {"one", "two"};
let mut_set = s_set.copy_mut();
mut_set.add("three");
let immut_set = mut_set.copy();
assert(s_set.has("one"));
assert(s_set.size == 2);
assert(immut_set.size == 3);


let s_map = {"one": 1, "two": 2};
let nested_map = {"a": {"b": {"c": "hello"}}};
let mut_map = s_map.copy_mut();
mut_map.set("five", 5);
let immut_map = mut_map.copy();
assert(s_map.get("one") == 1);
assert(s_map.size() == 2);
assert(immut_map.size() == 3);
assert(nested_map.get("a").get("b").get("c") == "hello");