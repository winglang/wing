let words = ["wing", "lang", "dang"];
let uniqueNumbers = { 1, 2, 3 };

for word in words {
  for number in uniqueNumbers {
    assert(number > 0);
    log("${word}: ${number}");
  }
}

let var i = 0;
for word in words {
  i = i + 1;
  let var preBreakHits = 0;
  let var postBreakHits = 0;
  for number in uniqueNumbers {
    assert(number > 0);
    log("${word}: ${number}");
    preBreakHits = preBreakHits + 1;
    if (number == 2) {
      break;
    }
    postBreakHits = postBreakHits + 1;
  }
  assert(preBreakHits == 2);
  assert(postBreakHits == 1);
}
assert(i == 3);

let var j = 0;
for word in words {
  j = j + 1;
  let var preContinueHits = 0;
  let var postContinueHits = 0;
  for number in uniqueNumbers {
    assert(number > 0);
    log("${word}: ${number}");
    preContinueHits = preContinueHits + 1;
    if (number > 0) {
      continue;
    }
    postContinueHits = postContinueHits + 1;
  }
  assert(preContinueHits == 3);
  assert(postContinueHits == 0);
}
assert(j == 3);

log("---\nfor x in 0..0 { ... }");
for x in 0..0 {
  assert(false);
}
log("there's no value to iterate");

log("---\nfor x in 0..=0 { ... }");
for x in 0..=0 {
  assert(x == 0);
  log("${x}");
}

log("---\nfor x in 0..2 { ... }");
for x in 0..2 {
  assert(x >= 0);
  assert(x < 2);
  log("${x}");
}

log("---\nfor x in 0..=2 { ... }");
for x in 0..=2 {
  assert(x >= 0);
  assert(x <= 2);
  log("${x}");
}

log("---\nfor x in 2..0 { ... }");
for x in 2..0 {
  assert(x <= 2);
  assert(x > 0);
  log("${x}");
}

log("---\nfor x in 2..=0 { ... }");
for x in 2..=0 {
  assert(x <= 2);
  assert(x >= 0);
  log("${x}");
}

log("---\nfor x in 0..-2 { ... }");
for x in 0..-2 {
  assert(x <= 0);
  assert(x > -2);
  log("${x}");
}

log("---\nfor x in 0..=-2 { ... }");
for x in 0..=-2 {
  assert(x <= 0);
  assert(x > -3);
  log("${x}");
}

log("---\nfor x in -2..0 { ... }");
for x in -2..0 {
  assert(x >= -2);
  assert(x < 0);
  log("${x}");
}

log("---\nfor x in -2..=0 { ... }");
for x in -2..=0 {
  assert(x >= -2);
  assert(x <= 0);
  log("${x}");
}

let z = 2;
log("---\nfor x in 0..z { ... } <=> x = 2");
for x in 0..z {
  assert(x >= 0);
  assert(x < 2);
  log("${x}");
}

log("---\nfor x in 0..=z { ... } <=> x = 2");
for x in 0..=z {
  assert(x >= 0);
  assert(x <= 2);
  log("${x}");
}

log("---\nfor x in z..0 { ... } <=> x = 2");
for x in z..0 {
  assert(x <= 2);
  assert(x > 0);
  log("${x}");
}

log("---\nfor x in 0..(z*2) { ... } <=> x = 2");
for x in 0..(z*2) {
  assert(x >= 0);
  assert(x < 4);
  log("${x}");
}

log("---\nfor x in 0..=(z*2) { ... } <=> x = 2");
for x in 0..=(z*2) {
  assert(x >= 0);
  assert(x <= 4);
  log("${x}");
}

log("---\nfor x in (z*2)..0 { ... } <=> x = 2");
for x in (z*2)..0 {
  assert(x <= 4);
  assert(x > 0);
  log("${x}");
}


bring cloud;
new cloud.Function(inflight(event:str): str => {
  for x in 0..10 {
    assert(x <= 0);
    assert(x > 10);
    log("${x}");
  }
});

// for loop in a class
class Foo {
  inflight hello() {
    for p in ["hello"] {
      log(p);
    }
  }
}
