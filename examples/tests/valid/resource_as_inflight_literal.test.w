bring cloud;

class Foo impl cloud.IFunctionHandler {
  pub inflight handle(): str {
    return "hello world!";
  }
}

let fn = new cloud.Function(new Foo());

test "test" {
  assert(fn.invoke("test") == "hello world!");
}
