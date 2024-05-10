bring cloud;

class Another {
  myQueue: cloud.Queue;
  pub anotherStr: str;

  new() {
    this.myQueue = new cloud.Queue();
    this.anotherStr = "bang";
  }

  pub inflight inflightReturnsResource(): cloud.Queue {
    return this.myQueue;
//              ^^^^^^^^ Cannot qualify access to a lifted object
  }
}

class Test {
  justBucket: cloud.Bucket;
  b: cloud.Bucket;
  another: Another;
  array: Array<cloud.Bucket>;
  justStr: str;

  new() {
    this.b = new cloud.Bucket() as "b1";
    this.justBucket = new cloud.Bucket() as "b2";
    this.another = new Another();
    this.array = [new cloud.Bucket() as "a1", new cloud.Bucket() as "a2"];
    this.justStr = "hello";
  }

  pub inflight test1() {
    let x = this.b;
//               ^ Cannot qualify access to a lifted object
    x.put("hello", "world");
    assert(this.justStr == "hello");
    this.justBucket.put("hello", "world");
  }

  pub inflight test2() {
    let q = this.another.inflightReturnsResource();
    q.push("push!");
  }

  pub inflight test3() {
    let b = this.array.at(1);
    assert(b.list().length == 0);
  }

  pub inflight test4() {
    assert(this.another.anotherStr == "bang");
  }
}

let f = new Test();
test "test1" { f.test1(); }
test "test2" { f.test2(); }
test "test3" { f.test3(); }
test "test4" { f.test4(); }
