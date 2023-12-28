bring math;

let oneVal = 1;
let twoVal = 2;
let threeVal = 3;

assert(math.toBase(oneVal, 2) == "1");
assert(math.toBase(twoVal, 2) == "10");
assert(math.toBase(threeVal, 2) == "11");

let fifteenVal = 15;
let sixteenVal = 16;

assert(math.toBase(sixteenVal, 15) == "f");
assert(math.toBase(sixteenVal, 16) == "10");

test "inflight base" {
  assert(math.toBase(oneVal, 2) == "1");
  assert(math.toBase(twoVal, 2) == "10");
  assert(math.toBase(threeVal, 2) == "11");
  
  assert(math.toBase(sixteenVal, 15) == "f");
  assert(math.toBase(sixteenVal, 16) == "10");
}