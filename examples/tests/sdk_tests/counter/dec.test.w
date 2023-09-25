bring cloud;

let counter = new cloud.Counter(initial: 1);

test "dec" {
  assert(counter.peek() == 1);
  let dec1 = counter.dec();
  assert(counter.peek() == 0);
  assert(dec1 == 1);
  let dec2 = counter.dec(2);
  assert(counter.peek() == -2);
  assert(dec2 == 0);
}

test "key dec" {
  let key = "my-key";
  assert(counter.peek(key) == 1);
  let dec1 = counter.dec(nil, key);
  assert(counter.peek(key) == 0);
  assert(dec1 == 1);
  let dec2 = counter.dec(2, key);
  assert(counter.peek(key) == -2);
  assert(dec2 == 0);
}
