bring cloud;

let globalCounter = new cloud.Counter();

class Another {
  pub static inflight myStaticMethod(): num {
    return globalCounter.peek();
  }
}

test "access cloud resource through static methods only" {
  // Call a static method which access a (global) cloud resource
  // the capturing should work through the Type binding mechanism
  assert(Another.myStaticMethod() == 0);
}