struct A {
  field0: str;
}

struct B extends A {
  field1: num;
  field2: str;
}

let x = A {
  field0: "Sup"
};

let y = B {
  field0: "hello",
  field1: 1,
  field2: "world",
};

resource Foo {
  data: B;

  init(b: B) {
    this.data = b;
  }

  // TODO: Access struct attributes https://github.com/winglang/wing/issues/1604
  // inflight get_stuff(): str {
  //   return this.data.field0;
  // }
}

// TODO: Access struct attributes https://github.com/winglang/wing/issues/1604
// assert(x.field0 == "Sup");
// assert(y.field1 == 1);