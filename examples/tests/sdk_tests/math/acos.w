bring math;
// TODO: need to handle NaN https://github.com/winglang/wing/issues/3210
// assert(math.acos(-2) == NaN);
assert(math.acos(-1) == math.PI);
assert(math.acos(-0) == 1.5707963267948966);
assert(math.acos(0) == 1.5707963267948966);
assert(math.acos(0.5) == 1.0471975511965979);
assert(math.acos(1) == 0);
// TODO: need to handle NaN https://github.com/winglang/wing/issues/3210
// assert(math.acos(2) == NaN);

test "inflight arc cosine" {
  // TODO: need to handle NaN
  // assert(math.acos(-2) == NaN);
  assert(math.acos(-1) == math.PI);
  assert(math.acos(-0) == 1.5707963267948966);
  assert(math.acos(0) == 1.5707963267948966);
  assert(math.acos(0.5) == 1.0471975511965979);
  assert(math.acos(1) == 0);
  // TODO: need to handle NaN https://github.com/winglang/wing/issues/3210
  // assert(math.acos(2) == NaN);
}