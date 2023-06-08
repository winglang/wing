bring cloud;

let myConst = "bang bang";

inflight class Foo {
  getValue() -> str {
    return myConst;
  }
}

test "inflight class captures const" {
  let x = new Foo();
  assert(x.getValue() == myConst);
}
