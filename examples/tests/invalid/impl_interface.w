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
