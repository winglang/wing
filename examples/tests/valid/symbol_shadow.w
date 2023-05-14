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
  init(){
    let s = "inResource";
    assert(s == "inResource");
    test "inflight in resource should capture the right scoped var" {
      assert(s == "inResource");
    }
  }
}
new A();

test "inflight on top should capture top" {
  assert(s == "top");
}

test "insideInflight should capture the right scope" {
  let s = "insideInflight";
  assert(s == "insideInflight");
}
