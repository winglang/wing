class B {}
let b = new B();
log("hello {b}");
// ^ Error: expected type to be stringable 

let x: str? = nil;
log("{x}");
// ^ Error: expected type to be stringable
