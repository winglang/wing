let a = 2;

if true {
  let x = a;
} else {
  let z = x;
  // ERR  ^ Symbol not found: "x"
}