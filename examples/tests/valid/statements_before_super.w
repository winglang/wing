class A {
  a: num;
  new(a: num) {
    this.a = a;
  }
  get():num {return this.a;}
}

class B extends A {
  new() {
    let x = 3 + 5;
    super(x);
  }
}
