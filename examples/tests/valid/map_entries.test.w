let map = { "foo" => "hello" };

test "check if map has entries" {
  assert(map.size() == 1);
  assert(map.has("foo"));
  assert(!map.has("bar"));
}

test "get value from map" {
  assert(map.get("foo") == "hello");
}

test "iterate map using entries() method" {
  // iterate over map entries
  let entries = map.entries();

  for x in map.entries() {
    assert(x.key == "foo");
    assert(x.value == "hello");
  }
}

test "check entries() when map has multiple entries" {
  let map = { "foo" => "hello", "bar" => "world" };

  // check array length
  assert(map.entries().length == 2);
}
