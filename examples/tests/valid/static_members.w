resource Foo {
  instance_field: num;

  static f: num;
  static m():num { return 99; }

  init() {
    this.instance_field = 100;
  }
}

let foo = new Foo();
assert(foo.instance_field == 100);
assert(Foo.f == 101);
assert(Foo.m() == 99);
