bring cloud;
bring "jsii-fixture" as jsii_fixture;

class A impl cloud.IQueueSetConsumerHandler {
  pub inflight handle(msg: str) {
    return;
  }
}

let x: cloud.IQueueSetConsumerHandler = new A();

let y = inflight () => {
  x.handle("hello world!");
};

interface I1 {
  method1(x: num): num;
}

interface I2 extends I1 {
  inflight method2(x: str): str;
}

interface I3 extends I2 {
  method3(x: Array<num>): Array<num>;
}

class r impl I3 {
  pub method1(x: num): num {
    return x;
  }
  pub inflight method2(x: str): str {
    return x;
  }
  pub method3(x: Array<num>): Array<num> {
    return x;
  }
}

// create an instance of I3 and make sure we can call the methods
let i3 = (): I3 => {
  return new r();
}();
assert(i3.method1(1) == 1);
test "can call inherited inflight interface method" {
  assert(i3.method2("hello") == "hello");
}
assert(i3.method3([1, 2, 3]) == [1, 2, 3]);

// a variable of some interface type can be assigned a class instance that implements it.
interface IAnimal {
  inflight eat(): void;
}

class Dog impl IAnimal {
  pub inflight eat() {
    return;
  }
}

let z: IAnimal = new Dog();

// base class is checked for implemention of interface
class Terrier extends Dog {
  pub inflight eat() {
    return;
  }
}

let w: IAnimal = new Terrier();

inflight interface IDog {
  bark(): void;
} // All methods should be implicitly inflight

let f = inflight () => {
  class MyDog impl IDog {
    pub bark(): void {
      log("woof");
    }
  } // Because MyIf can only be used inflight
  let dog = new MyDog();
  dog.bark();
};

// Extend a JSII interface in a preflight interface
interface ExtendJsiiIface extends jsii_fixture.ISomeInterface {
  inflight inflight_method(): void;
}

class ImplementJsiiIface impl ExtendJsiiIface {
  pub method() {
    return;
  }
  pub inflight inflight_method() {
    return;
  }
}

// Implement an inflight interface in a preflight class
inflight interface IInflight {
  inflight_method(): void;
}
class ImplementInflightIfaceInPreflightClass impl IInflight {
  pub inflight inflight_method() {
    return;
  }
}

// Extend inflight interface in an inflight interface defined preflight
interface InflightIfaceDefinedPreflight extends IInflight {}

// Implement an inflight interface in an inflight class
inflight class ImplInflightIfaceInInflightClass impl IInflight {
  pub inflight_method() {
    return;
  }
}

// Implement an inflight interface in a preflight class
class ImplInflightIfaceInPreflightClass impl IInflight {
  pub inflight inflight_method() {
    return;
  }
}

// Implement preflight interface in an preflight class
interface IPreflight {
  method(): void;
}
class ImplPreflightIfaceInPreflightClass impl IPreflight {
  pub method() {
    return;
  }
}
