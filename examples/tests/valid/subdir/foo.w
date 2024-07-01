// used by bring_local_normalization.w

bring "./bar.w" as bar;
bring "../baz.w" as baz;

pub class Foo {
  pub static foo(): str {
    return "foo";
  }
  pub static bar(): str {
    return bar.Bar.bar();
  }
  pub static baz(): str {
    return baz.Baz.baz();
  }
}
