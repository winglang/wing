bring cloud;

resource A impl cloud.IQueueOnMessageHandler {
  // Error: A does not implement "handle" method of cloud.IQueueOnMessageHandler
  init() {}
}