// NOTE: this test is supposed to fail once https://github.com/winglang/wing/pull/1610 is complete

bring cloud;

resource Test {
  b: cloud.Bucket;

  init() {
    this.b = new cloud.Bucket();
  }

  inflight test() {
    let x = this.b;
    x.put("hello", "world");
  }
}

let f = new Test();
new cloud.Function(inflight () => { f.test(); }) as "test";