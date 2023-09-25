bring math;

assert(math.atan2(90, 15) == 1.4056476493802699);
assert(math.atan2(15, 90) == 0.16514867741462683);
assert(math.atan2(-1, -1) == -1 * math.PI * 3 / 4);
assert(math.atan2(-0, -1) == -1 * math.PI);
assert(math.atan2(0, -1) == math.PI);
assert(math.atan2(1, -1) == math.PI * 3 / 4);
assert(math.atan2(0, 0) == 0);

test "inflight arc tangent 2" {
  assert(math.atan2(90, 15) == 1.4056476493802699);
  assert(math.atan2(15, 90) == 0.16514867741462683);
  assert(math.atan2(-1, -1) == -1 * math.PI * 3 / 4);
  assert(math.atan2(-0, -1) == -1 * math.PI);
  assert(math.atan2(0, -1) == math.PI);
  assert(math.atan2(1, -1) == math.PI * 3 / 4);
  assert(math.atan2(0, 0) == 0);
}