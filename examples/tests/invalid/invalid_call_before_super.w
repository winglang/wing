class A {
  a: num;
  new(a: num) { this.a = a; }
  get_a(): num { return this.a; }
  get_one(): num { return 1; }
  get_five(): num { return 5; }
  get_opt(): num? { 
    return nil;
  }
}

class B extends A {
  b:num;
  new() {
    this.b = 3;
//  ^^^^^^^^^^^ 'super()' must be called before accessing 'this' in the constructor of a derived class
    this.hello();
//  ^^^^^^^^^^^^^ 'super()' must be called before accessing 'this' in the constructor of a derived class
    super.get_a();
//  ^^^^^^^^^^^^^^ 'super()' must be called before calling a method of 'super' in the constructor of a derived class
    super(5);
  }
  
  hello(): str { return "hello"; }
}

class C extends A {
  new(x: bool) {
    let var v = 0;
    for z in 0..super.get_five() {
      v += 1;
    }
//  ^ 'super()' must be called before calling a method of 'super' in the constructor of a derived class

    if v == 0 {
      for z in 0..super.get_five() {
        v += 1;
      }
    }
//  ^ 'super()' must be called at the top scope before accessing 'super' in the constructor of a derived class

    if x {
      v = super.get_five();
    }
//  ^ 'super()' must be called at the top scope before accessing 'super' in the constructor of a derived class

    if !x {
      v = this.get_six();
    }
//  ^'super()' must be called at the top scope before accessing 'this' in the constructor of a derived class

    while v < 100 {
      v += super.get_five();
    }
//  ^ 'super()' must be called at the top scope before accessing 'super' in the constructor of a derived class

   super(v);
  }

  get_six(): num { return 6; }
}

class D extends A {
  new() {
    super(5);
    super(5); // Super can only be called once
  }
}

class E extends A {
  new() {
    if true {
      super(5); // Super can't be called from inner scope
    }
  }
}