for x in 0..5 {
  assert(x >= 0);
  assert(x < 5);
  print("from 0 to 5 (increment) => 0 <= ${x} < 5");
}

for x in 10..5 {
  assert(x <= 10);
  assert(x > 5);
  print("from 10 to 5 (decrement) => 10 >= ${x} > 5 ");
}

let identifier = 3;
for x in 0..identifier {
  assert(x >= 0);
  assert(x < 3);
  print("from 0 to identifier (3) => 0 <= ${x} < 3");
}

for x in identifier..0 {
  assert(x <= 3);
  assert(x > 0);
  print("from identifier (3) to 0 => 3 >= ${x} > 0");
}

for x in 0..(identifier*2) {
  assert(x >= 0);
  assert(x < 6);
  print("from 0 to expression (3*2) => 0 <= ${x} < 6");
}

for x in (identifier*2)..0 {
  assert(x <= 6);
  assert(x > 0);
  print("from expression (3*2) to 0 => 6 >= ${x} > 0");
}