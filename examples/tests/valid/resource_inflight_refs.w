bring cloud;

resource Foo {
  b: cloud.Bucket;
  q: cloud.Queue;
  my_str: str;

  init() {
    this.b = new cloud.Bucket();
    this.q = new cloud.Queue();
    this.my_str = "hello";
  }

  inflight put_bucket() {
    let s = "b";
    let var x = "f";

    if true {
      x = "hello";
    }

    this.b.put(x, s);
  }

  inflight push_queue() {
    this.q.push("fo");
  }
}

resource Goo {
  f: Foo;

  init() {
    this.f = new Foo();
  }

  inflight foo_goo() {
    print(this.f.my_str);
    this.f.b.put("good", "god");
  }
}

let f = new Foo();
let g = new Goo();

let get_g = (): Goo => {
  return g;
};

new cloud.Function(inflight () => {
  f.put_bucket();
  f.push_queue();
  g.foo_goo();
}) as "test";
