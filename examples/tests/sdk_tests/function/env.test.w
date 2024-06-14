bring cloud;
bring util;

let f1 = new cloud.Function(inflight () => {
  assert(util.env("FOO1") == "bar");
  assert(util.env("FOO2") == "baz");
  return "ok";
}, env: { FOO1: "bar" });

f1.addEnvironment("FOO1", "bar"); // same key-value pair can be added multiple times
f1.addEnvironment("FOO2", "baz");

test "addEnvironment" {
  assert(f1.invoke("") == "ok");
}
