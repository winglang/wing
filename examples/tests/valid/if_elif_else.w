bring cloud;

let x = 1;
let var preflight_ok = false;
if x == 2 {
  print("x is 2");
} elif x == 1 {
  print("x is 1");
  preflight_ok = true;
} elif x == 0 {
  print("x is 0");
} else {
  print("x is other than 0, 1 or 2");
}
assert(preflight_ok);

new cloud.Function(inflight (s: str): str => {
  let var inflight_ok = false;
  if x == 2 {
    print("x is 2");
  } elif x == 1 {
    print("x is 1");
    inflight_ok = true;
  } elif x == 0 {
    print("x is 0");
  } else {
    print("x is other than 0, 1 or 2");
  }
  assert(inflight_ok);
}) as "test";