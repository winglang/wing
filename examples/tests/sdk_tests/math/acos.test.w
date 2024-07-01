bring math;
try {
  log("{math.acos(-2)}");
} catch e {
  assert(e == "Input value must be between -1 and 1, inclusive.");
}
assert(math.acos(-1) == math.PI);
assert(math.acos(-0) == 1.5707963267948966);
assert(math.acos(0) == 1.5707963267948966);
assert(math.acos(0.5) == 1.0471975511965979);
assert(math.acos(1) == 0);
try {
  log("{math.acos(2)}");
} catch e {
  assert(e == "Input value must be between -1 and 1, inclusive.");
}

test "inflight arc cosine" {
  try {
    log("{math.acos(-2)}");
  } catch e {
    assert(e == "Input value must be between -1 and 1, inclusive.");
  }
  assert(math.acos(-1) == math.PI);
  assert(math.acos(-0) == 1.5707963267948966);
  assert(math.acos(0) == 1.5707963267948966);
  assert(math.acos(0.5) == 1.0471975511965979);
  assert(math.acos(1) == 0);
  try {
    log("{math.acos(2)}");
  } catch e {
    assert(e == "Input value must be between -1 and 1, inclusive.");
  }
}