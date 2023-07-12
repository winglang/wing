
/*\
skip: true
\*/
bring cloud;
bring util;

let c = new cloud.Counter();

let f = new cloud.Function(inflight () => {
  // call sleep
  util.sleep(1.5s);
  c.inc();
}, cloud.FunctionProps {timeout: 1s});

// doesn't work on sim yet- see issue: https://github.com/winglang/wing/issues/1980
test "timeout" {
  let var e = "";
  try {
    f.invoke("");
  } catch error {
    e = error;
  }

  if (util.env("WING_TARGET") == "tf-aws") {
    assert(e.contains("Task timed out after"));
  }

  if (util.env("WING_TARGET") != "sim") {
    assert(c.peek() == 0);
  }
}
