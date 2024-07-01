bring math;

assert(math.cot(0) == math.INF);
assert(math.round(math.cot(math.PI / 4)) == 1);
assert(math.round(math.cot(math.PI * 3 / 4)) == -1);
assert(math.cot(-0) == -math.INF);

test "inflight cotangent" {
  assert(math.cot(0) == math.INF);
  assert(math.round(math.cot(math.PI / 4)) == 1);
  assert(math.round(math.cot(math.PI * 3 / 4)) == -1);
  assert(math.cot(-0) == -math.INF);
}