bring cloud;

let x = 1;
if x == 2 {
  print("x is 2");
} elif x == 1 {
  print("x is 1");
} else {
  print("x is some other number");
}

new cloud.Function(inflight (s: str): str => {
  if x == 1 {
    print("x is 1");
    } elif x == 2 {
      print("x is 2");
    } else {
      print("x is other number");
    }
}) as "func";