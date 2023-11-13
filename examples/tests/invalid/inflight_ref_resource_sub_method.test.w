bring cloud;

let globalQueue = new cloud.Queue();

class Another {
  myQueue: cloud.Queue;

  new() {
    this.myQueue = new cloud.Queue();
  }

  pub inflight inflightReturnsResource(): cloud.Queue {
    return this.myQueue;
//              ^^^^^^^^ Cannot qualify access to a lifted object
  }

  pub inflight inflightReturnsResource2(): cloud.Queue {
    return globalQueue;
//         ^^^^^^^^^^^^ Cannot qualify access to a lifted object
  }
}

class Test {
  another: Another;

  new() {
    this.another = new Another();
  }

  pub inflight test() {
    let q = this.another.inflightReturnsResource();
    q.push("push!");

    let q2 = this.another.inflightReturnsResource2();
    q2.push("push!");
  }
}

let f = new Test();
test "test" { f.test(); }