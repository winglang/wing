bring cloud;
bring util;

let q = new cloud.Queue();


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
  
      util.sleep(1s);
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
