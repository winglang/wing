bring cloud;

resource A impl cloud.IQueueOnMessageHandler {
  init() {}
  inflight handle(msg: str) {
    return;
  }
}

let x: cloud.IQueueOnMessageHandler = new A();

let y = inflight () => {
  x.handle("hello world!");
};

interface I1 {
  method_1(x: num): num;
}

interface I2 extends I1 {
  inflight method_2(x: str): str;
}

interface I3 extends I2 {
  method_3(x: Array<num>): Array<num>;
}

/* TODO: uncomment after we fix 
resource r impl I3 {
  init() {}
  method_1(x: num): num {
    return x;
  }
  inflight method_2(x: str): str {
    return x;
  }
  method_3(x: Array<num>): Array<num> {
    return x;
  }
}
*/