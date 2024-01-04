bring util;
bring expect;

inflight class Sortable {
  // TODO: https://github.com/winglang/wing/issues/4998
  pub static extern "./sort.js" sortStringListAsc(arr: Array<str>): Array<str>;
  pub static extern "./sort.js" sortStringListDesc(arr: Array<str>): Array<str>;
}

let preflightUlid = util.ulid();

test "preflight ulid works" {
  expect.equal(26, preflightUlid.length);
}

test "is sorted ascending for batch creation" {
  let a = util.ulid();
  util.sleep(1ms);
  let b = util.ulid();
  util.sleep(1ms);
  let c = util.ulid();

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

  let sorted = Sortable.sortStringListDesc([a, b, c]);
  expect.equal(c, sorted.at(0));
  expect.equal(b, sorted.at(1));
  expect.equal(a, sorted.at(2));
}
