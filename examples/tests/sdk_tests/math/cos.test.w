bring math;

assert(math.cos(-0) == 1);
assert(math.cos(0) == 1);
assert(math.cos(1) == 0.5403023058681398);
assert(math.cos(-5) == 0.28366218546322625);
assert(math.cos(math.PI) == -1);
assert(math.cos(math.PI * 2) == 1);

test "inflight cosine" {
  assert(math.cos(-0) == 1);
  assert(math.cos(0) == 1);
  assert(math.cos(1) == 0.5403023058681398);
  assert(math.cos(-5) == 0.28366218546322625);
  assert(math.cos(math.PI) == -1);
  assert(math.cos(math.PI * 2) == 1);
}