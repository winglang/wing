bring cloud;

let globalB = new cloud.Bucket();

class Test {
  b: cloud.Bucket;

  init() {
    this.b = new cloud.Bucket();
  }

  public inflight test() {
    let x = this.b;
//               ^ Cannot qualify which operations are performed on object
    x.put("hello", "world");

    let y = globalB;
//          ^ Cannot qualify which operations are performed on object
    y.put("boom", "shakalaka");
  }
}

let f = new Test();
test "test" { f.test(); }
