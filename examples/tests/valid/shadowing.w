bring cloud;

let bar = "hola!";

let fn = inflight (): Array<str> => {
  let result = MutArray<str>[];

  result.push(bar);

  if true {
    let foo = "world";
    result.push(foo);
  }

  let foo = "bang";
  result.push(foo);

  return result.copy();
};

test "do not capture shadowed variable" {
  let result = fn();
  assert(result.length == 3);
  assert(result.at(0) == "hola!");
  assert(result.at(1) == "world");
  assert(result.at(2) == "bang");
}