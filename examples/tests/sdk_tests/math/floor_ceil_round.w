bring math;

let x = 5.05;
let y = 5.95;

assert(math.floor(x) == 5);
assert(math.ceil(x) == 6);

assert(math.round(x) == 5);
assert(math.round(y) == 6);
assert(math.round(-x) == -5);
assert(math.round(-y) == -6);

test "inflight floor/ceil" {
  assert(math.floor(x) == 5);
  assert(math.ceil(x) == 6);

  assert(math.round(x) == 5);
  assert(math.round(y) == 6);
  assert(math.round(-x) == -5);
  assert(math.round(-y) == -6);
}
