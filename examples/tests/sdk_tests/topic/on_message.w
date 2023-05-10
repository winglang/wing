bring cloud;

let t = new cloud.Topic();
let c = new cloud.Counter();

class Predicate {
  c: cloud.Counter;
  init(c: cloud.Counter){
    this.c = c;
  }

  inflight test(): bool{
    return this.c.peek() == 10;
  }
}

class TestHelper {
  init(){}
  extern "../external/sleep.js" static inflight sleep(milli: num);
  
  /** 
   * test predicate every 100 miliseconds until a minute passes
  **/
  inflight assert(predicate: Predicate) { 
    let var i = 0;
    while i<600 {
      i = i + 1;
      if predicate.test() {
        assert(predicate.test());
        return;
      } 
      TestHelper.sleep(100);
    }
    assert(predicate.test());
  }
}

t.onMessage(inflight() => {
  c.inc();
});

t.onMessage(inflight() => {
  c.inc();
});

let js = new TestHelper();

let predicate = new Predicate(c);
new cloud.Function(inflight() => {
  for i in 0..5 {
    t.publish("msg");
  }
  js.assert(predicate);
}) as "test";
