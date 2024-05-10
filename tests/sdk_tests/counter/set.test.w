bring cloud;
bring expect;

// implicit initial (0)
let counter1 = new cloud.Counter() as "counter1";
// explicit initial
let counter2 = new cloud.Counter(initial: -1) as "counter2";

test "set()" {
  // set (positive int)
  counter1.set(42);
  expect.equal(counter1.peek(), 42);

  // set (negative int)
  counter1.set(-100);
  expect.equal(counter1.peek(), -100);

  // set (0)
  counter1.set(0);
  expect.equal(counter1.peek(), 0);
}

test "set() with custom key" {
  let key = "custom-key";

  // set (positive int)
  counter2.set(42, key);
  expect.equal(counter2.peek(key), 42);

  // set (negative int)
  counter2.set(-100, key);
  expect.equal(counter2.peek(key), -100);

  // set (0)
  counter2.set(0, key);
  expect.equal(counter2.peek(key), 0);
}
