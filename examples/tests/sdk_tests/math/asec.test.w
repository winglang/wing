bring math;
bring "./../../valid/assertions.w" as assertions;

assertions.PreflightAssert.throws("Input value must be equal or greater than |1|.", () => {
  log("${math.asec(0.5)}");
});
assert(math.asec(2) == 1.0471975511965979);
assert(math.asec(1) == 0);
assert(math.asec(math.PI) == 1.2468502198629159);
assert(math.asec(-math.PI) == 1.8947424337268775);
assert(math.asec(-1) == math.PI);
assert(math.asec(-2) == 2.0943951023931957);

test "inflight arc cosecant" {
  assertions.Assert.throws("Input value must be equal or greater than |1|.", () => {
    log("${math.asec(0.5)}");
  });
  assert(math.asec(2) == 1.0471975511965979);
  assert(math.asec(1) == 0);
  assert(math.asec(math.PI) == 1.2468502198629159);
  assert(math.asec(-math.PI) == 1.8947424337268775);
  assert(math.asec(-1) == math.PI);
  assert(math.asec(-2) == 2.0943951023931957);
}