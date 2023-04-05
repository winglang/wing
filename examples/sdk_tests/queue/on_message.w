bring cloud;

let q = new cloud.Queue();
let c = new cloud.Counter();

// workaround for $stdlib is not defined compiler error
// had to wrap the inflight ():bool => { c.peek == 2 } inflight method with a the Predicate resource
resource Predicate {
  c: cloud.Counter;
  init(c: cloud.Counter){
    this.c = c;
  }

  inflight test(): bool{
    return this.c.peek() == 2;
  }
}

resource TestHelper {
  init(){}
  extern "helper.js" static inflight sleep(milli: num);
  
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

q.on_message(inflight (msg: str): str => {
  c.inc();
});

let js = new TestHelper();

let predicate = new Predicate(c);
new cloud.Function(inflight () => {
  q.push("hello");
  q.push("world");
  js.assert(predicate);
}) as "test:on_message";