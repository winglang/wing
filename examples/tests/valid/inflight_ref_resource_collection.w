bring cloud;

resource Test {
  array: Array<cloud.Bucket>;

  init() {
    this.array = [new cloud.Bucket()];
  }

  inflight test() {
    assert(this.array.at(0).list().length == 0);
  }
}

let f = new Test();
new cloud.Function(inflight () => { f.test(); }) as "test";