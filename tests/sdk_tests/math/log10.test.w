bring math;

assert(math.log10(100000) == 5);
assert(math.log10(2) == 0.3010299956639812);
assert(math.log10(1) == 0);
assert(math.log10(0) == -math.INF);

test "inflight absolute" {
  assert(math.log10(100000) == 5);
  assert(math.log10(2) == 0.3010299956639812);
  assert(math.log10(1) == 0);
  assert(math.log10(0) == -math.INF);
}
