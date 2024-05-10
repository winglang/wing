bring cloud;
bring expect;

let c = new cloud.Counter();

test "peek" {
  expect.equal(c.peek(), 0);
  expect.equal(c.peek(), 0);
  c.inc();
  expect.equal(c.peek(), 1);
}

test "key peek" {
  let key = "my-key";
  expect.equal(c.peek(key), 0);
  expect.equal(c.peek(key), 0);
  c.inc(nil, key);
  expect.equal(c.peek(key), 1);
}