while false {
  let x = 1;
}

let y = 123;
while y < 0 {
  let x = 1;
}

let var z = 0;
while true {
  z = z + 1;
  if (z > 2) {
    break;
  }
}
assert(z == 3);

while true {
  break;
}
