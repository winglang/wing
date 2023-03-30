bring cloud;

resource A impl cloud.IQueueOnMessageHandler {
  // Error: A does not implement "handle" method of cloud.IQueueOnMessageHandler
  init() {}
}

resource B impl cloud.IQueueOnMessageHandler {
  init() {}
  inflight handle(x: num) {
    // Error: Expected type to be "inflight (str): void", but got "inflight (num): void" instead
    return;
  }
}

resource C impl cloud.Bucket {
              // ^^^^^^^^^^^ Error: cloud.Bucket is a resource, not an interface
  init() {}
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

resource r impl I3 {
  init() {}
}