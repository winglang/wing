bring cloud;

let globalQueue = new cloud.Queue();

class Another {
  myQueue: cloud.Queue;

  init () {
    this.myQueue = new cloud.Queue();
  }

  inflight inflightReturnsResource(): cloud.Queue {
    return this.myQueue;
//              ^^^^^^^^ Cannot qualify which operations are performed on class "this.myQueue"
  }

  inflight inflightReturnsResource2(): cloud.Queue {
    return globalQueue;
//         ^^^^^^^^^^^^ Cannot qualify which operations are performed on class "globalQueue"
  }
}

class Test {
  another: Another;

  init() {
    this.another = new Another();
  }

  inflight test() {
    let q = this.another.inflightReturnsResource();
    q.push("push!");

    let q2 = this.another.inflightReturnsResource2();
    q2.push("push!");
  }
}

let f = new Test();
test "test" { f.test(); }