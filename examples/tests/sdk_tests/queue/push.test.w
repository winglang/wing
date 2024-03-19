bring cloud;
bring util;

let q = new cloud.Queue();

new std.Test(inflight () => {
  let obj = {
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
  
  util.waitUntil((): bool => {
    return q.approxSize() == 1;
  });

  q.pop();
  q.push("Bar", "Baz");

  util.waitUntil(() => {
    return q.approxSize() == 2;
  });

  q.purge(); 
  if util.env("WING_TARGET") != "sim" {
    // In a real cloud, purging is expensive so we should wait a minute regardless of .approxSize()
    // e.g. See AWS docs for queue purging (https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/classes/purgequeuecommand.html)
    util.sleep(1m);
  }

  util.waitUntil(() => {
    return q.approxSize() == 0;
  });

  q.push("123", "\r", "{obj}");

  util.waitUntil(() => {
    return q.approxSize() == 3;
  });
}, timeout: 3m) as "push";
