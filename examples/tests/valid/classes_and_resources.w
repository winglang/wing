// class without init
class C1 {}
new C1();

// class with init and no arguments
class C2 {
  x:num;
  init() {
    this.x = 1;
  }
}
new C2();

// class with init and arguments
class C3 {
  x: num;
  y: num;
  init(a: num, b: num) {
    this.x = a;
    this.y = b;
  }
}
new C3(1, 2);

// resource without init
resource R1 {}
new R1();

// resource with static method and no init
resource R2 {
  static m():num {return 1;}
}
assert(R2.m() == 1);
