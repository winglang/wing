bring fs;
bring expect;
bring cloud;
bring util;
bring "./subdir/bar.w" as bar;

// @dirname

let path = "SHOULD_IGNORE";
let filename = "intrinsics.test.w";

let currentFile = fs.join(@dirname, filename);
expect.equal(filename, fs.basename(currentFile));
expect.equal(@dirname, fs.dirname(currentFile));
expect.equal(bar.Bar.getSubdir(), fs.join(@dirname, "subdir"));

// @inflight

let counter = new cloud.Counter();
pub class Example {
  pub inflight getMessage(): str {
    return "message";
  }
  pub inflight done() {
    counter.inc();
  }
}
let example = new Example();
let queue = new cloud.Queue();

queue.setConsumer(@inflight("./inline_typescript.ts",
  lifts: [{ obj: example }],
));

test "x" {
  queue.push("message");
  util.waitUntil(inflight () => {
    return counter.peek() > 0;
  });
}