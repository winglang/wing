bring math;

assert(math.log2(3) == 1.584962500721156);
assert(math.log2(2) == 1);
assert(math.log2(1) == 0);
assert(math.log2(0) == -math.INF);

test "inflight absolute" {
  assert(math.log2(3) == 1.584962500721156);
  assert(math.log2(2) == 1);
  assert(math.log2(1) == 0);
  assert(math.log2(0) == -math.INF);
}
