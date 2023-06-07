bring cloud;
bring util;


let c = new cloud.Counter();
let b = new cloud.Bucket();
let f1 = new cloud.Function(inflight () => {
    c.inc();
}, cloud.FunctionProps { memory: 128 }) as "memory fn";
  
let f2 = new cloud.Function(inflight () => {
    c.inc();
    // TODO: add assertion to the env here- when util.env could be called inflight
}, cloud.FunctionProps { env: { catName: "Tion" }}) as "env fn";

f2.addEnvironment("catAge", "2");
assert(f2.env.get("catAge") == "2");
assert(f2.env.get("catName") == "Tion");

test "function with memory and function with env can be invoked" {
    assert(c.peek() == 0);
    f1.invoke("");
    assert(c.peek() == 1);
    f2.invoke("");
    assert(c.peek() == 2);
  }