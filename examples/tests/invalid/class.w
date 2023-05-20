bring cloud;

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

class C4 {
  inflight var x: num;
//             ^ Inflight field "x" is not initialized
  inflight y: str;
//         ^ Inflight field "y" is not initialized
}

class C5 {
  inflight x: num;
//         ^ Inflight field "x" is not initialized
  inflight init() {}
}

class C6 {
  inflight x: num;
//         ^ Inflight field "x" is not initialized
  y: num;
//    ^ "y" is not initialized  
  
  init() {
    this.x = 1;
//       ^ "x" cannot be initialized in the preflight initializer
  }

  inflight init() {
    this.y = 1;
//       ^ "y" cannot be initialized in the inflight initializer
  }
}