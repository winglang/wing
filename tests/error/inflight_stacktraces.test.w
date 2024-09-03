bring cloud;
bring expect;

let bucket = new cloud.Bucket();

test "assert" {
  assert(false);
}

test "expect.equal" {
  expect.equal(1,2 );
}

test "bucket failed delete" {
  bucket.delete("doesn't exist", mustExist: true);
}

test "throw from closure" {
  let closure = inflight () => {
    throw "ouch";
  };
  closure();
}

test "assert with message" {
  let x = false;
  assert(x, "x is false");
}
