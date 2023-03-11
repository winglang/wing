let words = ["wing", "lang", "dang"];
let unique_numbers = { 1, 2, 3 };

for word in words {
  for number in unique_numbers {
    assert(number > 0);
    print("${word}: ${number}");
  }
}

for word in words {
  for number in unique_numbers {
    assert(number > 0);
    print("${word}: ${number}");
    if (number == 2) {
      break;
    }
  }
}

for x in 0..5 {
  assert(x >= 0);
  assert(x < 5);
  print("increment => 0 <= ${x} < 5");
}

for x in 10..5 {
  assert(x <= 100);
  assert(x > 5);
  print("decrement => 10 >= ${x} > 5 ");
}