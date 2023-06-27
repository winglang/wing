bring math;

let x = 3.41;

assert(math.floor(x) == 3);
assert(math.ceil(x) == 4);

test "inflight floor/ceil" {
  assert(math.floor(x) == 3);
  assert(math.ceil(x) == 4);
}