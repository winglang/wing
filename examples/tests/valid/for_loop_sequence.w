print("from 0 to 5 (increment)");
for x in 0..5 {
  assert(x >= 0);
  assert(x < 5);
  print("(0 <= ${x} < 5)");
}

print("---\nfrom 10 to 5 (decrement)");
for x in 10..5 {
  assert(x <= 10);
  assert(x > 5);
  print("(10 >= ${x} > 5)");
}

let identifier = 3;
print("---\nfrom 0 to identifier (3)");
for x in 0..identifier {
  assert(x >= 0);
  assert(x < 3);
  print("(0 <= ${x} < 3)");
}

print("---\nfrom identifier (3) to 0");
for x in identifier..0 {
  assert(x <= 3);
  assert(x > 0);
  print("(3 >= ${x} > 0)");
}

print("---\nfrom 0 to expression (3*2)");
for x in 0..(identifier*2) {
  assert(x >= 0);
  assert(x < 6);
  print("(0 <= ${x} < 6)");
}

print("---\nfrom expression (3*2) to 0");
for x in (identifier*2)..0 {
  assert(x <= 6);
  assert(x > 0);
  print("(6 >= ${x} > 0)");
}

print("---\ninclusive range");
for x in 0..=3 {
  print("(0 >= ${x} >= 3)");
}

print("---\ninclusive range with identifier (3)");
for x in 0..=identifier {
  assert(x >= 0);
  assert(x <= 3);
  print("(0 <= ${x} <= 3)");
}

print("---\ninclusive range with expression (3*2)");
for x in 0..=(identifier*2) {
  assert(x >= 0);
  assert(x <= 6);
  print("(0 <= ${x} <= 6)");
}