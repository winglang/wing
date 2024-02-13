bring cloud;
bring util;

let payload = "hello";
log("log preflight");

let f = new cloud.Function(inflight (input: str): str => {
  log("log inside function\ncontains 2 lines");
  let target = util.tryEnv("WING_TARGET");
  assert(target?); // make sure WING_TARGET is defined in all environments

  return "{input}-response";
});

test "invoke" {
  log("log inside test");
  let x = f.invoke("hello");
  assert(x == "hello-response");
}
