bring cloud;

class QueueSim {
  rawMessages: std.SharedState;

  init() {
    this.rawMessages = new std.SharedState(MutArray<str>[]);
  }

  inflight push(message: str) {
    let rawMessages = this.rawMessages.get();
    rawMessages.push(message);
  }

  inflight pop(): str {
    let rawMessages = this.rawMessages.get();
    return rawMessages.pop();
  }
}

let queue = new QueueSim();

let pusher = new cloud.Function(inflight () => {
  queue.push("hello");
}) as "pusher";
let popper = new cloud.Function(inflight (): str => {
  return queue.pop();
}) as "popper";

test "push and pop from different functions" {
  pusher.invoke("");
  assert(popper.invoke("") == "hello");
}
