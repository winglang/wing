import fs from "fs";
import { mkdtemp } from "fs/promises";
import { tmpdir } from "os";
import { join, resolve } from "path";
import { BuiltinPlatform } from "@winglang/compiler";
import { TestResult, TraceType } from "@winglang/sdk/lib/std";
import chalk from "chalk";
import { describe, test, expect, beforeEach, afterEach, vi, SpyInstance } from "vitest";
import { filterTests, pickOneTestPerEnvironment, renderTestReport, test as wingTest } from ".";
import * as resultsFn from "./results";

const defaultChalkLevel = chalk.level;
const cwd = process.cwd();

describe("printing test reports", () => {
  beforeEach(() => {
    chalk.level = 0;
  });

  afterEach(() => {
    chalk.level = defaultChalkLevel;
    process.chdir(cwd);
  });

  test("resource traces are not shown if debug mode is disabled", () => {
    const testReport = renderTestReport("hello.w", EXAMPLE_TEST_RESULTS);

    expect(testReport).toMatchSnapshot();
    expect(testReport).not.toContain("Push (message=cool)");
  });

  test("resource traces are shown if debug mode is enabled", () => {
    const oldDebug = process.env.DEBUG;
    process.env.DEBUG = "1";

    const testReport = renderTestReport("hello.w", EXAMPLE_TEST_RESULTS);

    if (oldDebug) {
      process.env.DEBUG = oldDebug;
    } else {
      delete process.env.DEBUG;
    }

    expect(testReport).toMatchSnapshot();
    expect(testReport).toContain("Push (message=cool)");
  });
});

describe("wing test (no options)", () => {
  let logSpy: SpyInstance;

  beforeEach(() => {
    chalk.level = 0;
    logSpy = vi.spyOn(console, "log");
  });

  afterEach(() => {
    chalk.level = defaultChalkLevel;
    process.chdir(cwd);
    logSpy.mockRestore();
  });

  test("default entrypoint behaviour", async () => {
    const outDir = await mkdtemp(join(tmpdir(), "-wing-compile-test"));

    process.chdir(outDir);
    fs.writeFileSync("foo.test.w", "bring cloud;");
    fs.writeFileSync("bar.test.w", "bring cloud;");
    fs.writeFileSync("baz.test.w", "bring cloud;");

    await wingTest([], { clean: true, platform: [BuiltinPlatform.SIM] });

    expect(logSpy).toHaveBeenCalledWith("pass ─ foo.test.wsim (no tests)");
    expect(logSpy).toHaveBeenCalledWith("pass ─ bar.test.wsim (no tests)");
    expect(logSpy).toHaveBeenCalledWith("pass ─ baz.test.wsim (no tests)");
  });
});

describe("output-file option", () => {
  let writeResultsSpy: SpyInstance;
  let writeFileSpy: SpyInstance;

  beforeEach(() => {
    chalk.level = 0;
    writeResultsSpy = vi.spyOn(resultsFn, "writeResultsToFile");
    writeFileSpy = vi.spyOn(fs, "writeFile").mockImplementation(() => null);
  });

  afterEach(() => {
    chalk.level = defaultChalkLevel;
    process.chdir(cwd);
    writeResultsSpy.mockRestore();
    writeFileSpy.mockRestore();
  });

  test("wing test with output file calls writeResultsToFile", async () => {
    const outDir = await mkdtemp(join(tmpdir(), "-wing-compile-test"));

    process.chdir(outDir);
    fs.writeFileSync("test.test.w", EXAMPLE_TEST);

    const outputFile = "out.json";

    await wingTest(["test.test.w"], {
      clean: true,
      platform: [BuiltinPlatform.SIM],
      outputFile,
    });

    expect(writeResultsSpy).toBeCalledTimes(1);
    const { testName, results } = writeResultsSpy.mock.calls[0][0][0];
    expect(results).toMatchObject(BUCKET_TEST_RESULT);
    expect(testName).toBe("test.test.w");
    expect(writeResultsSpy.mock.calls[0][2]).toBe(outputFile);

    expect(writeFileSpy).toBeCalledTimes(1);
    const [filePath, output] = writeFileSpy.mock.calls[0];
    expect(filePath).toBe(resolve("out.json"));
    expect(JSON.parse(output as string)).toMatchObject(OUTPUT_FILE);
  });

  test("wing test without output file calls writeResultsToFile", async () => {
    const outDir = await mkdtemp(join(tmpdir(), "-wing-compile-test"));

    process.chdir(outDir);
    fs.writeFileSync("test.test.w", EXAMPLE_TEST);

    await wingTest(["test.test.w"], {
      clean: true,
      platform: [BuiltinPlatform.SIM],
    });
    expect(writeResultsSpy).toBeCalledTimes(0);
  });

  test("validate output file", () => {
    expect(resultsFn.validateOutputFilePath("/path/out.json")).toBeUndefined();
    expect(resultsFn.validateOutputFilePath("out.json")).toBeUndefined();

    expect(() => resultsFn.validateOutputFilePath("/path/out.csv")).toThrow(
      'only .json output files are supported. (found ".csv")'
    );

    expect(() => resultsFn.validateOutputFilePath("/path/json")).toThrow(
      'only .json output files are supported. (found "")'
    );
  });
});

