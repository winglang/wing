inflight class Foo {}

new Foo();

// ^^^^^^^^^ Cannot create inflight class "Foo" in preflight phase
class PreflightClass {
  new() {
    new Foo();
//  ^^^^^^^^^ Cannot create inflight class "Foo" in preflight phase
  }

  preflightMethod() {
    new Foo();
//  ^^^^^^^^^ Cannot create inflight class "Foo" in preflight phase
  }
}

inflight () => {
  new PreflightClass();
//    ^^^^^^^^^^^^^^^^^^^^ Cannot create preflight class "PreflightClass" in inflight phase
};