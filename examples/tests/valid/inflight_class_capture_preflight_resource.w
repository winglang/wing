bring cloud;

let b = new cloud.Bucket();
let myConst = "bang bang";

inflight class Foo {
  uploadToBucket(k: str, value: str) {
    b.put(k, value);
  }
}

test "inflight class captures preflight resource" {
  let f = new Foo();
  f.uploadToBucket("hello.txt", "world");
}
