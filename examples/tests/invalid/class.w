class C1 {
   x:num;
// ^ "x" is not initialized
}

class C2 {}
new C2(1);
// ^^^^^^^^^ Expected 0 arguments but got 1 when instantiating "C2"

class C4 {}
new C4(token: "1");
// ^^^^^^^^^ Expected 0 named arguments when instantiating \\"C4\\"

class C5 {
  init(foo: str)
}
new C5(); 
// ^^^^^^^^^ Expected 1 required positional arguments but got 0 when instantiating "C5"

new C5(foo: "bar"); 
// ^^^^^^^^^ Expected 1 required positional arguments but got 0 when instantiating "C5"

new C5("hello", foo: "bar"); 
// ^^^^^^^^^ class C5 does not expect any named argument

class C3 {
  x: num;
  init() {
    this.x = "Hi";
  //         ^^^^ Expected type to be "num", but got "str" instead
  }
}