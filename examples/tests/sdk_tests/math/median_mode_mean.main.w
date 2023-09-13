bring math;

let odd_arr = [1, 3, 3, 6, 7, 8, 9];
assert(math.median(odd_arr) == 6);

let even_arr = [1, 2, 3, 4, 5, 6, 8, 9];
assert(math.median(even_arr) == 4.5);

test "inflight median" {
  assert(math.median(odd_arr) == 6);
  assert(math.median(even_arr) == 4.5);    
}

let modal_arr = [1, 2, 2, 3, 4, 7, 9];
assert(math.mode(modal_arr).at(0) == 2);

let bimodal_arr = [1, 2, 2, 3, 4, 7, 7, 9, 7, 2];
let bimodal = math.mode(bimodal_arr);
assert(bimodal.at(0) == 2);
assert(bimodal.at(1) == 7);

let multimodal_arr = [1, 3, 4, 7, 7, 9, 9, 2, 2];
let multimodal = math.mode(multimodal_arr);
assert(multimodal.at(0) == 2);
assert(multimodal.at(1) == 7);
assert(multimodal.at(2) == 9);

test "inflight mode" {
  assert(math.mode(modal_arr).at(0) == 2);
  assert(bimodal.at(0) == 2);
  assert(bimodal.at(1) == 7);
  assert(multimodal.at(0) == 2);
  assert(multimodal.at(1) == 7);
  assert(multimodal.at(2) == 9);
}

let mean_arr = [4, 36, 45, 50, 75];
assert(math.arithmeticMean(mean_arr) == 42);
assert(math.geometricMean(mean_arr) == 30);
assert(math.harmonicMean(mean_arr) == 15);

test "inflight mean" {
  assert(math.arithmeticMean(mean_arr) == 42);
  assert(math.geometricMean(mean_arr) == 30);
  assert(math.harmonicMean(mean_arr) == 15);  
}