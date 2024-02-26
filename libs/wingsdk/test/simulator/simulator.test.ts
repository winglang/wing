import { Construct } from "constructs";
import { test, expect, describe } from "vitest";
import { Bucket } from "../../src/cloud";
import { InflightBindings } from "../../src/core";
import { Testing } from "../../src/simulator";
import { ITestRunnerClient, Test, TestResult } from "../../src/std";
import { SimApp } from "../sim-app";

describe("run single test", () => {
  test("test not found", async () => {
    const app = new SimApp({ isTestEnvironment: true });
    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    await expect(testRunner.runTest("test_not_found")).rejects.toThrowError(
      'No test found at path "test_not_found"'
    );
    await sim.stop();
  });

  test("happy path", async () => {
    const app = new SimApp({ isTestEnvironment: true });
    makeTest(app, "test", ["console.log('hi');"]);
    app.synth();
    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const result = await testRunner.runTest("root/test");
    await sim.stop();
    expect(sanitizeResult(result)).toMatchSnapshot();
  });

  test("test failure", async () => {
    const app = new SimApp({ isTestEnvironment: true });
    makeTest(app, "test", [
      "console.log('I am about to fail');",
      "throw new Error('test failed');",
    ]);

    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const result = await testRunner.runTest("root/test");
    await sim.stop();
    expect(sanitizeResult(result)).toMatchSnapshot();
  });

  test("not a function", async () => {
    const app = new SimApp({ isTestEnvironment: true });
    new Bucket(app, "test");

    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    await expect(testRunner.runTest("root/test")).rejects.toThrowError(
      'No test found at path "root/test"'
    );
    await sim.stop();
  });
});

describe("run all tests", () => {
  test("no tests", async () => {
    const app = new SimApp({ isTestEnvironment: true });
    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const tests = await testRunner.listTests();
    await sim.stop();
    expect(tests).toEqual([]);
  });

  test("single test", async () => {
    const app = new SimApp({ isTestEnvironment: true });
    makeTest(app, "test", ["console.log('hi');"]);

    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const results = await runAllTests(testRunner);
    await sim.stop();
    expect(results.map(sanitizeResult)).toMatchSnapshot();
  });

  test("multiple tests", async () => {
    class Root extends Construct {
      constructor(scope: Construct, id: string) {
        super(scope, id);
        makeTest(this, "test", ["console.log('hi');"]);
        makeTest(this, "test:bla", ["console.log('hi');"]);
        makeTest(this, "test:blue", ["console.log('hi');"]);
      }
    }
    const app = new SimApp({ isTestEnvironment: true, rootConstruct: Root });

    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const results = await runAllTests(testRunner);
    await sim.stop();
    expect(results.length).toEqual(3);
    expect(results.map((r) => r.path).sort()).toStrictEqual([
      "root/env0/test",
      "root/env1/test:bla",
      "root/env2/test:blue",
    ]);
  });

  test("tests with same name in different scopes", async () => {
    class ConstructWithTest extends Construct {
      constructor(scope: Construct, id: string) {
        super(scope, id);
        makeTest(this, "test", ["console.log('hi');"]);
      }
    }

    class Root extends Construct {
      constructor(scope: Construct, id: string) {
        super(scope, id);

        makeTest(this, "test", ["console.log('hi');"]);
        new ConstructWithTest(this, "scope1");
        new ConstructWithTest(this, "scope2");
      }
    }
    const app = new SimApp({ isTestEnvironment: true, rootConstruct: Root });

    const sim = await app.startSimulator();
    const testRunner = sim.getResource(
      "/cloud.TestRunner"
    ) as ITestRunnerClient;
    const results = await runAllTests(testRunner);
    await sim.stop();
    expect(results.length).toEqual(3);
    expect(results.map((r) => r.path).sort()).toStrictEqual([
      "root/env0/test",
      "root/env1/scope1/test",
      "root/env2/scope2/test",
    ]);
  });
});

test("await client is a no-op", async () => {
  const app = new SimApp();
  new Bucket(app, "test");
  const sim = await app.startSimulator();
  const bucketClient = sim.getResource("/test");
  expect(await bucketClient).toBe(bucketClient);
  await sim.stop();
});

test("calling an invalid method returns an error to the client", async () => {
  // as opposed to, say, crashing the server
  const app = new SimApp();
  new Bucket(app, "test");
  const sim = await app.startSimulator();
  const bucketClient = sim.getResource("/test");
  await expect(bucketClient.invalidMethod()).rejects.toThrowError(
    /Method invalidMethod not found on resource/
  );
  await sim.stop();
});

test("provides raw tree data", async () => {
  const app = new SimApp();
  makeTest(app, "test", ["console.log('hi');"]);
  const sim = await app.startSimulator();
  const treeData = sim.tree().rawData();
  await sim.stop();
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
    `async handle() { ${code.join("\n")} }`,
    bindings
  );
  return new Test(scope, id, handler, bindings);
}

function removePathsFromTraceLine(line?: string) {
  if (!line) {
    return undefined;
  }

  // convert wingsdk paths to src (e.g. "/a/b/wingsdk/src/z/t.js" -> "[src]/z/t.js") with relative paths
  line = line.replace(/\/.+\/wingsdk\/src\//g, "[src]/");

  // if any absolute paths remain, replace them with "[abs]"
  line = line.replace(/([ (])\/[^)]+/g, "$1[abs]");

  return line;
}

function removeLineNumbers(line?: string) {
  if (!line) {
    return undefined;
  }

  return line.replace(/:\d+:\d+/g, ":<sanitized>");
}

function sanitizeResult(result: TestResult): TestResult {
  let error: string | undefined;
  if (result.error) {
    let lines = result.error
      .split("\n")
      .map(removePathsFromTraceLine)
      .map(removeLineNumbers);

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
