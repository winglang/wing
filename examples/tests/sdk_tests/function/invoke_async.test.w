bring cloud;
bring util;

let payload = "hello";
log("log preflight");

let f1 = new cloud.Function(inflight (input: str): str => {
  log("log inside f1");
}) as "f1";

let f2 = new cloud.Function(inflight (input: str): str => {
  log("log inside f2");
}) as "f2";

test "invoke" {
  log("log inside test");
  f1.invokeAsync(payload);
  f2.invoke(payload);
}
