class A {
  a: num;
  new(a: num) {
    this.a = a;
  }
}

class B extends A {
  new() {
    let x = 3 + 5;
    super(x);
  }
}
