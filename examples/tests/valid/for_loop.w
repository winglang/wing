let words = ["wing", "lang", "dang"];
let unique_numbers = { 1, 2, 3 };

for word in words {
  for number in unique_numbers {
    assert(number > 0);
    print("${word}: ${number}");
  }
}

let var i = 0;
for word in words {
  i = i + 1;
  let var pre_break_hits = 0;
  let var post_break_hits = 0;
  for number in unique_numbers {
    assert(number > 0);
    print("${word}: ${number}");
    pre_break_hits = pre_break_hits + 1;
    if (number == 2) {
      break;
    }
    post_break_hits = post_break_hits + 1;
  }
  assert(pre_break_hits == 2);
  assert(post_break_hits == 1);
}
assert(i == 3);

let var j = 0;
for word in words {
  j = j + 1;
  let var pre_continue_hits = 0;
  let var post_continue_hits = 0;
  for number in unique_numbers {
    assert(number > 0);
    print("${word}: ${number}");
    pre_continue_hits = pre_continue_hits + 1;
    if (number > 0) {
      continue;
    }
    post_continue_hits = post_continue_hits + 1;
  }
  assert(pre_continue_hits == 3);
  assert(post_continue_hits == 0);
}
assert(j == 3);

print("---\nfor x in 0..0 { ... }");
for x in 0..0 {
  assert(false);
}
print("there's no value to iterate");

print("---\nfor x in 0..=0 { ... }");
for x in 0..=0 {
  assert(x == 0);
  print("${x}");
}

print("---\nfor x in 0..2 { ... }");
for x in 0..2 {
  assert(x >= 0);
  assert(x < 2);
  print("${x}");
}

print("---\nfor x in 0..=2 { ... }");
for x in 0..=2 {
  assert(x >= 0);
  assert(x <= 2);
  print("${x}");
}

print("---\nfor x in 2..0 { ... }");
for x in 2..0 {
  assert(x <= 2);
  assert(x > 0);
  print("${x}");
}

print("---\nfor x in 2..=0 { ... }");
for x in 2..=0 {
  assert(x <= 2);
  assert(x >= 0);
  print("${x}");
}

print("---\nfor x in 0..-2 { ... }");
for x in 0..-2 {
  assert(x <= 0);
  assert(x > -2);
  print("${x}");
}

print("---\nfor x in 0..=-2 { ... }");
for x in 0..=-2 {
  assert(x <= 0);
  assert(x > -3);
  print("${x}");
}

print("---\nfor x in -2..0 { ... }");
for x in -2..0 {
  assert(x >= -2);
  assert(x < 0);
  print("${x}");
}

print("---\nfor x in -2..=0 { ... }");
for x in -2..=0 {
  assert(x >= -2);
  assert(x <= 0);
  print("${x}");
}

let z = 2;
print("---\nfor x in 0..z { ... } <=> x = 2");
for x in 0..z {
  assert(x >= 0);
  assert(x < 2);
  print("${x}");
}

print("---\nfor x in 0..=z { ... } <=> x = 2");
for x in 0..=z {
  assert(x >= 0);
  assert(x <= 2);
  print("${x}");
}

print("---\nfor x in z..0 { ... } <=> x = 2");
for x in z..0 {
  assert(x <= 2);
  assert(x > 0);
  print("${x}");
}

print("---\nfor x in 0..(z*2) { ... } <=> x = 2");
for x in 0..(z*2) {
  assert(x >= 0);
  assert(x < 4);
  print("${x}");
}

print("---\nfor x in 0..=(z*2) { ... } <=> x = 2");
for x in 0..=(z*2) {
  assert(x >= 0);
  assert(x <= 4);
  print("${x}");
}

print("---\nfor x in (z*2)..0 { ... } <=> x = 2");
for x in (z*2)..0 {
  assert(x <= 4);
  assert(x > 0);
  print("${x}");
}
