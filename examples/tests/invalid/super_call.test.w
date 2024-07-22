class A {
  method() {
    // Acccess super with no base class (in case of preflight there's actually an implicit base class, `std.Resource`, we need to ignore)
    super.method();
        //^^^^^^ Cannot call super method because class A has no parent
  }
}

inflight class InflightA {
  method() {
    // Access super with no base class
    super.method();
        //^^^^^^ Cannot call super method because class A has no parent
  }
}

class B extends A {
  child_method() {
    // Access child method through super
    super.child_method();
        //^^^^^^^^^^^^ super class "A" does not have a method named "child_method"
  }

  static static_method() {
    // super doesn't make sense in static context
    super.method();
        //^^^^^ Cannot call super method inside of a static method
  }
}

// super doesn't make sense in global context
super.do();
    //^^ "super" can only be used inside of classes


// Verify correct error message when inflight closure tries to access super (this isn't suported yet see: https://github.com/winglang/wing/issues/3474)
// Once it is, this test should be moved to "valid"
class BaseClass {
  inflight m1(): str {
      return "base inflight m1";
  }
}

bring cloud;
let q = new cloud.Queue();
class ExtendedClass extends BaseClass {
  inflight m1(): str {
    return "extended inflight m1";
  }
  get_func(): cloud.Function {
    let inflight_closure = inflight (s: Json?): Json? => {
      return "this: {this.m1()}, super: {super.m1()}";
                                               //^^ `super` calls inside inflight closures not supported yet, see: https://github.com/winglang/wing/issues/3474
    };
    return new cloud.Function(inflight_closure);
  }
}
// TODO: uncomment and move to valid tests once this: https://github.com/winglang/wing/issues/3474 is fixed
// let y = new ExtendedClass().get_func();
// test "inflight closure accesses super" {
//   assert(y.invoke("") == "this: extended inflight m1, super: base inflight m1");
// }
