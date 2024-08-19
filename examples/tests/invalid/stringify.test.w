class B {}
let b = new B();
struct Foo {
 bar: B;
 baz: str;
}

let foo: Foo = {bar: b, baz: "hello"};

let x = 42;

log("hello {b}");
// ^ Expected type to be "stringable", but got "B" instead 

log("value: " + x);
// ^ Binary operator '+' cannot be applied to operands of type 'str' and 'num'

log(x + " is the value");
// ^ Binary operator '+' cannot be applied to operands of type 'str' and 'num'

let x: str? = nil;
log("{x}");
// ^ Expected type to be "stringable", but got "str?" instead

log(b);
// ^ Expected type to be "stringable", but got "B" instead

log(foo);
// ^ Expected type to be "stringable", but got "Foo" instead
