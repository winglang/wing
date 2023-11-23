bring cloud;
bring util;

let q = new cloud.Queue();

new std.Test(inflight () => {
  let obj = Json {
    k1: 1,
    k2: "hello",
    k3: true,
    k4: {
        k1: [1, "a", true, {} ]
    }
  };

  try {
    q.push("");
    assert(false);
  } catch e {
    assert(e.contains("Empty messages are not allowed"));
  }

  try {
    q.push("Foo", "");
    assert(false);
  } catch e {
    assert(e.contains("Empty messages are not allowed"));
  }

  q.push("Foo");
  
  assert(util.waitUntil((): bool => {
    return q.approxSize() == 1;
  }));

  q.pop();
  q.push("Bar", "Baz");

  assert(util.waitUntil((): bool => {
    return q.approxSize() == 2;
  }));

  q.purge(); // the message deletion process takes up to 60 seconds. (https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/classes/purgequeuecommand.html)
  util.sleep(1m);
  q.push("123", "\r", "{obj}");

  assert(util.waitUntil((): bool => {
    return q.approxSize() == 3;
  }));
}, timeout: 3m) as "push";
