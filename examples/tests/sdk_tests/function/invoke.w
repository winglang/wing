bring cloud;
bring util;

let payload = "hello";

let f = new cloud.Function(inflight (input: str): str => {
  let target = util.tryEnv("WING_TARGET");
  assert(target?); // make sure WING_TARGET is defined in all environments

  return "${input}-response";
});

test "invoke" {
  let x = f.invoke("hello");
  assert(x == "hello-response");
}
