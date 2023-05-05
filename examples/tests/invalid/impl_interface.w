bring cloud;

class A impl cloud.IQueueAddConsumerHandler {
  // Error: A does not implement "handle" method of cloud.IQueueAddConsumerHandler
}

class B impl cloud.IQueueAddConsumerHandler {
  inflight handle(x: num) {
    // Error: Expected type to be "inflight (str): void", but got "inflight (num): void" instead
    return;
  }
}

class C impl cloud.Bucket {
              // ^^^^^^^^^^^ Error: cloud.Bucket is a resource, not an interface
}

interface I1 {
  method_1(x: num): num;
}

interface I2 extends I1 {
  inflight method_2(x: str): str;
}

interface I3 extends I2 {
  method_3(x: Array<num>): Array<num>;
}

class r impl I3 {
      // ^ Resource "r" does not implement method "method_1" of interface "I3"
      // ^ Resource "r" does not implement method "method_2" of interface "I3"
      // ^ Resource "r" does not implement method "method_3" of interface "I3"
}