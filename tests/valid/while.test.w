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

let var v = 0;
let var i = 0;
while i < 10 {
  i = i + 1;
  if (i % 2 == 0) {
    continue;
  }
  v = v + 1;
}
assert(i == 10);
assert(v == 5);
