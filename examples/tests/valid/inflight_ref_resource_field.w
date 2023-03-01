bring cloud;

resource Another {
  my_field: str;
  init () {
    this.my_field = "hello";
  }

  inflight func(): str {
    return this.my_field;
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