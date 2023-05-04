bring cloud;

class Foo impl cloud.IFunctionHandler {
  inflight handle(message: str): str {
    return "hello world!";
  }
}

let fn = new cloud.Function(new Foo());

new cloud.Function(inflight () => {
  assert(fn.invoke("test") == "hello world!");
}) as "test";
