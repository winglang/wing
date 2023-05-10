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

class Foo {
  data: B;

  init(b: B) {
    this.data = b;
  }

  inflight getStuff(): str {
    return this.data.field0;
  }
}

assert(x.field0 == "Sup");
assert(y.field1 == 1);
assert(y.field3.field0 == "foo");

// valid types in struct
struct lotsOfTypes {
  a: str;
  b: num;
  c: Array<str>;
  d: Map<str>;
  e: Json;
  f: bool;
  g: str?;
  h: Array<Map<num>>;
}

// two inherits with same field name and type
struct Razzle {
  a: str;
}

struct Dazzle {
  a: str;
}

struct Showtime extends Razzle, Dazzle {}

let s = Showtime {
  a: "Boom baby"
};