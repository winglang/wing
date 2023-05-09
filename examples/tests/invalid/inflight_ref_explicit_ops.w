bring cloud;

class Another {
  myQueue: cloud.Queue;
  anotherStr: str;

  init () {
    this.myQueue = new cloud.Queue();
    this.anotherStr = "bang";
  }

  inflight inflightReturnsResource(): cloud.Queue {
    return this.myQueue;
//              ^^^^^^^^ Cannot qualify which operations are performed on resource
  }
}

class Test {
  justBucket: cloud.Bucket;
  b: cloud.Bucket;
  another: Another;
  array: Array<cloud.Bucket>;
  justStr: str;

  init() {
    this.b = new cloud.Bucket() as "b1";
    this.justBucket = new cloud.Bucket() as "b2";
    this.another = new Another();
    this.array = [new cloud.Bucket() as "a1", new cloud.Bucket() as "a2"];
    this.justStr = "hello";
  }

  inflight test1() {
    let x = this.b;
//               ^ Cannot qualify which operations are performed on resource
    x.put("hello", "world");
    assert(this.justStr == "hello");
    this.justBucket.put("hello", "world");
  }

  inflight test2() {
    let q = this.another.inflightReturnsResource();
    q.push("push!");
  }

  inflight test3() {
    let b = this.array.at(1);
    assert(b.list().length == 0);
  }

  inflight test4() {
    assert(this.another.anotherStr == "bang");
  }
}

let f = new Test();
new cloud.Function(inflight () => { f.test1(); }) as "test1";
new cloud.Function(inflight () => { f.test2(); }) as "test2";
new cloud.Function(inflight () => { f.test3(); }) as "test3";
new cloud.Function(inflight () => { f.test4(); }) as "test4";
