bring "./subdir2" as subdir;

// from subdir/file1.w
let foo = new subdir.Foo();
assert(foo.foo() == "foo");

// from subdir/file2.w
let bar = new subdir.Bar();
assert(bar.bar() == "bar");
