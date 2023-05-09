class C1 {
   x:num;
// ^ "x" is not initialized
}

class C2 {}
new C2(1);
// ^^^^^^^^^ Expected 0 arguments but got 1 when instantiating "C2"

class C3 {
  x: num;
  init() {
    this.x = "Hi";
  //         ^^^^ Expected type to be "num", but got "str" instead
  }
}