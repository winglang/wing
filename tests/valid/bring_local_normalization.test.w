bring "./subdir/foo.w" as foo;
bring "./subdir/bar.w" as bar;
bring "./baz.w" as baz;

// in this app, "bar" is imported two ways (here as "./subdir/bar.w" and in foo.w as "./bar.w")
// and "baz" is imported two ways (here as "./baz.w" and in foo.w as "../baz.w")
// this test checks that the different imports all resolve to the same module

assert(foo.Foo.foo() == "foo");
assert(foo.Foo.bar() == "bar");
assert(foo.Foo.baz() == "baz");
assert(bar.Bar.bar() == "bar");
assert(baz.Baz.baz() == "baz");
