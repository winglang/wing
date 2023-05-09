bring cloud;

class Another {
  my_queue: cloud.Queue;
  another_str: str;

  init () {
    this.my_queue = new cloud.Queue();
    this.another_str = "bang";
  }

  inflight inflight_returns_resource(): cloud.Queue {
    return this.my_queue;
//              ^^^^^^^^ Cannot qualify which operations are performed on resource
  }
}

class Test {
  just_bucket: cloud.Bucket;
  b: cloud.Bucket;
  another: Another;
  array: Array<cloud.Bucket>;
  just_str: str;

  init() {
    this.b = new cloud.Bucket() as "b1";
    this.just_bucket = new cloud.Bucket() as "b2";
    this.another = new Another();
    this.array = [new cloud.Bucket() as "a1", new cloud.Bucket() as "a2"];
    this.just_str = "hello";
  }

  inflight test1() {
    let x = this.b;
//               ^ Cannot qualify which operations are performed on resource
    x.put("hello", "world");
    assert(this.just_str == "hello");
    this.just_bucket.put("hello", "world");
  }

  inflight test2() {
    let q = this.another.inflight_returns_resource();
    q.push("push!");
  }

  inflight test3() {
    let b = this.array.at(1);
    assert(b.list().length == 0);
  }

  inflight test4() {
    assert(this.another.another_str == "bang");
  }
}

let f = new Test();
test "test1" { f.test1(); }
test "test2" { f.test2(); }
test "test3" { f.test3(); }
test "test4" { f.test4(); }
