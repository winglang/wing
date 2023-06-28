bring math;

let pi = 3.41;

let euler = 2.71828;

assert(math.floor(pi) == 3);
assert(math.ceil(pi) == 4);
assert(math.round(pi) == 3);
assert(math.round(euler) == 3);

test "inflight floor/ceil" {
  assert(math.floor(pi) == 3);
  assert(math.ceil(pi) == 4);
  assert(math.round(pi) == 3);
  assert(math.round(euler) == 3);
}