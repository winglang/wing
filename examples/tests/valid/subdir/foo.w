// used by bring_local_normalization.w

bring "./bar.w" as bar;
bring "../baz.w" as baz;

class Foo {
  public static foo(): str {
    return "foo";
  }
  public static bar(): str {
    return bar.Bar.bar();
  }
  public static baz(): str {
    return baz.Baz.baz();
  }
}
