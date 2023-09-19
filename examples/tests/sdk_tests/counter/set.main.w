bring cloud;

let counter = new cloud.Counter(initial: 0);

test "set" {
  assert(counter.peek() == 0);
  counter.inc();
  assert(counter.peek() == 1);
  counter.inc();
  assert(counter.peek() == 2);
  counter.inc(10);
  assert(counter.peek() == 12);
  counter.set(88);
  assert(counter.peek() == 88);
}

test "key set" {
  let key = "my-key";
  assert(counter.peek(key) == 0);
  counter.inc(nil, key);
  assert(counter.peek(key) == 1);
  counter.inc(nil, key);
  assert(counter.peek(key) == 2);
  counter.inc(10, key);
  assert(counter.peek(key) == 12);
  counter.set(88, key);
  assert(counter.peek(key) == 88);
}