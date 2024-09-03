bring math;
try {
  log("{math.sqrt(-1)}");
} catch e {
  assert(e == "Input value must be greater than or equal to 0.");
}
assert(math.sqrt(-0) == -0);
assert(math.sqrt(0) == 0);
assert(math.sqrt(1) == 1);
assert(math.sqrt(2) == 1.4142135623730951);
assert(math.sqrt(9) == 3);
assert(math.sqrt(math.INF) == math.INF);

test "inflight square root" {
  try {
    log("{math.sqrt(-1)}");
  } catch e {
    assert(e == "Input value must be greater than or equal to 0.");
  }
  assert(math.sqrt(-0) == -0);
  assert(math.sqrt(0) == 0);
  assert(math.sqrt(1) == 1);
  assert(math.sqrt(2) == 1.4142135623730951);
  assert(math.sqrt(9) == 3);
  assert(math.sqrt(math.INF) == math.INF);
}