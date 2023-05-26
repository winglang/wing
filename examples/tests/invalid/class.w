bring cloud;

class C1 {
   x:num;
// ^ Preflight field "x" is not initialized
}

class C2 {}
new C2(1);
//^^^^^^^ Expected 0 arguments but got 1 when instantiating "C2"

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