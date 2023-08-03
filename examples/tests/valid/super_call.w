class A {
  message: str;

  init() {
    this.message = "A message from your ancestor";
  }
}

class B extends A {
  description(): str {
    return "B";
  }
}

class C extends B {
  description(): str {
    return "C extends ${super.description()}";
  }
}

// This class has no `description` method, so it inherits the one from `B`.
class D extends C {
}

class E extends D {
  description(): str {
    return "E extends ${super.description()}";
  }
}

let e = new E();
// Make sure super calls work and skip anything in the inheritance chain that doesn't have the method
assert(e.description() == "E extends C extends B");

inflight class InflightA {
  description(): str {
    return "InflightA";
  }
}

// Test super calls on inflight classes
inflight class InflightB extends InflightA {
  description(): str {
    return "InflightB extends ${super.description()}";
  }
}

test "super call inflight" {
  let b = new InflightB();
  assert(b.description() == "InflightB extends InflightA");
}

// Test correct binding when calling a super method
bring cloud;
let b = new cloud.Bucket();
class BaseClass {
  inflight do(): str {
    return b.get("k"); // BaseClass class required read acceess to b
  }
}

class ExtendedClass extends BaseClass {
  inflight do(): str {
    b.put("k", "value"); // This should require write access to b
    return super.do(); // We expect to add binding permissions based on what `super.do()` requires (read)
  }
}

let extended = new ExtendedClass();
test "super call sets binding permissions" {
  assert(extended.do() == "value");
}