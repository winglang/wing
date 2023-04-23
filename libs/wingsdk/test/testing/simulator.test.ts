import { Construct } from "constructs";
import { test, expect, describe } from "vitest";
import { Bucket, TestResult } from "../../src/cloud";
import { Code, InflightBindings } from "../../src/core";
import { Function } from "../../src/target-sim";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

describe("run single test", () => {
  test("test not found", async () => {
    const app = new SimApp();
    const sim = await app.startSimulator();
    await expect(sim.runTest("test_not_found")).rejects.toThrowError(
      'No test found at path "test_not_found"'
    );
  });

  test("happy path", async () => {
    const app = new SimApp();
    new Test(app, "test", ["console.log('hi');"]);
    app.synth();
    const sim = await app.startSimulator();
    const result = await sim.runTest("root/test");
    expect(sanitizeResult(result)).toMatchSnapshot();
  });

  test("test failure", async () => {
    const app = new SimApp();
    new Test(app, "test", [
      "console.log('I am about to fail');",
      "throw new Error('test failed');",
    ]);

    const sim = await app.startSimulator();
    const result = await sim.runTest("root/test");
    expect(sanitizeResult(result)).toMatchSnapshot();
  });

  test("not a function", async () => {
    const app = new SimApp();
    Bucket._newBucket(app, "test");

    const sim = await app.startSimulator();
    await expect(sim.runTest("root/test")).rejects.toThrowError(
      'No test found at path "root/test"'
    );
  });
});

describe("run all tests", () => {
  test("no tests", async () => {
    const app = new SimApp();
    const sim = await app.startSimulator();
    const result = await sim.runAllTests();
    expect(result).toEqual([]);
  });

  test("single test", async () => {
    const app = new SimApp();
    new Test(app, "test", ["console.log('hi');"]);

    const sim = await app.startSimulator();
    const results = await sim.runAllTests();
    expect(results.map(sanitizeResult)).toMatchSnapshot();
  });

  test("multiple tests", async () => {
    const app = new SimApp();
    new Test(app, "test", ["console.log('hi');"]);
    new Test(app, "test:bla", ["console.log('hi');"]);
    new Test(app, "test:blue", ["console.log('hi');"]);
    Bucket._newBucket(app, "mytestbucket");

    const sim = await app.startSimulator();
    const results = await sim.runAllTests();
    expect(results.length).toEqual(3);
    expect(results.map((r) => r.path).sort()).toStrictEqual([
      "root/test",
      "root/test:bla",
      "root/test:blue",
    ]);
  });

  test("each test runs in a separate simulator instance", async () => {
    const app = new SimApp();
    const bucket = Bucket._newBucket(app, "bucket");

    new Test(
      app,
      "test:bucket1",
      [
        "await this.bucket.put('hello1', 'world');",
        "await this.bucket.put('hello2', 'world');",
        "await this.bucket.put('hello3', 'world');",
        "await this.bucket.put('hello4', 'world');",
        "await this.bucket.put('hello5', 'world');",
        "const keys = await this.bucket.list();",
        "const assert = condition => { if (!condition) throw new Error('assertion failed'); };",
        "assert(keys.length === 5);",
      ],
      {
        bucket: {
          obj: bucket,
          ops: ["put"],
        },
      }
    );

    new Test(
      app,
      "test:bucket2",
      [
        "await this.bucket.put('hello', 'world');",
        "const keys = await this.bucket.list();",
        "const assert = condition => { if (!condition) throw new Error('assertion failed'); };",
        "assert(keys.length === 1);",
      ],
      {
        bucket: {
          obj: bucket,
          ops: ["put", "list"],
        },
      }
    );

    const sim = await app.startSimulator();
    const results = await sim.runAllTests();

    // expect no failtures
    expect(results.filter((r) => !r.pass)).toEqual([]);
  });
});

test("provides raw tree data", async () => {
  const app = new SimApp();
  new Test(app, "test", ["console.log('hi');"]);
  const sim = await app.startSimulator();
  const treeData = sim.tree().rawData();
  expect(treeData).toBeDefined();
  expect(treeData).toMatchSnapshot();
});

class Test extends Function {
  constructor(
    scope: Construct,
    id: string,
    code: string[],
    bindings: InflightBindings = {}
  ) {
    super(
      scope,
      id,
      Testing.makeHandler(
        scope,
        `${id}.handler`,
        `async handle() { ${code.join("\n")} }`,
        bindings
      )
    );
  }

  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }
}

function removePathsFromTraceLine(line?: string) {
  if (!line) {
    return undefined;
  }

  // replace any paths in the log line with "foo/bar.ts" instead of "/Users/eladb/code/wing2/libs/wingsdk/src/target-sim/foo/bar.ts"
  if (line.includes("/")) {
    return "<sanitized>";
  }

  return line;
}

function sanitizeResult(result: TestResult): TestResult {
  let error: string | undefined;
  if (result.error) {
    let lines = result.error.split("\n").map(removePathsFromTraceLine);

    // remove all lines after "at Simulator.runTest" since they are platform-dependent
    let lastLine = lines.findIndex((line) =>
      line?.includes("Simulator.runTest")
    );
    if (lastLine !== -1) {
      lines = lines.slice(0, lastLine + 1);
    }

    error = lines.join("\n");
  }

  return {
    path: result.path,
    pass: result.pass,
    error,
    traces: result.traces.map((trace) => ({
      ...trace,
      timestamp: "<TIMESTAMP>",
    })),
  };
}
