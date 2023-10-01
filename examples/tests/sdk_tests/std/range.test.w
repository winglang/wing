bring cloud;

test "range in ascending order" {
  let r = std.Range.of(-1, 2);
  log("${r.at(0)}");
  assert(r.length == 3);
  assert(r.at(0) == -1);
  assert(r.at(1) == 0);
  assert(r.at(2) == 1);
}

test "range in descending order" {
  let r = std.Range.of(2, -1);
  log("${r.at(0)}");
  assert(r.length == 3);
  assert(r.at(0) == 2);
  assert(r.at(1) == 1);
  assert(r.at(2) == 0);
}

test "range with same number" {
  let r = std.Range.of(5, 5);
  assert(r.length == 0);
}
