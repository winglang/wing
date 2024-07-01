bring cloud;
bring expect;

// implicit initial (0)
let counter1 = new cloud.Counter() as "counter1";
// explicit initial
let counter2 = new cloud.Counter(initial: -1) as "counter2";

test "inc()" {
  // implicit increment (+1)
  let r0 = counter1.inc();
  expect.equal(r0, 0);
  expect.equal(counter1.peek(), 1);

  // explicit increment (positive int)
  let r1 = counter1.inc(5);
  expect.equal(r1, 1);
  expect.equal(counter1.peek(), 6);

  // explicit increment (negative int)
  let r2 = counter1.inc(-4);
  expect.equal(r2, 6);
  expect.equal(counter1.peek(), 2);

  // explicit increment (+0)
  let r3 = counter1.inc(0);
  expect.equal(r3, 2);
  expect.equal(counter1.peek(), 2);

// "inc() with custom key" 
  let key = "custom-key";

  // explicit increment (positive int)
  let r4 = counter2.inc(5, key);
  expect.equal(r4, -1);
  expect.equal(counter2.peek(key), 4);

  // explicit increment (negative int)
  let r5 = counter2.inc(-4, key);
  expect.equal(r5, 4);
  expect.equal(counter2.peek(key), 0);

  // explicit increment (+0)
  let r6 = counter2.inc(0, key);
  expect.equal(r6, 0);
  expect.equal(counter2.peek(key), 0);
}
