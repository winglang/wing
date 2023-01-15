import { Construct } from "constructs";
import { Bucket, Function } from "../../src/cloud";
import { InflightBindings } from "../../src/core";
import { SimApp, Testing, TestResult } from "../../src/testing";

describe("run single test", () => {
  test("test not found", async () => {
    const app = new SimApp();
    const sim = await app.startSimulator();
    await expect(sim.runTest("test_not_found")).rejects.toThrowError(
      'Resource "test_not_found" not found'
    );
  });

  test("happy path", async () => {
    const app = new SimApp();
    new Test(app, "test", ["console.log('hi');"]);
    const sim = await app.startSimulator();
    const result = await sim.runTest("root/test");
    expect(sanitizeTimestamps(result)).toMatchSnapshot();
  });

  test("test failure", async () => {
    const app = new SimApp();
    new Test(app, "test", [
      "console.log('I am about to fail');",
      "throw new Error('test failed');",
    ]);

    const sim = await app.startSimulator();
    const result = await sim.runTest("root/test");
    expect(sanitizeTimestamps(result)).toMatchSnapshot();
  });

  test("not a function", async () => {
    const app = new SimApp();
    new Bucket(app, "test");

    const sim = await app.startSimulator();
    await expect(sim.runTest("root/test")).rejects.toThrowError(
      'Resource "root/test" is not a cloud.Function (expecting "invoke()").'
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
    expect(results.map(sanitizeTimestamps)).toMatchSnapshot();
  });

  test("multiple tests", async () => {
    const app = new SimApp();
    new Test(app, "test", ["console.log('hi');"]);
    new Test(app, "test:bla", ["console.log('hi');"]);
    new Test(app, "test:blue", ["console.log('hi');"]);
    new Bucket(app, "mytestbucket");

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
    const bucket = new Bucket(app, "bucket");

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
        resources: {
          bucket: {
            resource: bucket,
            ops: ["put"],
          },
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
        resources: {
          bucket: {
            resource: bucket,
            ops: ["put", "list"],
          },
        },
      }
    );

    const sim = await app.startSimulator();
    const results = await sim.runAllTests();

    // expect no failtures
    expect(results.filter((r) => !r.pass)).toEqual([]);
  });
});

class Test extends Function {
  constructor(
    scope: Construct,
    id: string,
    code: string[],
    bindings?: InflightBindings
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
}

function sanitizeTimestamps(result: TestResult): TestResult {
  return {
    path: result.path,
    pass: result.pass,
    error: result.error,
    traces: result.traces.map((trace) => ({
      ...trace,
      timestamp: "<TIMESTAMP>",
    })),
  };
}
