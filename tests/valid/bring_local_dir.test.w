bring "./subdir2/inner/widget.w" as w;
bring "./subdir2" as subdir;

let widget1 = new w.Widget() as "widget1";
assert(widget1.compute() == 42);

// from subdir/file1.w
let foo = new subdir.Foo();
assert(foo.foo() == "foo");

// from subdir/file2.w
let bar = new subdir.Bar();
assert(bar.bar() == "bar");

// from subdir/inner/widget.w
let widget2 = new subdir.inner.Widget() as "widget2";
assert(widget2.compute() == 42);

assert(foo.checkWidget(widget2) == 1379);
