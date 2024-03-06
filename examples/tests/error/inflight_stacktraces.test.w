bring cloud;
bring expect;

let bucket = new cloud.Bucket();

test "assert" {
  assert(false);
}

test "expect.equal" {
  expect.equal(1,2 );
}

test "bucket failed get" {
  bucket.get("doesn't exist");
}

test "throw from closure" {
  let closure = inflight () => {
    throw "ouch";
  };
  closure();
}
