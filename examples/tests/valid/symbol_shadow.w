bring cloud;
let s = "top";

if true {
  let s = "inner";
  assert(s == "inner");
  new cloud.Function(inflight () => {
    assert(s == "inner");
  }) as "test:inflight nested should not capture the shadowed var";
}
assert(s == "top");

class A {
  init(){
    let s = "in_resource";
    assert(s == "in_resource");
    new cloud.Function(inflight () => {
      assert(s == "in_resource");
    }) as "test:inflight in resource should capture the right scoped var";
  }
}
new A();

new cloud.Function(inflight () => {
  assert(s == "top");
}) as "test:inflight on top should capture top";

new cloud.Function(inflight () => {
  let s = "inside_inflight";
  assert(s == "inside_inflight");
}) as "test:inside_inflight should capture the right scope";
