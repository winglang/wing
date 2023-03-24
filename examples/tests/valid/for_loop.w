let words = ["wing", "lang", "dang"];
let unique_numbers = { 1, 2, 3 };

for word in words {
  for number in unique_numbers {
    assert(number > 0);
    log("${word}: ${number}");
  }
}

let var i = 0;
for word in words {
  i = i + 1;
  let var pre_break_hits = 0;
  let var post_break_hits = 0;
  for number in unique_numbers {
    assert(number > 0);
    log("${word}: ${number}");
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
    log("${word}: ${number}");
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