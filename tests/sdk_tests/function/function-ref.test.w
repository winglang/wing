bring cloud;
bring aws;
bring util;

// a really cool way to test a "ref" resource: basically, we define a cloud.Function
// and then we define a `FunctionRef` that references it's ARN. nice, ha?

let c = new cloud.Counter();
let f = new cloud.Function(inflight () => {
  c.inc();
});

// this will only work if we are testing on tf-aws
if let arn = aws.Function.from(f)?.functionArn {
  let fref = new aws.FunctionRef(arn);

  test "can invoke a function (FunctionRef)" {
    fref.invoke("");
    util.waitUntil(() => {
      return c.peek() == 1;
    });
  }
}

if util.env("WING_TARGET") == "sim" {
  bring expect;

  let dummyArn = "arn:aws:lambda:us-east-1:111111111111:function:Function-11111111";
  let fr = new aws.FunctionRef(dummyArn);

  test "functionArn returns the arn" {
    expect.equal(dummyArn, fr.functionArn);
  }

  test "invoke() sends a request to aws, fails because we are using a dummy function" {
    let var err = false;
    try {
      fr.invoke("");
    } catch e {
      err = true;
    }

    assert(err);
  }
}
