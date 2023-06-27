bring math;

let s = { 1, 2, 3, 4, 5 };

assert(math.min(s) == 1);
assert(math.max(s) == 5);

test "inflight min/max" {
  assert(math.min(s) == 1);
  assert(math.max(s) == 5);  
}