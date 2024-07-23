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

let echo: inflight (str): str = @inflight("./inflight_ts/example1.ts");

let example = new Example();
let funcFunction = @inflight("./inflight_ts/example2.ts",
  export: "main",
  lifts: [
    { obj: example },
    { obj: example, alias: "exampleCopy", ops: ["getMessage"]},
    { obj: [1, 2, 3], alias: "numbers" },
  ],
);
let func = new cloud.Function(funcFunction);

let defaultMessage: inflight (): str = @inflight("./inflight_ts/example3.ts",
  // Intentionally use { } instead of struct expansion
  { lifts: [{ obj: example }] }
);


test "invoke default function" {
  expect.equal(echo("message"), "message");
}

test "invoke inflight function" {
  funcFunction("message");
  func.invoke("message");
}

test "invoke default with lift" {
  expect.equal(defaultMessage(), "message");
}
