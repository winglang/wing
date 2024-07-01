bring cloud;

let topic = new cloud.Topic();

topic.onMessage(inflight (message: str) => {
    log("Message received: " + message);
});
