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

assert(message == json_mut_obj.get("hello"));
// Support `dot` and `[]` Access https://github.com/winglang/wing/issues/1680
// assert(message == json_mut_obj.hello)
// assert(message == json_mut_obj["hello"])

// Assignment from natives
let some_number: num = 999;

let some_json = MutJson {
  x: some_number
};

assert(some_number == some_json.get("x"));
some_json.set("x", 111);
assert(111 == some_json.get("x"));

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
assert("tastic" == nested_json.get("b").get("d").get("foo"));
assert(123 == nested_json.get("b").get("d").get("bar"));

// Heterogenous Array
let arr = Json [1, 2, "buckle", "my", "shoe", 3, 4, [ "shut", "the", "door"]];
assert(1 == arr.get_at(0));
assert("buckle" == arr.get_at(2));
assert("shut" == arr.get_at(7).get_at(0));
