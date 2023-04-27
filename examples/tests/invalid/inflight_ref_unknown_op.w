bring cloud;

class Test {
  b: cloud.Bucket;

  init() {
    this.b = new cloud.Bucket();
  }

  inflight test() {
    let x = this.b;
//               ^ Cannot qualify which operations are performed on resource
    x.put("hello", "world");
  }
}

let f = new Test();
new cloud.Function(inflight () => { f.test(); }) as "test";
