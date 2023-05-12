bring cloud;

let c = new cloud.Counter();

test "peek" {
  assert(c.peek() == 0);
  assert(c.peek() == 0);
  c.inc();
  assert(c.peek() == 1);
}