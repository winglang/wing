let words = ["wing", "lang", "dang"];
let unique_numbers = { 1, 2, 3 };

for word in words {
  for number in unique_numbers {
    assert(number > 0);
    print("${word}: ${number}");
  }
}