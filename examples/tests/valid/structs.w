struct A {
  field0: str;
}

struct B extends A {
  field1: num;
  field2: str;
  field3: A;
}

let x = A {
  field0: "Sup"
};

let y = B {
  field0: "hello",
  field1: 1,
  field2: "world",
  field3: A {
    field0: "foo"
  }
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

// valid types in struct
struct lots_of_types {
  a: str;
  b: num;
  c: Array<str>;
  d: Map<str>;
  e: Json;
  f: bool;
  g: str?;
  h: Array<Map<num>>;
}