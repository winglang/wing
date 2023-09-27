bring cloud;

let counter = new cloud.Counter(initial: 0);

test "inc" {
  assert(counter.peek() == 0);
  let r0 = counter.inc();
  assert(r0 == 0);
  assert(counter.peek() == 1);
  let r1 = counter.inc();
  assert(r1 == 1);
  assert(counter.peek() == 2);
  let r2 = counter.inc(10);
  assert(r2 == 2);
  assert(counter.peek() == 12);
  let r3 = counter.inc();
  assert(r3 == 12);
}

test "key inc" {
  let key = "my-key";
  assert(counter.peek(key) == 0);
  let r0 = counter.inc(nil, key);
  assert(r0 == 0);
  assert(counter.peek(key) == 1);
  let r1 = counter.inc(nil, key);
  assert(r1 == 1);
  assert(counter.peek(key) == 2);
  let r2 = counter.inc(10, key);
  assert(r2 == 2);
  assert(counter.peek(key) == 12);
  let r3 = counter.inc(nil, key);
  assert(r3 == 12);
}
