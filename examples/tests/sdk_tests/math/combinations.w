bring math;

let population = 5;
let subset = 3;

assert(math.combinations(population, subset) == 10);

test "inflight combinations" {
  assert(math.combinations(population, subset) == 10);  
}