bring cloud;

let c = new cloud.Counter();

class TestHelper {
  extern "../external/sleep.js" inflight sleep(milli: num);
}

let js = new TestHelper();

let m = new cloud.Function(
  inflight(event:str):str => {
    return "${c.inc()}";
  },
  cloud.FunctionProps { memoization: 10s }
) as "memoization";

new std.Test(
  inflight() => {
    assert(m.invoke("foo") == "0");
    assert(m.invoke("bar") == "1");
    assert(m.invoke("foo") == "0");
    js.sleep(10000);
    assert(m.invoke("foo") == "2");
    assert(m.invoke("bar") == "3");
  },
  std.TestProps { timeout: 1m }
) as "test:memoization";