bring util;
bring expect;

inflight class Sortable {
  pub static extern "./sort.js" sortStringListAsc(arr: Array<str>): Array<str>;
  pub static extern "./sort.js" sortStringListDesc(arr: Array<str>): Array<str>;
}

test "is sorted ascending for batch creation" {
  let a = util.ulid();
  util.sleep(1ms);
  let b = util.ulid();
  util.sleep(1ms);
  let c = util.ulid();
  util.sleep(1ms);

  let sorted = Sortable.sortStringListAsc([c, b, a]);
  expect.equal(a, sorted.at(0));
  expect.equal(b, sorted.at(1));
  expect.equal(c, sorted.at(2));
}

test "is sorted descending for batch creation" {
  let a = util.ulid();
  util.sleep(1ms);
  let b = util.ulid();
  util.sleep(1ms);
  let c = util.ulid();
  util.sleep(1ms);

  let sorted = Sortable.sortStringListDesc([a, b, c]);
  expect.equal(c, sorted.at(0));
  expect.equal(b, sorted.at(1));
  expect.equal(a, sorted.at(2));
}
