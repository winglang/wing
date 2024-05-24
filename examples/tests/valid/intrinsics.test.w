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
let funcFunction = @inflight("./inline_typescript.ts",
export: "main",
lifts: [
  { obj: example },
  { obj: [1, 2, 3], alias: "numbers" },
]);
let func = new cloud.Function(funcFunction);

let fileThatDoesNotExist: inflight (str): str = @inflight("./inflight_ts/example1.ts");

test "invoke inflight function" {
  funcFunction("message");
  func.invoke("message");
}
