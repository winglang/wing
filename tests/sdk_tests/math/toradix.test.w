bring math;

let oneVal = 1;
let twoVal = 2;
let threeVal = 3;

assert(math.toRadix(oneVal, 2) == "1");
assert(math.toRadix(twoVal, 2) == "10");
assert(math.toRadix(threeVal, 2) == "11");

let fifteenVal = 15;
let sixteenVal = 16;

assert(math.toRadix(fifteenVal, 16) == "f");
assert(math.toRadix(sixteenVal, 16) == "10");

test "inflight base" {
  assert(math.toRadix(oneVal, 2) == "1");
  assert(math.toRadix(twoVal, 2) == "10");
  assert(math.toRadix(threeVal, 2) == "11");
  
  assert(math.toRadix(fifteenVal, 16) == "f");
  assert(math.toRadix(sixteenVal, 16) == "10");
}