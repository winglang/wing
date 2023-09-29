bring math;

let x = 5.05;
let y = 5.95;

assert(math.floor(x) == 5);
assert(math.ceil(x) == 6);

assert(math.round(x) == 5);
assert(math.round(y) == 6);
assert(math.round(-x) == -5);
assert(math.round(-y) == -6);

assert(math.round(math.E) == 3);
assert(math.round(math.E, decimalPlaces: 1) == 2.7);
assert(math.round(math.E, decimalPlaces: 2) == 2.72);
assert(math.round(math.E, decimalPlaces: 3) == 2.718);
assert(math.round(math.E, decimalPlaces: 4) == 2.7183);
assert(math.round(math.E, decimalPlaces: 5) == 2.71828);

test "inflight floor/ceil/round" {
  assert(math.floor(x) == 5);
  assert(math.ceil(x) == 6);

  assert(math.round(x) == 5);
  assert(math.round(y) == 6);
  assert(math.round(-x) == -5);
  assert(math.round(-y) == -6);

  assert(math.round(math.E, decimalPlaces: 1) == 2.7);
  assert(math.round(math.E, decimalPlaces: 2) == 2.72);
  assert(math.round(math.E, decimalPlaces: 3) == 2.718);
  assert(math.round(math.E, decimalPlaces: 4) == 2.7183);
  assert(math.round(math.E, decimalPlaces: 5) == 2.71828);
}
