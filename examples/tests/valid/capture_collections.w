bring cloud;

let arr = ["hello", "world"];
let my_set = {"my", "my", "set"};
let my_map = {"hello": 123, "world": 999};

let handler = inflight (s: str): str => {
  assert(arr.at(0) == "hello");
  assert(arr.at(1) == "world");
  assert(arr.length == 2);

  assert(my_set.has("my"));
  assert(my_set.size == 2);

  assert(my_map.has("world"));
  assert(my_map.size == 2);
};

new cloud.Function(handler) as "test";
