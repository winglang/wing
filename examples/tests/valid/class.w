// class without init
class C1 {}
new C1();

// class with init and no arguments
class C2 {
  x: num;
  init() {
    this.x = 1;
  }
}
let c2 = new C2();
assert(c2.x == 1);

// class with init and arguments
class C3 {
  x: num;
  y: num;
  init(a: num, b: num) {
    this.x = a;
    if true {
      this.y = b;
    }
  }
}
let c3 = new C3(1, 2);
assert(c3.x == 1);
assert(c3.y == 2);

// resource with static method and no init
class C4 {
  inflight var y: num;
  static m():num {return 1;}
}
assert(C4.m() == 1);