describe("test-filter option", () => {
  beforeEach(() => {
    chalk.level = 0;
  });

  afterEach(() => {
    chalk.level = defaultChalkLevel;
  });

  test("wing test (no test-filter)", () => {
    const filteredTests = pickOneTestPerEnvironment(filterTests(EXAMPLE_UNFILTERED_TESTS));

    expect(filteredTests.length).toBe(3);
    expect(filteredTests[0]).toBe("root/env0/test:get()");
    expect(filteredTests[1]).toBe("root/env1/test:get:At()");
    expect(filteredTests[2]).toBe("root/env2/test:stringify()");
  });

  test("wing test --test-filter <regex>", () => {
    const filteredTests = pickOneTestPerEnvironment(filterTests(EXAMPLE_UNFILTERED_TESTS, "get"));

    expect(filteredTests.length).toBe(2);
    expect(filteredTests[0]).toBe("root/env0/test:get()");
    expect(filteredTests[1]).toBe("root/env1/test:get:At()");
  });
});

describe("retry option", () => {
  let logSpy: SpyInstance;

  beforeEach(() => {
    chalk.level = 0;
    logSpy = vi.spyOn(console, "log");
  });

  afterEach(() => {
    chalk.level = defaultChalkLevel;
    process.chdir(cwd);
    logSpy.mockRestore();
  });

  test("wing test (no retry)", async () => {
    const outDir = await mkdtemp(join(tmpdir(), "-wing-retry-test"));

    process.chdir(outDir);
    // Create a test that will consistently fail
    fs.writeFileSync(
      "fail.test.w",
      `
        bring cloud;
        test "alwaysFail" {
          assert(false);
        }
      `
    );

    await wingTest(["fail.test.w"], {
      clean: true,
      platform: [BuiltinPlatform.SIM],
    });

    const retryLogs = logSpy.mock.calls.filter((args) => args[0].includes("Retrying"));
    expect(retryLogs.length).toBe(0);
  });

  test("wing test --retry [retries]", async () => {
    const outDir = await mkdtemp(join(tmpdir(), "-wing-retry-test"));

    process.chdir(outDir);
    // Create a test that will consistently fail
    fs.writeFileSync(
      "fail.test.w",
      `
        bring cloud;
        test "alwaysFail" {
          assert(false);
        }
      `
    );

    // Equivalent to `wing test --retry` (default 3 retries)
    await wingTest(["fail.test.w"], {
      clean: true,
      platform: [BuiltinPlatform.SIM],
      retry: 3,
    });

    const retryLogs = logSpy.mock.calls.filter((args) => args[0].includes("Retrying"));
    expect(retryLogs.length).toBe(3);
  });
});

