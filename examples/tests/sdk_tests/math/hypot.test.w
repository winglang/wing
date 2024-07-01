bring math;

assert(math.hypot([3, 4]) == 5);
assert(math.hypot([5, 12]) == 13);
assert(math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07);
assert(math.hypot([-5]) == 5);

test "inflight hypot" {
  assert(math.hypot([3, 4]) == 5);
  assert(math.hypot([5, 12]) == 13);
  assert(math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07);
  assert(math.hypot([-5]) == 5);
}