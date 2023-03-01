bring cloud;

resource Another {
  my_field: str;
  my_queue: cloud.Queue;

  init () {
    this.my_field = "hello";
    this.my_queue = new cloud.Queue();
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
    this.another.my_queue.push("message");
//       ^^^^^^^ Unable to reference "my_queue" from inflight method "test" because it is not an inflight method

    assert(res == "hello");
  }
}

let f = new Test();
new cloud.Function(inflight () => { f.test(); }) as "test";