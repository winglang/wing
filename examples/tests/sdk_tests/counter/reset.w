bring cloud;

let counter = new cloud.Counter(initial: 0);

test "reset" {
  assert(counter.peek() == 0);
  counter.inc();
  assert(counter.peek() == 1);
  counter.inc();
  assert(counter.peek() == 2);
  counter.inc(10);
  assert(counter.peek() == 12);
  counter.reset();
  assert(counter.peek() == 0);
  counter.reset(88);
  assert(counter.peek() == 88);
}
