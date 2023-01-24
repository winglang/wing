bring cloud;

let x = 1;
let var ok = false;
if x == 2 {
  print("x is 2");
  ok = true;
}
assert(ok);

new cloud.Function(inflight (s: str): str => {
  let var ok = false;
  if x == 1 {
    print("x is 1");
    ok = true;
  }
  assert(ok);
}) as "test";