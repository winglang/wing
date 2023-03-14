bring cloud;

resource Foo {
  init() { }

  // Needs to be var since we don't support inflight inits yet.
  inflight var inflight_field: num;

  inflight set_field(v: num) {
    this.inflight_field = v * 10;
  }

  inflight get_field(): num {
    return this.inflight_field;
  }
}

let f = new Foo();

new cloud.Function(inflight () => {
  f.set_field(123);
  assert(f.get_field() == 1230);
}) as "test";
