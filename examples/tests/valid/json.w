let json_number  = Json 123;
let json_bool    = Json true;
let json_array   = Json [ 1, 2, 3 ];
let json_obj     = Json { boom: 123 };
let json_mut_obj = MutJson {
  hello: 123,
  world: [ 1, "cat", 3 ],
  "boom boom": { hello: 1233 }
};

let message = "Coolness";

// Reassign
json_mut_obj.set("hello", message);

assert(json_mut_obj.get("hello") == message);
// Support `dot` and `[]` Access https://github.com/winglang/wing/issues/1680
// assert(json_mut_obj.hello == message)
// assert(json_mut_obj["hello"] == message)

// Assignment from natives
let some_number: num = 999;

let jj = Json some_number;
assert(jj == some_number);

let some_json = MutJson {
  x: some_number
};

assert(some_json.get("x") == some_number);
some_json.set("x", 111);
assert(some_json.get("x") == 111);

// assign Map to Json
let x: Json = {cool: "beans"};

// Nested Gets and Sets
let nested_json = MutJson {
  a: "hello",
  b: {
    c: "world",
    d: {
      foo: "foo",
      bar: 123
    }
  }
};

nested_json.get("b").get("d").set("foo", "tastic");
assert(nested_json.get("b").get("d").get("foo") == "tastic");
assert(nested_json.get("b").get("d").get("bar") == 123);

// Heterogenous Array
let b = "buckle";
let arr = Json [1, 2, b, "my", "shoe", 3, 4, [ "shut", "the", "door"]];
assert(arr.get_at(0) == 1);
assert(arr.get_at(2) == b);
assert(arr.get_at(7).get_at(0) == "shut");
