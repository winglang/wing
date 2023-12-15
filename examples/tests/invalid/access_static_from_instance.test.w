class Foo {
  instanceField: num;

  pub static f: num;

  pub static m() {
    this.instanceField = 1; // Can't access instance fields from static methods
    this.f = 1; // Can't access static fields through `this`
  }


  new() {
    this.instanceField = 1;
  }
}

let foo = new Foo();

foo.f; // Can't access static fields through instances
foo.m(); // Can't access static methods through instances