bring math;

let pi = 3.41;
let minus_pi = -pi;

assert(math.abs(pi) == 3.41);
assert(math.abs(minus_pi) == 3.41);

test "inflight absolute" {
  assert(math.abs(pi) == 3.41);
  assert(math.abs(minus_pi) == 3.41);
}