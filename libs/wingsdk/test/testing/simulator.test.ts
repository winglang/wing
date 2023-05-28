import { Construct } from "constructs";
import { test, expect, describe } from "vitest";
import { Bucket, ITestRunnerClient, TestResult } from "../../src/cloud";
import { InflightBindings } from "../../src/core";
import { Test } from "../../src/std";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

describe("run single test", () => {
  test("test not found", async () => {
    const app = new SimApp();
    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    await expect(testRunner.runTest("test_not_found")).rejects.toThrowError(
      'No test found at path "test_not_found"'
    );
  });

  test("happy path", async () => {
    const app = new SimApp();
    makeTest(app, "test", ["console.log('hi');"]);
    app.synth();
    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const result = await testRunner.runTest("root/test");
    expect(sanitizeResult(result)).toMatchSnapshot();
  });

  test("test failure", async () => {
    const app = new SimApp();
    makeTest(app, "test", [
      "console.log('I am about to fail');",
      "throw new Error('test failed');",
    ]);

    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const result = await testRunner.runTest("root/test");
    expect(sanitizeResult(result)).toMatchSnapshot();
  });

  test("not a function", async () => {
    const app = new SimApp();
    Bucket._newBucket(app, "test");

    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    await expect(testRunner.runTest("root/test")).rejects.toThrowError(
      'No test found at path "root/test"'
    );
  });
});

describe("run all tests", () => {
  test("no tests", async () => {
    const app = new SimApp();
    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const tests = await testRunner.listTests();
    expect(tests).toEqual([]);
  });

  test("single test", async () => {
    const app = new SimApp();
    makeTest(app, "test", ["console.log('hi');"]);

    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const results = await runAllTests(testRunner);
    expect(results.map(sanitizeResult)).toMatchSnapshot();
  });

  test("multiple tests", async () => {
    const app = new SimApp();
    makeTest(app, "test", ["console.log('hi');"]);
    makeTest(app, "test:bla", ["console.log('hi');"]);
    makeTest(app, "test:blue", ["console.log('hi');"]);
    Bucket._newBucket(app, "mytestbucket");

    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const results = await runAllTests(testRunner);
    expect(results.length).toEqual(3);
    expect(results.map((r) => r.path).sort()).toStrictEqual([
      "root/test",
      "root/test:bla",
      "root/test:blue",
    ]);
  });
});

test("provides raw tree data", async () => {
  const app = new SimApp();
  makeTest(app, "test", ["console.log('hi');"]);
  const sim = await app.startSimulator();
  const treeData = sim.tree().rawData();
  expect(treeData).toBeDefined();
  expect(treeData).toMatchSnapshot();
});

function makeTest(
  scope: Construct,
  id: string,
  code: string[],
  bindings: InflightBindings = {}
) {
  const handler = Testing.makeHandler(
    scope,
    `${id}.handler`,
    `async handle() { ${code.join("\n")} }`,
    bindings
  );
  return new Test(scope, id, handler, bindings);
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

async function runAllTests(runner: ITestRunnerClient): Promise<TestResult[]> {
  const results: TestResult[] = [];
  for (const testName of await runner.listTests()) {
    results.push(await runner.runTest(testName));
  }
  return results;
}
