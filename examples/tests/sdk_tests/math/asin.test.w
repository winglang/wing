bring math;
bring "./../../valid/assertions.w" as assertions;

assertions.PreflightAssert.throws("Input value must be between -1 and 1, inclusive.", () => {
  log("${math.asin(-2)}");
});
assert(math.asin(-1) == -1.5707963267948966);
assert(math.asin(-0) == -0);
assert(math.asin(0) == 0);
assert(math.asin(0.5) == 0.5235987755982989);
assert(math.asin(1) == 1.5707963267948966);
assertions.PreflightAssert.throws("Input value must be between -1 and 1, inclusive.", () => {
  log("${math.asin(2)}");
});

test "inflight arc sine" {
  assertions.Assert.throws("Input value must be between -1 and 1, inclusive.", () => {
    log("${math.asin(-2)}");
  });
  assert(math.asin(-1) == -1.5707963267948966);
  assert(math.asin(-0) == -0);
  assert(math.asin(0) == 0);
  assert(math.asin(0.5) == 0.5235987755982989);
  assert(math.asin(1) == 1.5707963267948966);
  assertions.Assert.throws("Input value must be between -1 and 1, inclusive.", () => {
    log("${math.asin(2)}");
  });
}