bring cloud;

resource A impl cloud.IQueueOnMessageHandler {
  init() {}
  inflight handle(msg: str) {
    return;
  }
}

resource B impl cloud.IQueueOnMessageHandler {
  init() {}
  inflight handle(msg: str): num { // its okay to return a more specific type
    return 5;
  }
}
