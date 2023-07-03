bring math;

let myArray = [ 1, 2, 3, 4, 5 ];

assert(math.min(myArray) == 1);
assert(math.max(myArray) == 5);

test "inflight min/max" {
  assert(math.min(myArray) == 1);
  assert(math.max(myArray) == 5);  
}