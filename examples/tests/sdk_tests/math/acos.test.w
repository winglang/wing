bring math;
bring "./../../valid/assertions.w" as assertions;

assertions.PreflightAssert.throws("Input value must be between -1 and 1, inclusive.", () => {
  log("${math.acos(-2)}");
});
assert(math.acos(-1) == math.PI);
assert(math.acos(-0) == 1.5707963267948966);
assert(math.acos(0) == 1.5707963267948966);
assert(math.acos(0.5) == 1.0471975511965979);
assert(math.acos(1) == 0);
assertions.PreflightAssert.throws("Input value must be between -1 and 1, inclusive.", () => {
  log("${math.acos(2)}");
});

test "inflight arc cosine" {
  assertions.Assert.throws("Input value must be between -1 and 1, inclusive.", () => {
    log("${math.acos(-2)}");
  });
  assert(math.acos(-1) == math.PI);
  assert(math.acos(-0) == 1.5707963267948966);
  assert(math.acos(0) == 1.5707963267948966);
  assert(math.acos(0.5) == 1.0471975511965979);
  assert(math.acos(1) == 0);
  assertions.Assert.throws("Input value must be between -1 and 1, inclusive.", () => {
    log("${math.acos(2)}");
  });
}