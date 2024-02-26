bring cloud;
bring util;
bring expect;

let payload = "hello";
log("log preflight");

let f = new cloud.Function(inflight (input): str => {
  log("log inside function\ncontains 2 lines");
  let target = util.tryEnv("WING_TARGET");
  assert(target?); // make sure WING_TARGET is defined in all environments

  return "{input}-response";
});

test "invoke" {
  log("log inside test");
  let x = f.invoke("hello");
  expect.equal(x, "hello-response");
}

let f2 = new cloud.Function(inflight (e) => {
  expect.equal(e, nil);
  log("no event, no return!");
}) as "f2";

let f3 = new cloud.Function(inflight () => {
  log("bang!");
}) as "f3";

test "invoke without inputs and outputs" {
  let x = f2.invoke();
  expect.equal(x, nil);

  let response = f3.invoke();
  expect.equal(response, nil);
}