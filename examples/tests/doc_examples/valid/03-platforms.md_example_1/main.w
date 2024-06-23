// This file was auto generated from an example found in: 03-platforms.md_example_1
// Example metadata: {"valid":true}
bring cloud;
bring util;

let invocationCounter = new cloud.Counter();
let queue = new cloud.Queue();

queue.setConsumer(inflight (msg: str) => {
  invocationCounter.inc();
});

new cloud.Function(inflight ()=> { 
  // push a message to queue
  queue.push("m");
  // sleep according to target 
  if util.env("WING_TARGET") == "sim" {
    log("Running on Simulator, sleeping for 1s");
    util.sleep(1s);
  } else {
    log("Running on the cloud, sleeping for 30s");
    util.sleep(30s);
  }
  log("Function invoked {invocationCounter.peek()} times");
});

