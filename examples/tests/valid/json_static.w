// Get Keys
let x = Json {a: 123, b: {c: 456, d: 789}};
let k = Json.keys(x);
assert(k.length == 2);

// Get Values
let v = Json.values(x);
assert(v.at(0) == 123);

// Mutable Clone
let m = Json.clone_mut(x);
m.set("a", 321);
assert(m.get("a") == 321);


// Deleting keys
let var k2 = Json.keys(m);
assert(k2.length == 2);
Json.delete(m, "b");
k2 = Json.keys(m);
assert(k2.length == 1);

// Parse string
let s = "{\"a\": 123, \"b\": {\"c\": 456, \"d\": 789}}";
let j = Json.parse(s);
assert(Json.keys(j).length == 2);

// Format to string
let jj = Json {a: 123, b: {c: 456, d: 789}};
let ss = Json.to_str(jj);
assert(ss == "{\"a\":123,\"b\":{\"c\":456,\"d\":789}}");
