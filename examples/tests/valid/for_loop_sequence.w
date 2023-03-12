print("from 0 to 2 (increment)");
for i in 0..2 {
  assert(i >= 0);
  assert(i < 2);
  print("(0 <= ${i} < 2)");
}

print("---\nfrom 0 to -2 (decrement)");
for i in 0..-2 {
  assert(i <= 0);
  assert(i > -2);
  print("(0 >= ${i} > -2)");
}

let x = 2;
print("---\nfrom 0 to x (2)");
for i in 0..x {
  assert(i >= 0);
  assert(i < 2);
  print("(0 <= ${i} < 2)");
}

print("---\nfrom x (2) to 0");
for i in x..0 {
  assert(i <= 2);
  assert(i > 0);
  print("(2 >= ${i} > 0)");
}

print("---\nfrom 0 to expression (x*2)");
for i in 0..(x*2) {
  assert(i >= 0);
  assert(i < 4);
  print("(0 <= ${i} < 4)");
}

print("---\nfrom expression (x*2) to 0");
for i in (x*2)..0 {
  assert(i <= 4);
  assert(i > 0);
  print("(4 >= ${i} > 0)");
}

print("---\ninclusive range from 0 to 2");
for i in 0..=2 {
  assert(i >= 0);
  assert(i <= 2);
  print("(0 >= ${i} >= 2)");
}

print("---\ninclusive range from 0 to x (2)");
for i in 0..=x {
  assert(i >= 0);
  assert(i <= 2);
  print("(0 <= ${i} <= 2)");
}

print("---\ninclusive range from 0 to (x*2)");
for i in 0..=(x*2) {
  assert(i >= 0);
  assert(i <= 4);
  print("(0 <= ${i} <= 4)");
}