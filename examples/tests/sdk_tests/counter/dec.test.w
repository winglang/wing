bring cloud;
bring expect;

// implicit initial (0)
let counter1 = new cloud.Counter() as "counter1";
// explicit initial
let counter2 = new cloud.Counter(initial: -1) as "counter2";

test "dec()" {
  // implicit decrement (-1)
  let r0 = counter1.dec();
  expect.equal(r0, 0);
  expect.equal(counter1.peek(), -1);

  // explicit decrement (positive int)
  let r1 = counter1.dec(5);
  expect.equal(r1, -1);
  expect.equal(counter1.peek(), -6);

  // explicit decrement (negative int)
  let r2 = counter1.dec(-4);
  expect.equal(r2, -6);
  expect.equal(counter1.peek(), -2);

  // explicit decrement (-0)
  let r3 = counter1.dec(0);
  expect.equal(r3, -2);
  expect.equal(counter1.peek(), -2);

// "dec() with custom key" 
  let key = "custom-key";

  // explicit decrement (positive int)
  let r4 = counter2.dec(5, key);
  expect.equal(r4, -1);
  expect.equal(counter2.peek(key), -6);

  // explicit decrement (negative int)
  let r5 = counter2.dec(-4, key);
  expect.equal(r5, -6);
  expect.equal(counter2.peek(key), -2);

  // explicit decrement (-0)
  let r6 = counter2.dec(0, key);
  expect.equal(r6, -2);
  expect.equal(counter2.peek(key), -2);
}
