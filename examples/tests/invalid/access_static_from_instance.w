class Foo {
  instance_field: num;

  static f: num;

  static m() {
    this.instance_field = 1; // Can't access instance fields from static methods
    this.f = 1; // Can't access static fields through `this`
  }


  init() {
    this.instance_field = 1;
  }
}

let foo = new Foo();

foo.f; // Can't access static fields through instances
foo.m(); // Can't access static methods through instances