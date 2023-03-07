bring cloud;

resource A impl cloud.IQueueOnMessageHandler {
  init() {}
  inflight handle(msg: str) {
    // do something
  }
}

resource B impl cloud.IQueueOnMessageHandler {
  init() {}
  inflight handle(msg: str): num {} // its okay to return a more specific type
}
