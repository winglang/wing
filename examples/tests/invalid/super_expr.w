class A {
  method() {
    // Acccess super with no base class (in case of preflight there's actually an implicit base class, `std.Resource`, we need to ignore)
    super.method();
  //^^^^^ "super" can only be used in an instance method or constructor of and inherited class
  }
}

inflight class InflightA {
  method() {
    // Access super with no base class
    super.method();
  //^^^^^ "super" can only be used in an instance method or constructor of and inherited class
  }
}

class B extends A {
  child_method() {
    // Access child method through super
    super.child_method();
        //^^^^^^^^^^^^ Unknown symbol "child_method"

    // Make suer we correctly check `super`'s
    let x: B = super;
             //^^^^^ Expected type to be "B", but got "A" instead
  }

  static static_method() {
    // super doesn't make sense in static context
    super.method();
        //^^^^^ "super" can only be used in an instance method or constructor of and inherited class
  }
}

// super doesn't make sense in global context
let x = super;
      //^^^^^ "super" can only be used in an instance method or constructor of and inherited class