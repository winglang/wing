bring math;

let negative = -11;
let zero = 0;
let positive = 18;

let negative_num = -4.11;
let zero_num = 0.0;
let positive_num = 8.18;

assert(math.sign(negative) == -1);
assert(math.sign(zero) == 0);
assert(math.sign(positive) == 1);

assert(math.sign(negative_num) == -1);
assert(math.sign(zero_num) == 0);
assert(math.sign(positive_num) == 1);

test "inflight absolute" {
  assert(math.sign(negative) == -1);
  assert(math.sign(zero) == 0);
  assert(math.sign(positive) == 1);

  assert(math.sign(negative_num) == -1);
  assert(math.sign(zero_num) == 0);
  assert(math.sign(positive_num) == 1);
}
