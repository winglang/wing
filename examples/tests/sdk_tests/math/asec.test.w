bring math;

try {
  log("{math.asec(0.5)}");
} catch e {
  assert(e == "Input value must be equal or greater than |1|.");
}
assert(math.asec(2) == 1.0471975511965979);
assert(math.asec(1) == 0);
assert(math.asec(math.PI) == 1.2468502198629159);
assert(math.asec(-math.PI) == 1.8947424337268775);
assert(math.asec(-1) == math.PI);
assert(math.asec(-2) == 2.0943951023931957);

test "inflight arc cosecant" {
  try {
    log("{math.asec(0.5)}");
  } catch e {
    assert(e == "Input value must be equal or greater than |1|.");
  }
  assert(math.asec(2) == 1.0471975511965979);
  assert(math.asec(1) == 0);
  assert(math.asec(math.PI) == 1.2468502198629159);
  assert(math.asec(-math.PI) == 1.8947424337268775);
  assert(math.asec(-1) == math.PI);
  assert(math.asec(-2) == 2.0943951023931957);
}