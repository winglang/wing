bring cloud;

let q = new cloud.Queue();
let c = new cloud.Counter();

// workaround for $stdlib is not defined compiler error
// had to wrap the inflight ():bool => { c.peek == 2 } inflight method with a the Predicate resource
class Predicate {
  c: cloud.Counter;
  init(c: cloud.Counter){
    this.c = c;
  }

  inflight test(): bool{
    return this.c.peek() == 2;
  }
}

class TestHelper {
  init(){}
  extern "../external/sleep.js" inflight sleep(milli: num);
}

q.add_consumer(inflight (msg: str): str => {
  c.inc();
});

let js = new TestHelper();

let predicate = new Predicate(c);
new cloud.Function(inflight () => {
  q.push("hello");
  q.push("world");

  let var i = 0;
  while i < 600 {
    i = i + 1;
    if predicate.test() {
      assert(predicate.test());
      return;
    } 
    js.sleep(100);
  }
  assert(predicate.test());
}) as "test:add_consumer";
