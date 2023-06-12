bring cloud;

// Get Keys
let x = Json {a: 123, b: {c: 456, d: 789}};
let k = Json.keys(x);
assert(k.length == 2);

// Get Values
let v = Json.values(x);
assert(v.at(0) == 123);

// Mutable Copy
let m = Json.deepCopyMut(x);
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

// Try parse string
let invalidJson = "invalid";
let tryParsed = Json.tryParse(invalidJson) ?? Json { key: "value" };
assert(tryParsed.get("key") == "value");

// Format to string
let jj = Json {a: 123, b: {c: 456, d: 789}};
let ss = Json.stringify(jj);
assert(ss == "{\"a\":123,\"b\":{\"c\":456,\"d\":789}}");

let ss2 = Json.stringify(jj, 2);
assert(ss2 == "{\n  \"a\": 123,\n  \"b\": {\n    \"c\": 456,\n    \"d\": 789\n  }\n}");

// From Json Methods
let jsonOfMany = Json {a: 123, b: "hello", c: true};
assert(str.fromJson(jsonOfMany.get("b")) == "hello");
assert(num.fromJson(jsonOfMany.get("a")) == 123);
assert(bool.fromJson(jsonOfMany.get("c")));

// Inflight access
test "Access Json static inflight" {
  let ss = Json.stringify(jj);
  assert(ss == "{\"a\":123,\"b\":{\"c\":456,\"d\":789}}");
}

// Check whether some key exists in a json
test "has key or not" {
  let hasCheck = Json {a: "hello", b: "wing"};
  assert(Json.has(hasCheck, "a") == true);
  assert(Json.has(hasCheck, "c") == false);
}