import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { renderTestReport, filterTests, pickOneTestPerEnvironment } from "./test";

import { TestResult, TraceType } from "@winglang/sdk/lib/std";
import chalk from "chalk";

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
  test("wing test (no filter)", () => {
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
