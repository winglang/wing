// used by bring_local_normalization.w

bring "./bar.w" as bar;
bring "../baz.w" as baz;

class Foo {
  static foo(): str {
    return "foo";
  }
  static bar(): str {
    return bar.Bar.bar();
  }
  static baz(): str {
    return baz.Baz.baz();
  }
}
