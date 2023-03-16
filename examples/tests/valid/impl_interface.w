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
