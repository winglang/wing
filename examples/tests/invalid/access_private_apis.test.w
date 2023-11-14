bring "./subdir2" as subdir2;

new subdir2.MyPrivateClass();
// error: Class "MyPrivateClass" is private

new subdir2.inner.MyOtherPrivateClass();
// error: Class "MyOtherPrivateClass" is private
// TODO: error: namespace "inner" is private
// (because it has no public API elements)

class A impl subdir2.MyPrivateInterface {}
// error: Interface "MyPrivateInterface" is private

let s = subdir2.MyPrivateStruct {};
// error: Struct "MyPrivateStruct" is private

let e = subdir2.MyPrivateEnum.A;
// error: Enum "MyPrivateEnum" is private
