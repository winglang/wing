bring expect;

class FooBase {
  pub bar(): str { return "bar"; }
  pub over(): str { return "base"; }
}

class Foo extends FooBase {
  pub baz(): bool { return true; }
  pub over(): str { return "derived"; }
}

let foo = new Foo();
expect.equal(foo.bar(), "bar");
expect.equal(foo.baz(), true);
expect.equal(foo.over(), "derived");

