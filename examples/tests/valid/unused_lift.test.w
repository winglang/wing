bring cloud;

let b = new cloud.Bucket();

class Foo {
  inflight access_b() {
    b.list();
  }

  pub inflight m() {}
}

let f = new Foo();

test "Use class but not method that access lifted object" {
  f.m();
}

class Bar {
  static inflight access_b() {
    b.list();
  }

  pub inflight m() {}
}

let bar = new Bar();

test "Use class but not static method that access lifted object" {
  bar.m();
}