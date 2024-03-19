bring cloud;
bring aws;
bring util;

// a really cool way to test a "ref" resource: basically, we define a cloud.Queue
// and then we define a `QueueRef` that references it's ARN. nice, ha?

let c = new cloud.Counter();
let q = new cloud.Queue();

q.setConsumer(inflight () => {
  c.inc();
});

// this will only work if we are testing on tf-aws
if let arn = aws.Queue.from(q)?.queueArn {
  let qref = new aws.QueueRef(arn);

  new cloud.Function(inflight () => {
    qref.push("hello");
    qref.pop();
  });

  test "can push to an external queue (QueueRef)" {
    qref.push("m1");
    qref.push("m2");
    qref.push("m3");
    util.waitUntil(() => {
      return c.peek() == 3;
    });
  }
}

if util.env("WING_TARGET") == "sim" {
  bring expect;

  let dummyArn = "arn:aws:sqs:us-east-1:111111111111:Queue-11111111";
  let qr = new aws.QueueRef(dummyArn);

  test "queueArn returns the arn" {
    expect.equal(dummyArn, qr.queueArn);
  }

  test "push() sends a request to aws, fails because we are using a dummy queue" {
    let var err = false;
    try {
      qr.push("foo");
    } catch e {
      err = true;
      assert(e.contains("QueueDoesNotExist"));
    }

    assert(err);
  }
}