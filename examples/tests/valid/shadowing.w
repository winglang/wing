bring cloud;

let bar = "hola!";
let foo = "not captured";

let fn = inflight () -> Array<str> {
  let result = MutArray<str>[];

  // okay to capture "bar" because there isn't another variable with the same
  // name within the current scope.
  result.push(bar);

  if true {
    // shadowing the captured "bar" inside the "if" scope
    let bar = "world";
    result.push(bar);
  }

  // since we are not attempting to capture "foo" before it ise defined in this scope, this should
  // work.
  let foo = "bang";
  result.push(foo);

  return result.copy();
};

test "capture shadow interaction" {
  let result = fn();
  assert(result.length == 3);
  assert(result.at(0) == "hola!");
  assert(result.at(1) == "world");
  assert(result.at(2) == "bang");
}