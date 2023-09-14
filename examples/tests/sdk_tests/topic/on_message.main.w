bring cloud;
bring util;

let t = new cloud.Topic();
let c = new cloud.Counter();

class Predicate {
  c: cloud.Counter;
  init(c: cloud.Counter){
    this.c = c;
  }

  pub inflight test(): bool{
    return this.c.peek() == 10;
  }
}

t.onMessage(inflight() => {
  c.inc();
});

t.onMessage(inflight() => {
  c.inc();
});


let predicate = new Predicate(c);
test "onMessage" {
  for i in 0..5 {
    t.publish("msg");
  }
  let var i = 0;
    while i<600 {
      i = i + 1;
      if predicate.test() {
        assert(predicate.test());
        return;
      } 
      util.sleep(1s);
    }
    assert(predicate.test());
}

