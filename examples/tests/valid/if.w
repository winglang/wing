bring cloud;

let x = 1;
let var preflight_ok = false;
if x == 1 {
  print("x is 1");
  preflight_ok = true;
}
assert(preflight_ok);

new cloud.Function(inflight (s: str): str => {
  let var inflight_ok = false;
  if x == 1 {
    print("x is 1");
    inflight_ok = true;
  }
  assert(inflight_ok);
}) as "test";