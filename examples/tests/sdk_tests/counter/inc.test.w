bring cloud;
bring expect;

// implicit initial (0)
let counter = new cloud.Counter();

test "inc" {
  // implicit increment (+1)
  let r0 = counter.inc();
  expect.equal(r0, 0);
  expect.equal(counter.peek(), 1);

  // explicit increment (positive int)
  let r1 = counter.inc(5);
  expect.equal(r1, 1);
  expect.equal(counter.peek(), 6);

  // explicit increment (negative int)
  let r2 = counter.inc(-4);
  expect.equal(r2, 6);
  expect.equal(counter.peek(), 2);

  // explicit increment (+0)
  let r3 = counter.inc(0);
  expect.equal(r3, 2);
  expect.equal(counter.peek(), 2);
}


// test "key inc" {
//   let key = "my-key";
//   assert(counter.peek(key) == 0);
//   let r0 = counter.inc(nil, key);
//   assert(r0 == 0);
//   assert(counter.peek(key) == 1);
//   let r1 = counter.inc(nil, key);
//   assert(r1 == 1);
//   assert(counter.peek(key) == 2);
//   let r2 = counter.inc(10, key);
//   assert(r2 == 2);
//   assert(counter.peek(key) == 12);
//   let r3 = counter.inc(nil, key);
//   assert(r3 == 12);
// }
