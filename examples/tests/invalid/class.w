bring cloud;

class C1 {
   x:num;
// ^ Preflight field "x" is not initialized
}

class C2 {}
new C2(1);
//^^^^^^^ Expected 0 argument(s) but got 1

class C9 {}
new C4(token: "1");
//^^^^^^^ Expected 0 named argument(s)"

class C10 {
  init(foo: str)
}
new C10(); 
//^^^^^^^ Expected 1 required positional arguments but got 0 when instantiating "C5"

new C10(foo: "bar"); 
//^^^^^^^ Expected 1 positional argument(s) but got 0

new C10("hello", foo: "bar"); 
//^^^^^^^ class C5 does not expect any named argument

class C3 {
  x: num;
  init() {
    this.x = "Hi";
           //^^^^ Expected type to be "num", but got "str" instead
  }
}

class C4 {
  inflight var x: num;
             //^ Inflight field "x" is not initialized
  inflight y: str;
         //^ Inflight field "y" is not initialized
}

class C5 {
  inflight x: num;
         //^ Inflight field "x" is not initialized
  inflight init() {}
}

class C6 {
  inflight x: num;
         //^ Inflight field "x" is not initialized
  y: num;
//^ Preflight field "y" is not initialized  
  
  init() {
    this.x = 1;
       //^ "x" cannot be initialized in the Preflight initializer
  }

  inflight init() {
    this.y = 1;
       //^ "y" cannot be initialized in the Inflight initializer
  }
}

let x = 5;

class C7 extends x {
               //^ Expected 'x' to be a type but it's a variable
}

struct S1 {}

class C8 extends S1 {
               //^^ Preflight class C8's parent is not a class
}