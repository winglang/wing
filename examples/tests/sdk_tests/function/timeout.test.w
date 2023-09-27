
/*\
skip: true
\*/
bring cloud;
bring util;

let c = new cloud.Counter();

let f1 = new cloud.Function(inflight () => {
  // call sleep
  util.sleep(1.5s);
  c.inc();
}, cloud.FunctionProps {timeout: 1s}) as "function with 1s timeout";

// testing the default timeout - should be 1 minute
let f2 = new cloud.Function(inflight () => {
  // call sleep
  util.sleep(30s);
  c.inc();
  util.sleep(31s);
  c.inc();
}) as "function with default timeout";

// doesn't work on sim yet- see issue: https://github.com/winglang/wing/issues/1980
new std.Test(inflight () => {
  let var e = "";
  try {
    f1.invoke("");
  } catch error {
    e = error;
  }

  if (["tf-aws", "awscdk"].contains(util.env("WING_TARGET"))) {
    assert(e.contains("Task timed out after"));
  }

  if (util.env("WING_TARGET") != "sim") {
    assert(c.peek() == 0);
  }

  try {
    f2.invoke("");
  } catch error {
    e = error;
  }

  if (["tf-aws", "awscdk"].contains(util.env("WING_TARGET"))) {
    assert(e.contains("Task timed out after"));
  }

  if (util.env("WING_TARGET") != "sim") {
    assert(c.peek() == 1);
  }
 
}, std.TestProps {timeout: 2m}) as "timeout";
