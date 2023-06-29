bring math;

let interest = 0.05;
let value = 100;

let compoundOneYear = inflight (interestRate: num, currentVal: num): num => {
  return currentVal * (math.E ** interestRate);
};

assert(math.round(math.E, 3) == 2.718);

test "EULER" {
  assert(math.round(compoundOneYear(interest, value), 2) == 105.13);
}
