bring math;

assert(math.sin(-0) == -0);
assert(math.sin(0) == 0);
assert(math.sin(1) == 0.8414709848078965);
assert(math.sin(-5) == 0.9589242746631385);
assert(math.sin(math.PI / 2) == 1);

test "inflight sine" {
  assert(math.sin(-0) == -0);
  assert(math.sin(0) == 0);
  assert(math.sin(1) == 0.8414709848078965);
  assert(math.sin(-5) == 0.9589242746631385);
  assert(math.sin(math.PI / 2) == 1);
}