class A {
  a: num;
  new(a: num) {
    this.a = a;
  }
  get():num {return this.a;}
}

class B extends A {
  new() {
    super.get();
//  ^^^^^^^^^^^^ super() call should be made before a parent class method
    super(5);
  }
}
