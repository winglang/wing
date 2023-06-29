bring math;

let r = 10;

let circumference = inflight (radius: num): num => {
  return 2 * math.PI * radius;
};

assert(math.round(math.PI, 3) == 3.142);

test "PI" {
  assert(math.round(circumference(r), 2) == 62.83);
}