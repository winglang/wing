bring cloud;

let arr = ["hello", "world"];
let my_set = {"my", "my", "set"};
let my_map = {"hello": 123, "world": 999};
let arr_of_map = [{"bang": 123}];
let j = Json {a: "hello", b: "world"};

test "capture_containers" {
  assert(arr.at(0) == "hello");
  assert(arr.at(1) == "world");
  assert(arr.length == 2);

  assert(my_set.has("my"));
  assert(my_set.size == 2);

  assert(my_map.has("world"));
  assert(my_map.size() == 2);

  assert(arr_of_map.at(0).has("bang"));
  assert(j.get("b") == "world");
}
