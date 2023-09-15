bring "./subdir" as subdir;
bring math;

// from subdir/foo.w
let foo = new subdir.Foo();
assert(subdir.Foo.foo() == "foo");

// from subdir/structs.w
let s = subdir.MyStruct {
  val: 42
};
