bring cloud;
bring util;

class Queue {
  data: cloud.Bucket;
  var consumer: inflight (str): void;
  new() {
    this.data = new cloud.Bucket();
    this.consumer = inflight () => {
      log("dummy code");
    };
    this.data.onCreate(inflight (key: str) => {
      this.consumer(key);
    });
  }

  pub setConsumer(fn: inflight (str): void) {
    this.consumer = fn;
  }

  pub inflight push(m: str) {
    this.data.put(m, "empty");
  }
}

let q = new Queue();
let c = new cloud.Counter();
q.setConsumer(inflight (m: str) => {
  log("received {m}");
  c.inc();
});

test "hi" {
  q.push("message1");
  util.waitUntil(inflight () => {
    return c.peek() > 0;
  });
}

