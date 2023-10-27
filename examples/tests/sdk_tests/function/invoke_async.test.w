bring cloud;
bring util;

let payload = "hello";
log("log preflight");

let f = new cloud.Function(inflight (input: str): void => {
  log("log inside function\ncontains 2 lines");
  let target = util.tryEnv("WING_TARGET");
  assert(target?); // make sure WING_TARGET is defined in all environments
});

test "invokeAsync()" {
  log("log inside test");
  f.invokeAsync("hello");
}
