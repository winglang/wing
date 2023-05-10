bring cloud;

let arr = ["hello", "world"];
let mySet = {"my", "my", "set"};
let myMap = {"hello": 123, "world": 999};
let arrOfMap = [{"bang": 123}];
let j = Json {a: "hello", b: "world"};

test "capture_containers" {
  assert(arr.at(0) == "hello");
  assert(arr.at(1) == "world");
  assert(arr.length == 2);

  assert(mySet.has("my"));
  assert(mySet.size == 2);

  assert(myMap.has("world"));
  assert(myMap.size() == 2);

  assert(arrOfMap.at(0).has("bang"));
  assert(j.get("b") == "world");
}
