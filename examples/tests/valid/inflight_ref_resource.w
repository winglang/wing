bring cloud;

resource Test {
  b: cloud.Bucket;

  init() {
    this.b = new cloud.Bucket();
  }

  inflight test() {
    this.b.put("hello", "world");
  }
}

let f = new Test();
new cloud.Function(inflight () => { f.test(); }) as "test";