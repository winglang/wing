bring cloud;

let foo = "hello";
let goo = "world!";

let fn = inflight (): str => {
  let foo = "world";
  return "${foo}, ${goo}!";
};

test "do not capture shadowed variable" {
  let result = fn();
  assert(result == "world, world!!");
}