bring cloud;

let q = new cloud.Queue();
class TestHelper {
  init(){}
  extern "../external/sleep.js" inflight sleep(milli: num);
}

let js = new TestHelper();

test "purge" {
  q.push("foo");
  q.push("bar");
  q.push("baz");

  let wait = inflight (pred: inflight (): bool): bool => {
    let var i = 0;
    while i < 60 {
      if pred() {
        return true;
      } 
  
      js.sleep(100);
      i = i + 1;
    }
  
    return false;
  };
  
  assert(wait(inflight (): bool => { 
    return q.approxSize() == 3;
  }));

  q.purge();

  assert(wait(inflight (): bool => {
    return q.approxSize() == 0;
  }));
}
