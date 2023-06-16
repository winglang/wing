bring cloud;

class A impl cloud.IQueueSetConsumerHandler {
  // Error: A does not implement "handle" method of cloud.IQueueSetConsumerHandler
}

class B impl cloud.IQueueSetConsumerHandler {
  inflight handle(x: num) {
    // Error: Expected type to be "inflight (str): void", but got "inflight (num): void" instead
    return;
  }
}

class C impl cloud.Bucket {
              // ^^^^^^^^^^^ Error: cloud.Bucket is a resource, not an interface
}

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
      // ^ Resource "r" does not implement method "method1" of interface "I3"
      // ^ Resource "r" does not implement method "method2" of interface "I3"
      // ^ Resource "r" does not implement method "method3" of interface "I3"
}