class Foo { }

let foo1 = new Foo();
let bar2 = new Foo() as "bar2";

assert(nodeof(foo1).id == "Foo");
assert(nodeof(bar2).id == "bar2");
