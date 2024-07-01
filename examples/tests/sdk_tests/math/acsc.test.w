bring math;

try {
  log("{math.acsc(0.5)}");
} catch e {
  assert(e == "Input value must be equal or greater than |1|.");
}
assert(math.acsc(1) == 1.5707963267948966);
assert(math.acsc(math.PI / 2) == 0.69010709137454);
assert(math.acsc(math.PI) == 0.3239461069319807);
assert(math.acsc(math.TAU) == 0.15983462638513704);
assert(math.acsc(-1) == -1.5707963267948966);

test "inflight arc cosecant" {
  try {
    log("{math.acsc(0.5)}");
  } catch e {
    assert(e == "Input value must be equal or greater than |1|.");
  }
  assert(math.acsc(1) == 1.5707963267948966);
  assert(math.acsc(math.PI / 2) == 0.69010709137454);
  assert(math.acsc(math.PI) == 0.3239461069319807);
  assert(math.acsc(math.TAU) == 0.15983462638513704);
  assert(math.acsc(-1) == -1.5707963267948966);    
}