bring math;
try {
  log("{math.asin(-2)}");
} catch e {
  assert(e == "Input value must be between -1 and 1, inclusive.");
}
assert(math.asin(-1) == -1.5707963267948966);
assert(math.asin(-0) == -0);
assert(math.asin(0) == 0);
assert(math.asin(0.5) == 0.5235987755982989);
assert(math.asin(1) == 1.5707963267948966);
try {
  log("{math.asin(2)}");
} catch e {
  assert(e == "Input value must be between -1 and 1, inclusive.");
}

test "inflight arc sine" {
  try {
    log("{math.asin(-2)}");
  } catch e {
    assert(e == "Input value must be between -1 and 1, inclusive.");
  }
  assert(math.asin(-1) == -1.5707963267948966);
  assert(math.asin(-0) == -0);
  assert(math.asin(0) == 0);
  assert(math.asin(0.5) == 0.5235987755982989);
  assert(math.asin(1) == 1.5707963267948966);
  try {
    log("{math.asin(2)}");
  } catch e {
    assert(e == "Input value must be between -1 and 1, inclusive.");
  }
}