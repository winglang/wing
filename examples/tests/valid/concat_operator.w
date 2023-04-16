let x = 5;
let message = "count: " ++ x.to_str();
assert(message == "count: 5");
log(message);

let d = "d";
let multiple_concats = "a" ++ "b" ++ "c${d}";
assert(multiple_concats == "abcd");
