bring cloud;

let c = new cloud.Counter();

test "peek" {
  assert(c.peek() == 0);
  assert(c.peek() == 0);
  c.inc();
  assert(c.peek() == 1);
}

test "key peek" {
  let key = "my-key";
  assert(c.peek(key) == 0);
  assert(c.peek(key) == 0);
  c.inc(nil, key);
  assert(c.peek(key) == 1);
}