import { writeFileSync } from "fs";
import { mkdtemp } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { Target } from "@winglang/compiler";
import { TestResult, TraceType } from "@winglang/sdk/lib/std";
import chalk from "chalk";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { renderTestReport, test as wingTest } from "./test";

const defaultChalkLevel = chalk.level;

describe("printing test reports", () => {
  beforeEach(() => {
    chalk.level = 0;
  });

  afterEach(() => {
    chalk.level = defaultChalkLevel;
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

    process.env.DEBUG = oldDebug;

    expect(testReport).toMatchSnapshot();
    expect(testReport).toContain("Push (message=cool)");
  });
});

describe("test options", () => {
  beforeEach(() => {
    chalk.level = 0;
  });

  afterEach(() => {
    chalk.level = defaultChalkLevel;
  });

  test("wing test (default entrypoint)", async () => {
    const outDir = await mkdtemp(join(tmpdir(), "-wing-compile-test"));
    const prevdir = process.cwd();
    const logSpy = vi.spyOn(console, "log");

    try {
      process.chdir(outDir);
      writeFileSync("foo.test.w", "bring cloud;");
      writeFileSync("bar.test.w", "bring cloud;");
      writeFileSync("baz.test.w", "bring cloud;");

      await wingTest([], { clean: true, target: Target.SIM });

      expect(logSpy).toHaveBeenCalledWith("pass ─ foo.test.wsim (no tests)");
      expect(logSpy).toHaveBeenCalledWith("pass ─ bar.test.wsim (no tests)");
      expect(logSpy).toHaveBeenCalledWith("pass ─ baz.test.wsim (no tests)");
    } finally {
      process.chdir(prevdir);
      logSpy.mockRestore();
    }
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
        sourceType: "wingsdk.cloud.Queue",
        timestamp: "2023-05-15T16:20:46.886Z",
      },
      {
        data: { message: "sleeping for 500 ms" },
        type: TraceType.LOG,
        sourcePath: "root/env0/test:test/Handler",
        sourceType: "wingsdk.cloud.Function",
        timestamp: "2023-05-15T16:20:46.887Z",
      },
      {
        type: TraceType.RESOURCE,
        data: { message: 'Sending messages (messages=["cool"], subscriber=sim-4).' },
        sourcePath: "root/env0/MyProcessor/cloud.Queue",
        sourceType: "wingsdk.cloud.Queue",
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
        sourceType: "wingsdk.cloud.Function",
        timestamp: "2023-05-15T16:20:46.966Z",
      },
      {
        data: {
          message:
            "Subscriber error - returning 1 messages to queue: Missing environment variable: QUEUE_HANDLE_7164aec4",
        },
        sourcePath: "root/env0/MyProcessor/cloud.Queue",
        sourceType: "wingsdk.cloud.Queue",
        type: TraceType.RESOURCE,
        timestamp: "2023-05-15T16:20:46.966Z",
      },
      {
        data: { message: "Get (key=file.txt).", status: "failure", error: {} },
        type: TraceType.RESOURCE,
        sourcePath: "root/env0/MyProcessor/cloud.Bucket",
        sourceType: "wingsdk.cloud.Bucket",
        timestamp: "2023-05-15T16:20:47.388Z",
      },
      {
        data: { message: 'Invoke (payload="").', status: "failure", error: {} },
        type: TraceType.RESOURCE,
        sourcePath: "root/env0/test:test/Handler",
        sourceType: "wingsdk.cloud.Function",
        timestamp: "2023-05-15T16:20:47.388Z",
      },
    ],
  },
];
