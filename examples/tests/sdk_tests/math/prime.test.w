bring math;

assert(math.isPrime(1) == false);
assert(math.isPrime(2) == true);
assert(math.isPrime(3) == true);
assert(math.isPrime(4) == false);

assert(math.isPrime(10) == false);
assert(math.isPrime(11) == true);
assert(math.isPrime(12) == false);

test "inflight prime numbers" {
  assert(math.isPrime(1) == false);
  assert(math.isPrime(2) == true);
  assert(math.isPrime(3) == true);
  assert(math.isPrime(4) == false);

  assert(math.isPrime(10) == false);
  assert(math.isPrime(11) == true);
  assert(math.isPrime(12) == false);
}