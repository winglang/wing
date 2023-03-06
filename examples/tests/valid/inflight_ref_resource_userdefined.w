bring cloud;

resource Another {
  init () { }

  inflight func(): str {
    return "hello";
  }
}

resource Test {
  another: Another;

  init() {
    this.another = new Another();
  }

  inflight test() {
    let res = this.another.func();
    assert(res == "hello");
  }
}

let f = new Test();
new cloud.Function(inflight () => { f.test(); }) as "test";