class A {
  a: num;
  new(a: num) { this.a = a; }
  get_a(): num { return this.a; }
}

class B extends A {
  b:num;
  new() {
    this.b = 3;
//  ^^^^^^^^^^^ This command cannot be executed before calling super()
    super(5);
  }
}

class C extends A {
  new() {
    super.get_a();
//  ^^^^^^^^^^^^^^ This command cannot be executed before calling super()
    super(5);   
  }
}

class D extends A {
    new(x: bool) {
      if x {
        super(1);
//      ^^^^^^^^^ Call to super constructor can only be done from within class constructor
      } else {
        super(2);
//      ^^^^^^^^^ Call to super constructor can only be done from within class constructor
      }
    }
//  ^ Missing super() call in D's constructor
}

class E extends A {
  new() {
    this.hello();
//  ^^^^^^^^^^^^^ This command cannot be executed before calling super()
    super(1);
  }
  hello(): str { return "hello"; }
}