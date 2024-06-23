bring cloud;
bring expect;

let fn = new cloud.Function(inflight () => {
  return "hello, world";
});

test "fn returns hello" {
  expect.equal(fn.invoke(""), "hello, world");
}
