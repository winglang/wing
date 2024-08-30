bring expect;

interface IFoo {
  foo(): str;
}

interface IBar extends IFoo {
  bar(): str;
}

class Baz impl IBar {
  pub foo(): str { return "foo"; }
  pub bar(): str { return "bar"; }
}

let baz: IBar = new Baz();
expect.equal(baz.foo(), "foo");
expect.equal(baz.bar(), "bar");
