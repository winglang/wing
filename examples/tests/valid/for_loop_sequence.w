print("---\nfor i in 0..0 { ... }");
for i in 0..0 {
  assert(false);
}
print("there's no value to iterate");

print("---\nfor i in 0..=0 { ... }");
for i in 0..=0 {
  assert(i == 0);
  print("${i}");
}

print("---\nfor i in 0..2 { ... }");
for i in 0..2 {
  assert(i >= 0);
  assert(i < 2);
  print("${i}");
}

print("---\nfor i in 0..=2 { ... }");
for i in 0..=2 {
  assert(i >= 0);
  assert(i <= 2);
  print("${i}");
}

print("---\nfor i in 2..0 { ... }");
for i in 2..0 {
  assert(i <= 2);
  assert(i > 0);
  print("${i}");
}

print("---\nfor i in 2..=0 { ... }");
for i in 2..=0 {
  assert(i <= 2);
  assert(i >= 0);
  print("${i}");
}

print("---\nfor i in 0..-2 { ... }");
for i in 0..-2 {
  assert(i <= 0);
  assert(i > -2);
  print("${i}");
}

print("---\nfor i in 0..=-2 { ... }");
for i in 0..=-2 {
  assert(i <= 0);
  assert(i > -3);
  print("${i}");
}

print("---\nfor i in -2..0 { ... }");
for i in -2..0 {
  assert(i >= -2);
  assert(i < 0);
  print("${i}");
}

print("---\nfor i in -2..=0 { ... }");
for i in -2..=0 {
  assert(i >= -2);
  assert(i <= 0);
  print("${i}");
}

let x = 2;
print("---\nfor i in 0..x { ... } <=> x = 2");
for i in 0..x {
  assert(i >= 0);
  assert(i < 2);
  print("${i}");
}

print("---\nfor i in 0..=x { ... } <=> x = 2");
for i in 0..=x {
  assert(i >= 0);
  assert(i <= 2);
  print("${i}");
}

print("---\nfor i in x..0 { ... } <=> x = 2");
for i in x..0 {
  assert(i <= 2);
  assert(i > 0);
  print("${i}");
}

print("---\nfor i in 0..(x*2) { ... } <=> x = 2");
for i in 0..(x*2) {
  assert(i >= 0);
  assert(i < 4);
  print("${i}");
}

print("---\nfor i in 0..=(x*2) { ... } <=> x = 2");
for i in 0..=(x*2) {
  assert(i >= 0);
  assert(i <= 4);
  print("${i}");
}

print("---\nfor i in (x*2)..0 { ... } <=> x = 2");
for i in (x*2)..0 {
  assert(i <= 4);
  assert(i > 0);
  print("${i}");
}
