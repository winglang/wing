bring cloud;

class A impl cloud.IQueueSetConsumerHandler {
  inflight handle(msg: str) {
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
  method1(x: num): num {
    return x;
  }
  inflight method2(x: str): str {
    return x;
  }
  method3(x: Array<num>): Array<num> {
    return x;
  }
}

// a variable of some interface type can be assigned a class instance that implements it.
interface IAnimal {
  inflight eat(): void;
}

class Dog impl IAnimal {
  inflight eat() {
    return;
  }
}

let z: IAnimal = new Dog();