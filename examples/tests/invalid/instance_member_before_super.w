class A {
  a: num;
  new(a: num) {
    this.a = a;
  }
  get():num {return this.a;}
}

class B extends A {
  b:num;
  new() {
    this.b = 3;
//  ^^^^^^^^^^^ super() call should be made before an instance member is used
    super(5);
  }
}
