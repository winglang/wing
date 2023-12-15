bring cloud;
bring util;

let q = new cloud.Queue();
let c = new cloud.Counter();

// workaround for $stdlib is not defined compiler error
// had to wrap the inflight ():bool => { c.peek == 2 } inflight method with a the Predicate resource
class Predicate {
  c: cloud.Counter;
  new(c: cloud.Counter){
    this.c = c;
  }

  pub inflight test(): bool{
    return this.c.peek() == 2;
  }
}



q.setConsumer(inflight (msg: str): str => {
  c.inc();
});


let predicate = new Predicate(c);
test "setConsumer" {
  q.push("hello");
  q.push("world");

  let var i = 0;
  while i < 600 {
    i = i + 1;
    if predicate.test() {
      assert(predicate.test());
      return;
    } 
    util.sleep(1s);
  }
  assert(predicate.test());
}
