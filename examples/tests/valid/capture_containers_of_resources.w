bring cloud;

let arr = [
  new cloud.Bucket() as "b1", 
  new cloud.Bucket() as "b2"
];

let map = { "my_queue": new cloud.Queue() };

let set = { "foo", "foo", "bar" };

test "test" {
  let b1 = arr.at(0);
  let b2 = arr.at(1);
  let q = map.get("my_queue");

  b1.put("file1.txt", "boom");
  assert(b2.list().length == 0);
  assert(b1.get("file1.txt") == "boom");

  q.push("hello");

  assert(set.has("foo"));
  assert(set.size == 2);
}