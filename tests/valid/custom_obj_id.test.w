class Foo { }

let foo1 = new Foo();
let bar2 = new Foo() as "bar2";

assert(foo1.node.id == "Foo");
assert(bar2.node.id == "bar2");
