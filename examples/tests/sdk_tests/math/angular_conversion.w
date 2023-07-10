bring math;

assert(math.degreesToRadians(360) == math.TAU);
assert(math.degreesToRadians(180) == math.PI);
assert(math.degreesToRadians(90) == math.PI / 2);
assert(math.degreesToRadians(60) == math.PI / 3);
assert(math.degreesToRadians(45) == math.PI / 4);
assert(math.degreesToRadians(30) == math.PI / 6);

assert(math.radiansToDegrees(math.TAU) == 360);
assert(math.radiansToDegrees(math.PI) == 180);
assert(math.radiansToDegrees(math.PI / 2) == 90);
assert(math.round(math.radiansToDegrees(math.PI / 3)) == 60);
assert(math.radiansToDegrees(math.PI / 4) == 45);
assert(math.round(math.radiansToDegrees(math.PI / 6)) == 30);

test "inflight angular conversions" {
  assert(math.degreesToRadians(360) == math.TAU);
  assert(math.degreesToRadians(180) == math.PI);
  assert(math.degreesToRadians(90) == math.PI / 2);
  assert(math.degreesToRadians(60) == math.PI / 3);
  assert(math.degreesToRadians(45) == math.PI / 4);
  assert(math.degreesToRadians(30) == math.PI / 6);
  
  assert(math.radiansToDegrees(math.TAU) == 360);
  assert(math.radiansToDegrees(math.PI) == 180);
  assert(math.radiansToDegrees(math.PI / 2) == 90);
  assert(math.round(math.radiansToDegrees(math.PI / 3)) == 60);
  assert(math.radiansToDegrees(math.PI / 4) == 45);
  assert(math.round(math.radiansToDegrees(math.PI / 6)) == 30);
}