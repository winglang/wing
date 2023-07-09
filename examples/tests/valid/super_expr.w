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

  get_super(): B {
    return super;
  }
}

// This class has no `description` method, so it inherits the one from `B`.
class D extends C {
}

class E extends D {
  description(): str {
    return "E extends ${super.description()}";
  }

  get_message(): str {
    // Access a field through super
    return super.message;
  }
}

let e = new E();
// Make sure super calls work and skip anything in the inheritance chain that doesn't have the method
assert(e.description() == "E extends C extends B");

// Make sure a variable assigned with super calls the correct method
let as_b = e.get_super();
assert(as_b.description() == "B");

// Super field access
assert(e.get_message() == "A message from your ancestor");

// inflight class InflightBaseClass {
//     method() {
//         log("inflight base");
//     }
//     m1() {
//         log("base inflight m1");
//     }
// }

// inflight class InflightClass extends InflightBaseClass {
//     m1() {
//         log("extended inflight m1");
//     }
//     method() {
//         log("inflight extended");
//         let inflight_closure = inflight () => {
//             super.method();
//         };
//         super.m1();
//         this.m1();
//         inflight_closure();
//     }
// }

class BaseClass {
    method() {
        log("inflight base");
    }
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
        log("inflight extended");
        let inflight_closure = inflight (s:str): str => {
            //return this.m1();
            return this.m1() + " -- " + super.m1();
        };
        return new cloud.Function(inflight_closure);
    }
}

let x = new ExtendedClass();
let y = x.get_func();
test "inflight closure accesses super" {
    //let c = new InflightClass();
    //c.method();
    log(y.invoke("hello"));
}