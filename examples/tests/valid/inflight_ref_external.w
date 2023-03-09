bring cloud;

resource Test {
  b: cloud.Bucket;
  n: num;

  init(b: cloud.Bucket, n: num) {
    this.b = b;
    this.n = n;
  }

  inflight test() {
    assert(this.b.list().length == 0);
    assert(this.n == 12);
  }
}

let my = new cloud.Bucket();
let f = new Test(my, 12);
new cloud.Function(inflight () => { f.test(); }) as "test";