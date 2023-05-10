bring cloud;

let payload = "hello";

let f = new cloud.Function(inflight ():str => {
  return payload;
});


test "function invoke" {
  let x = f.invoke("");
  assert(x == payload);
}
