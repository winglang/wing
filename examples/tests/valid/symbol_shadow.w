bring cloud;
let s = "top";

if true {
  let s = "inner";
  assert(s == "inner");
  test "inflight nested should not capture the shadowed var" {
    assert(s == "inner");
  }
}
assert(s == "top");

class A {
  init() {
    let s = "in_resource";
    assert(s == "in_resource");
    test "inflight in resource should capture the right scoped var" {
      assert(s == "in_resource");
    }
  }
}
new A();

test "inflight on top should capture top" {
  assert(s == "top");
}

test "inside_inflight should capture the right scope" {
  let s = "inside_inflight";
  assert(s == "inside_inflight");
}