const EXAMPLE_TEST_RESULTS: Array<TestResult> = [
  {
    path: "root/env0/test:test",
    pass: false,
    error: "Error: Object does not exist (key=file.txt)",
    traces: [
      {
        data: { message: "Push (message=cool).", status: "success" },
        type: TraceType.RESOURCE,
        sourcePath: "root/env0/MyProcessor/cloud.Queue",
        sourceType: "@winglang/sdk.cloud.Queue",
        timestamp: "2023-05-15T16:20:46.886Z",
      },
      {
        data: { message: "sleeping for 500 ms" },
        type: TraceType.LOG,
        sourcePath: "root/env0/test:test/Handler",
        sourceType: "@winglang/sdk.cloud.Function",
        timestamp: "2023-05-15T16:20:46.887Z",
      },
      {
        type: TraceType.RESOURCE,
        data: { message: 'Sending messages (messages=["cool"], subscriber=sim-4).' },
        sourcePath: "root/env0/MyProcessor/cloud.Queue",
        sourceType: "@winglang/sdk.cloud.Queue",
        timestamp: "2023-05-15T16:20:46.961Z",
      },
      {
        data: {
          message: 'Invoke (payload="{\\"messages\\":[\\"cool\\"]}").',
          status: "failure",
          error: {},
        },
        type: TraceType.RESOURCE,
        sourcePath: "root/env0/MyProcessor/cloud.Queue-AddConsumer-0088483a",
        sourceType: "@winglang/sdk.cloud.Function",
        timestamp: "2023-05-15T16:20:46.966Z",
      },
      {
        data: {
          message:
            "Subscriber error - returning 1 messages to queue: Missing environment variable: QUEUE_HANDLE_7164aec4",
        },
        sourcePath: "root/env0/MyProcessor/cloud.Queue",
        sourceType: "@winglang/sdk.cloud.Queue",
        type: TraceType.RESOURCE,
        timestamp: "2023-05-15T16:20:46.966Z",
      },
      {
        data: { message: "Get (key=file.txt).", status: "failure", error: {} },
        type: TraceType.RESOURCE,
        sourcePath: "root/env0/MyProcessor/cloud.Bucket",
        sourceType: "@winglang/sdk.cloud.Bucket",
        timestamp: "2023-05-15T16:20:47.388Z",
      },
      {
        data: { message: 'Invoke (payload="").', status: "failure", error: {} },
        type: TraceType.RESOURCE,
        sourcePath: "root/env0/test:test/Handler",
        sourceType: "@winglang/sdk.cloud.Function",
        timestamp: "2023-05-15T16:20:47.388Z",
      },
    ],
  },
];

const EXAMPLE_TEST = `
bring cloud;
let b = new cloud.Bucket();

test "put" {
  b.put("test1.txt", "Foo");
  assert(b.get("test1.txt") == "Foo");
}
`;

const BUCKET_TEST_RESULT = [
  {
    path: "root/env0/test:put",
    pass: true,
    traces: [
      {
        data: { message: "Put (key=test1.txt).", status: "success" },
        type: "resource",
        sourcePath: "root/env0/cloud.Bucket",
        sourceType: "@winglang/sdk.cloud.Bucket",
      },
      {
        data: { message: "Get (key=test1.txt).", status: "success", result: '"Foo"' },
        type: "resource",
        sourcePath: "root/env0/cloud.Bucket",
        sourceType: "@winglang/sdk.cloud.Bucket",
      },
      {
        data: { message: 'Invoke (payload="").', status: "success" },
        type: "resource",
        sourcePath: "root/env0/test:put/Handler",
        sourceType: "@winglang/sdk.cloud.Function",
      },
    ],
  },
];

const OUTPUT_FILE = {
  results: {
    "test.test.w": {
      put: {
        path: "root/env0/test:put",
        pass: true,
        traces: [
          {
            data: {
              message: "Put (key=test1.txt).",
              status: "success",
            },
            type: "resource",
            sourcePath: "root/env0/cloud.Bucket",
            sourceType: "@winglang/sdk.cloud.Bucket",
          },
          {
            data: {
              message: "Get (key=test1.txt).",
              status: "success",
              result: '"Foo"',
            },
            type: "resource",
            sourcePath: "root/env0/cloud.Bucket",
            sourceType: "@winglang/sdk.cloud.Bucket",
          },
          {
            data: {
              message: 'Invoke (payload="").',
              status: "success",
            },
            type: "resource",
            sourcePath: "root/env0/test:put/Handler",
            sourceType: "@winglang/sdk.cloud.Function",
          },
        ],
      },
    },
  },
};

const EXAMPLE_UNFILTERED_TESTS: string[] = [
  "root/env0/test:get()",
  "root/env0/test:get:At()",
  "root/env0/test:stringify()",
  "root/env1/test:get()",
  "root/env1/test:get:At()",
  "root/env1/test:stringify()",
  "root/env2/test:get()",
  "root/env2/test:get:At()",
  "root/env2/test:stringify()",
];
