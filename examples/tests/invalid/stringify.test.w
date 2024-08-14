class B {}
let b = new B();
struct Foo {
 bar: B;
 baz: str;
}

let foo: Foo = {bar: b, baz: "hello"};

log("hello {b}");
// ^ Expected type to be "stringable", but got "B" instead 

let x: str? = nil;
log("{x}");
// ^ Expected type to be "stringable", but got "str?" instead

log(b);
// ^ Expected type to be "stringable", but got "B" instead

log(foo);
// ^ Expected type to be "stringable", but got "Foo" instead
