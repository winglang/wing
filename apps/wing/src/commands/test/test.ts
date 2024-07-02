import * as cp from "child_process";
import { existsSync, readFile, readFileSync, realpathSync, rm, rmSync, statSync } from "fs";
import { basename, join, relative, resolve } from "path";
import { promisify } from "util";
import { PromisePool } from "@supercharge/promise-pool";
import { BuiltinPlatform, determineTargetFromPlatforms } from "@winglang/compiler";
import { std, simulator } from "@winglang/sdk";
import { LogLevel } from "@winglang/sdk/lib/std";
import { Util } from "@winglang/sdk/lib/util";
import { prettyPrintError } from "@winglang/sdk/lib/util/enhanced-error";
import chalk from "chalk";
import debug from "debug";
import { glob } from "glob";
import { nanoid } from "nanoid";
import { printResults, validateOutputFilePath, writeResultsToFile } from "./results";
import { SnapshotMode, SnapshotResult, captureSnapshot, determineSnapshotMode } from "./snapshots";
import { SNAPSHOT_ERROR_PREFIX } from "./snapshots-help";
import { TraceProcessor } from "./trace-processor";
import { renderTestName } from "./util";
import { withSpinner } from "../../util";
import { compile, CompileOptions } from "../compile";
import { SpinnerStream } from "../spinner-stream";

const log = debug("wing:test");

const ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS = "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS";
const ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS_AWSCDK = "WingTestRunnerFunctionArns";

const PARALLELISM = { [BuiltinPlatform.TF_AZURE]: 5 };

/**
 * Options for the `test` command.
 */
export interface TestOptions extends CompileOptions {
  /**
   * Whether the output artifacts should be kept or cleaned up after the test run.
   */
  readonly clean: boolean;
  /**
   * The name of the output file.
   */
  readonly outputFile?: string;
  /**
   * String representing a regex pattern used to selectively filter which tests to run.
   */
  readonly testFilter?: string;
  /**
   * How many times failed tests should be retried. default is one
   */
  readonly retry?: number;
  /**
   * Whether to stream the logs of the test run.
   */
  readonly stream?: boolean;

  /**
   * Determine snapshot behavior.
   */
  readonly snapshots?: SnapshotMode;

  /**
   * Number of tests to be run in parallel. 0 or undefined will run all at once.
   */
  readonly parallel?: number;
}

const TEST_FILE_PATTERNS = ["**/*.test.w", "**/{main,*.main}.{w,ts}"];
const TEST_FILE_IGNORE = ["**/node_modules/**", "**/target/**"];

/**
 * Collects all the test files that should be run.
 * If no entrypoints are specified, all the entrypoint files in the current directory (recursive) are collected.
 * This excludes node_modules and target directories.
 *
 * If entrypoints are specified, only the files that contain the entrypoint string are collected.
 */
export async function collectTestFiles(entrypoints: string[] = []): Promise<string[]> {
  const expandedEntrypoints = await glob(TEST_FILE_PATTERNS, {
    ignore: TEST_FILE_IGNORE,
    absolute: false,
    posix: true,
  });

  // check if any of the entrypoints are exact files
  const exactEntrypoints = entrypoints.filter(
    (e) => statSync(e, { throwIfNoEntry: false })?.isFile() === true
  );
  const fuzzyEntrypoints = entrypoints.filter((e) => !exactEntrypoints.includes(e));

  let finalEntrypoints: string[] = exactEntrypoints;
  if (fuzzyEntrypoints.length > 0) {
    // if entrypoints are specified, filter the expanded entrypoints to ones that contain them
    finalEntrypoints = finalEntrypoints.concat(
      expandedEntrypoints.filter((e) => fuzzyEntrypoints.some((f) => e.includes(f)))
    );
  } else if (exactEntrypoints.length === 0) {
    finalEntrypoints = finalEntrypoints.concat(expandedEntrypoints);
  }

  // dedupe based on real path, then get all paths as relative to cwd
  const cwd = process.cwd();
  return [...new Set(finalEntrypoints.map((e) => realpathSync(e)))].map((e) => relative(cwd, e));
}

export async function test(entrypoints: string[], options: TestOptions): Promise<number> {
  if (options.outputFile) {
    validateOutputFilePath(options.outputFile);
  }

  const selectedEntrypoints = await collectTestFiles(entrypoints);
  if (selectedEntrypoints.length === 0) {
    throw new Error(`No matching test or entrypoint files found: [${entrypoints.join(", ")}]`);
  }

  const startTime = Date.now();
  const results: SingleTestResult[] = [];
  process.env.WING_TARGET = determineTargetFromPlatforms(options.platform ?? []);
  const testFile = async (
    entrypoint: string,
    retries: number = options.retry || 1
  ): Promise<void> => {
    const testName = renderTestName(entrypoint);
    try {
      const singleTestResults = await testOne(testName, entrypoint, options);
      if (singleTestResults.results.some((t) => !t.pass) && retries > 1) {
        console.log(`Retrying failed tests. ${retries - 1} retries left.`);
        return await testFile(entrypoint, retries - 1);
      }
      results.push(singleTestResults);
    } catch (error: any) {
      console.log(error.message);
      if (retries > 1) {
        console.log(`Retrying failed tests. ${retries - 1} retries left.`);
        return await testFile(entrypoint, retries - 1);
      }
      const snapshot = error.message?.startsWith(SNAPSHOT_ERROR_PREFIX)
        ? SnapshotResult.MISMATCH
        : SnapshotResult.SKIPPED;
      results.push({
        testName,
        snapshot,
        results: [
          {
            pass: false,
            unsupported: error.name === "NotImplementedError",
            unsupportedResource: (error as any).resource,
            unsupportedOperation: (error as any).operation,
            path: "*",
            error: error.message,
            traces: [],
          },
        ],
      });
    }
  };

  await PromisePool.withConcurrency(options.parallel || selectedEntrypoints.length)
    .for(selectedEntrypoints)
    .process((entrypointFile) => testFile(entrypointFile));

  const testDuration = Date.now() - startTime;
  printResults(results, testDuration);
  if (options.outputFile) {
    await writeResultsToFile(results, testDuration, options.outputFile, options.platform);
  }

  // if we have any failures, exit with 1
  for (const testSuite of results) {
    for (const r of testSuite.results) {
      if (!r.pass && !r.unsupported) {
        return 1;
      }
    }
  }

  return 0;
}

export type SingleTestResult = {
  readonly testName: string;
  readonly results: std.TestResult[];
  readonly snapshot: SnapshotResult;
};

async function testOne(
  testName: string,
  entrypoint: string,
  options: TestOptions
): Promise<SingleTestResult> {
  const target = determineTargetFromPlatforms(options.platform);

  // determine snapshot behavior
  const snapshotMode = determineSnapshotMode(target, options);
  const shouldExecute = snapshotMode === SnapshotMode.NEVER || snapshotMode === SnapshotMode.DEPLOY;

  let results: std.TestResult[] = [];
  if (shouldExecute) {
    options.rootId = options.rootId ?? `Test.${nanoid(10)}`;
    const synthDir = await withSpinner(
      `Compiling ${renderTestName(entrypoint)} to ${target}...`,
      async () =>
        compile(entrypoint, {
          ...options,
          rootId: options.rootId,
          testing: true,
        })
    );

    results = await executeTest(synthDir, target, options);
  }

  // if one of the tests failed, return the results without updating any snapshots.
  const success = !results.some((r) => !r.pass);
  let snapshot = SnapshotResult.SKIPPED;

  // if all tests pass, capture snapshots
  if (success) {
    snapshot = await captureSnapshot(entrypoint, target, options);
  }

  return {
    testName,
    results: results,
    snapshot,
  };
}

async function executeTest(
  synthDir: string,
  target: string | undefined,
  options: TestOptions
): Promise<std.TestResult[]> {
  switch (target) {
    case BuiltinPlatform.SIM:
      return testSimulator(synthDir, options);
    case BuiltinPlatform.TF_AZURE:
    case BuiltinPlatform.TF_AWS:
    case BuiltinPlatform.TF_GCP:
      return testTf(synthDir, options);
    case BuiltinPlatform.AWSCDK:
      return testAwsCdk(synthDir, options);
    default:
      throw new Error(`unsupported target ${target}`);
  }
}

/**
 * Render a test report for printing out to the console.
 */
export async function renderTestReport(
  entrypoint: string,
  results: std.TestResult[],
  includeLogs: boolean = true
): Promise<string> {
  const out = new Array<string>();

  // find the longest `path` of all the tests
  const longestPath = results.reduce(
    (longest, result) => (result.path.length > longest ? result.path.length : longest),
    0
  );

  // if there are no inflight tests, add a dummy "pass" result
  // to indicate that compilation and preflight checks passed
  if (results.length === 0) {
    results.push({
      pass: true,
      path: "",
      traces: [],
    });
  }

  for (const result of results.sort(sortTests)) {
    const status = result.pass ? chalk.green("pass") : chalk.red("fail");

    const details = new Array<string>();

    if (includeLogs) {
      for (const trace of result.traces) {
        if (shouldSkipTrace(trace)) {
          continue;
        }

        details.push(chalk.gray(trace.data.message));
      }
    }

    // if the test failed, add the error message and trace
    if (result.error) {
      const err = await prettyPrintError(result.error, { chalk });
      details.push(...err.split("\n"));
    }

    // construct the first row of the test result by collecting the various components and joining
    // them with spaces.

    const firstRow = new Array<string>();
    firstRow.push(status);

    // if we have details, surround the rows with a box, otherwise, just print a line
    if (details.length > 0) {
      firstRow.push(chalk.gray("┌"));
    } else {
      firstRow.push(chalk.gray("─"));
    }

    firstRow.push(basename(entrypoint));

    if (result.path?.length > 0) {
      firstRow.push(chalk.gray("»"));
      firstRow.push(chalk.whiteBright(result.path.padEnd(longestPath)));
    } else {
      firstRow.push(chalk.gray("(no tests)"));
    }

    // okay we are ready to print the test result

    // print the primary description of the test
    out.push(firstRow.join(" "));

    // print additional rows that are related to this test
    for (let i = 0; i < details.length; i++) {
      const left = i === details.length - 1 ? "└" : "│";
      out.push(`    ${chalk.gray(` ${left} `)}${details[i]}`);
    }
  }

  return out.join("\n");
}

function testResultsContainsFailure(results: std.TestResult[]): boolean {
  return results.some((r) => !r.pass);
}

function noCleanUp(synthDir: string) {
  console.log(
    chalk.yellowBright.bold(`Cleanup is disabled!\nOutput files available at ${resolve(synthDir)}`)
  );
}

export function filterTests(tests: Array<string>, regexString?: string): Array<string> {
  if (regexString) {
    const regex = new RegExp(regexString);
    return tests.filter((t) => {
      // Extract test name from the string
      // root/env0/test:<testName>
      const firstColonIndex = t.indexOf(":");
      const testName = t.substring(firstColonIndex + 1);
      return testName ? regex.test(testName) : false;
    });
  } else {
    return tests;
  }
}

async function runTests(
  testRunner: std.ITestRunnerClient,
  tests: string[]
): Promise<std.TestResult[]> {
  const results: std.TestResult[] = [];

  for (const testPath of tests) {
    const result = await testRunner.runTest(testPath);
    results.push(result);
  }

  return results;
}

const SEVERITY_STRING = {
  [LogLevel.ERROR]: "[ERROR]",
  [LogLevel.WARNING]: "[WARNING]",
  [LogLevel.INFO]: "[INFO]",
  [LogLevel.VERBOSE]: "[VERBOSE]",
};

const LOG_STREAM_COLORS = {
  [LogLevel.ERROR]: chalk.red,
  [LogLevel.WARNING]: chalk.yellow,
  [LogLevel.INFO]: chalk.green,
  [LogLevel.VERBOSE]: chalk.gray,
};

async function formatTrace(
  trace: std.Trace,
  testName: string,
  mode: "short" | "full"
): Promise<string> {
  const level = trace.level;
  const date = new Date(trace.timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  const timestamp = `${hours}:${minutes}:${seconds}.${milliseconds}`;

  let msg = "";
  if (mode === "full") {
    msg += chalk.dim(`[${timestamp}]`);
    msg += LOG_STREAM_COLORS[level](` ${SEVERITY_STRING[level]}`);
    msg += chalk.dim(` ${testName} » ${trace.sourcePath}`);
    msg += "\n";
    if (level === LogLevel.ERROR) {
      msg += await prettyPrintError(trace.data.error ?? trace.data.message ?? trace.data, {
        chalk,
      });
    } else {
      msg += trace.data.message;
    }
    msg += "\n\n";
    return msg;
  } else if (mode === "short") {
    msg += LOG_STREAM_COLORS[level](`${SEVERITY_STRING[level]}`);
    msg += chalk.dim(` ${testName} | `);
    if (level === LogLevel.ERROR) {
      msg += await prettyPrintError(trace.data.error ?? trace.data.message ?? trace.data, {
        chalk,
      });
    } else {
      msg += trace.data.message;
    }
    msg += "\n";
    return msg;
  } else {
    throw new Error(`Unknown mode: ${mode}`);
  }
}

function shouldSkipTrace(trace: std.Trace): boolean {
  switch (trace.level) {
    // show VERBOSE only in debug mode
    case LogLevel.VERBOSE:
      return !process.env.DEBUG;

    // show INFO, WARNING, ERROR in all cases
    case LogLevel.INFO:
    case LogLevel.WARNING:
    case LogLevel.ERROR:
      return false;
  }
}

async function testSimulator(synthDir: string, options: TestOptions) {
  const s = new simulator.Simulator({ simfile: synthDir });
  const { clean, testFilter } = options;

  let outputStream: SpinnerStream | undefined;
  let traceProcessor: TraceProcessor | undefined;

  if (options.stream) {
    // As of this comment, each Wing test is associated with an isolated environment.
    // (All resources for test #0 are in root/env0/..., etc.)
    // This means we can use the environment number to map each environment # to a test name,
    // so when we receive a trace from the simulator, we can infer which test it's associated with.
    const testMappings = extractTestMappings(s.listResources());

    const printEvent = async (event: std.Trace) => {
      const env = extractTestEnvFromPath(event.sourcePath);

      let testName = "(no test)";
      if (env !== undefined) {
        testName = testMappings[env] ?? testName;
      }

      if (testFilter && !testName.includes(testFilter) && testName !== "(no test)") {
        // This test does not match the filter, so skip it.
        return;
      }

      if (shouldSkipTrace(event)) {
        return;
      }

      const formatStyle = process.env.DEBUG ? "full" : "short";
      const formatted = await formatTrace(event, testName, formatStyle);
      outputStream!.write(formatted);
    };

    // The simulator emits events synchronously, but formatting them needs to
    // happen asynchronously since e.g. files have to be read to format stack
    // traces. If we performed this async work inside of the `onTrace` callback,
    // we might end up with out-of-order traces, or traces getting printed (or
    // dropped) after the test has finished. TraceProcessor allows events to be
    // added to a queue and processed serially, and provides a way to safely
    // "await" the completion of the processing.
    traceProcessor = new TraceProcessor((event) => printEvent(event));

    // SpinnerStream is responsible for taking in lines of text and streaming
    // them to a TTY with a spinner, making sure to clear and re-print the
    // spinner when new lines are added.
    outputStream = new SpinnerStream(process.stdout, "Running tests...");

    s.onTrace({
      callback: (event) => {
        traceProcessor!.addEvent(event);
      },
    });
  }

  try {
    await s.start();
  } catch (e) {
    outputStream?.stopSpinner();
    throw e;
  }

  const testRunner = s.getResource(`${options.rootId}/cloud.TestRunner`) as std.ITestRunnerClient;
  const tests = await testRunner.listTests();
  const filteredTests = filterTests(tests, testFilter);

  const results = await runTests(testRunner, filteredTests);

  await s.stop();

  if (options.stream) {
    await traceProcessor!.finish();
    outputStream!.stopSpinner();
  }

  const testReport = await renderTestReport(synthDir, results, !options.stream);
  if (testReport.length > 0) {
    console.log(testReport);
  }

  let args: { methods: Record<string, Record<string, string>> };
  if (existsSync(join(synthDir, "usage_context.json"))) {
    args = { methods: JSON.parse(readFileSync(join(synthDir, "usage_context.json")).toString()) };
  }

  if (clean) {
    try {
      rmSync(synthDir, { recursive: true, force: true });
    } catch (err) {
      console.warn(`Warning: unable to clean up test directory: ${err}`);
    }
  } else {
    noCleanUp(synthDir);
  }

  return results.map((r) => ({ ...r, args }));
}

async function testTf(synthDir: string, options: TestOptions): Promise<std.TestResult[]> {
  const { clean, testFilter, platform = [BuiltinPlatform.SIM] } = options;
  let tfParallelism = PARALLELISM[platform[0]];

  try {
    const installed = await isTerraformInstalled(synthDir);
    if (!installed) {
      throw new Error(
        "Terraform is not installed. Please install Terraform to run tests in the cloud."
      );
    }

    await withSpinner("terraform init", async () => terraformInit(synthDir));

    await withSpinner("terraform apply", () => terraformApply(synthDir, tfParallelism));

    const [testRunner, tests] = await withSpinner("Setting up test runner...", async () => {
      const target = determineTargetFromPlatforms(platform);
      const testRunnerPath = `@winglang/sdk/lib/${targetFolder[target]}/test-runner.inflight`;

      const testArns = await terraformOutput(synthDir, ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS);
      const { TestRunnerClient } = await import(testRunnerPath);
      const runner = new TestRunnerClient(testArns);

      const allTests = await runner.listTests();
      const filteredTests = filterTests(allTests, testFilter);
      return [runner, filteredTests];
    });

    const results = await withSpinner("Running tests...", async () => {
      return runTests(testRunner, tests);
    });

    const testReport = await renderTestReport(synthDir, results);
    if (testReport.length > 0) {
      console.log(testReport);
    }

    if (testResultsContainsFailure(results)) {
      console.log("One or more tests failed. Cleaning up resources...");
    }

    let args: { methods: Record<string, Record<string, string>> };
    if (existsSync(join(synthDir, "usage_context.json"))) {
      args = { methods: JSON.parse(readFileSync(join(synthDir, "usage_context.json")).toString()) };
    }

    return results.map((r) => ({ ...r, args }));
  } catch (err) {
    console.warn((err as Error).message);
    return [{ pass: false, path: "", error: (err as Error).message, traces: [] }];
  } finally {
    if (clean) {
      await cleanupTf(synthDir, tfParallelism);
    } else {
      noCleanUp(synthDir);
    }
  }
}

async function testAwsCdk(synthDir: string, options: TestOptions): Promise<std.TestResult[]> {
  const { clean, testFilter } = options;
  try {
    await isAwsCdkInstalled(synthDir);

    await withSpinner("cdk deploy", () => awsCdkDeploy(synthDir));

    const [testRunner, tests] = await withSpinner("Setting up test runner...", async () => {
      const stackName = process.env.CDK_STACK_NAME! + Util.sha256(synthDir).slice(-8);

      const testArns = await awsCdkOutput(
        synthDir,
        ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS_AWSCDK,
        stackName
      );

      const { TestRunnerClient } = await import(
        "@winglang/sdk/lib/shared-aws/test-runner.inflight"
      );
      const runner = new TestRunnerClient(testArns);

      const allTests = await runner.listTests();
      const filteredTests = filterTests(allTests, testFilter);
      return [runner, filteredTests];
    });

    const results = await withSpinner("Running tests...", async () => {
      return runTests(testRunner, tests);
    });

    const testReport = await renderTestReport(synthDir, results);
    if (testReport.length > 0) {
      console.log(testReport);
    }

    if (testResultsContainsFailure(results)) {
      console.log("One or more tests failed. Cleaning up resources...");
    }

    return results;
  } catch (err) {
    console.warn((err as Error).message);
    return [{ pass: false, path: "", error: (err as Error).message, traces: [] }];
  } finally {
    if (clean) {
      await cleanupCdk(synthDir);
    } else {
      noCleanUp(synthDir);
    }
  }
}

async function cleanupCdk(synthDir: string) {
  await withSpinner("aws-cdk destroy", () => awsCdkDestroy(synthDir));
  rmSync(synthDir, { recursive: true, force: true });
}

async function isAwsCdkInstalled(synthDir: string) {
  try {
    await execCapture("cdk version --ci true", { cwd: synthDir });
  } catch (err) {
    throw new Error(
      "AWS-CDK is not installed. Please install AWS-CDK to run tests in the cloud (npm i -g aws-cdk)."
    );
  }
}

export async function awsCdkDeploy(synthDir: string) {
  await execCapture("cdk deploy --require-approval never --ci true -O ./output.json --app . ", {
    cwd: synthDir,
  });
}

export async function awsCdkDestroy(synthDir: string) {
  const removeFile = promisify(rm);
  await removeFile(synthDir.concat("/output.json"));
  await execCapture("cdk destroy -f --ci true --app ./", { cwd: synthDir });
}

async function awsCdkOutput(synthDir: string, name: string, stackName: string) {
  const readFileCmd = promisify(readFile);
  const file = await readFileCmd(synthDir.concat("/output.json"));
  const parsed = JSON.parse(Buffer.from(file).toString());
  return parsed[stackName][name];
}

const targetFolder: Record<string, string> = {
  [BuiltinPlatform.TF_AWS]: "shared-aws",
  [BuiltinPlatform.TF_AZURE]: "shared-azure",
  [BuiltinPlatform.TF_GCP]: "shared-gcp",
};

async function cleanupTf(synthDir: string, parallelism?: number) {
  try {
    await withSpinner("terraform destroy", () => terraformDestroy(synthDir, parallelism));
    rmSync(synthDir, { recursive: true, force: true });
  } catch (e) {
    console.error(e);
  }
}

async function isTerraformInstalled(synthDir: string) {
  const output = await execCapture("terraform version", { cwd: synthDir });
  return output.startsWith("Terraform v");
}

export async function terraformInit(synthDir: string) {
  return execCapture("terraform init", { cwd: synthDir });
}

async function terraformApply(synthDir: string, parallelism?: number) {
  return execCapture(
    `terraform apply -auto-approve ${parallelism ? `-parallelism=${parallelism}` : ""}`,
    { cwd: synthDir }
  );
}

async function terraformDestroy(synthDir: string, parallelism?: number) {
  return execCapture(
    `terraform destroy -auto-approve ${parallelism ? `-parallelism=${parallelism}` : ""}`,
    {
      cwd: synthDir,
    }
  );
}

async function terraformOutput(synthDir: string, name: string) {
  const output = await execCapture("terraform output -json", { cwd: synthDir });
  const parsed = JSON.parse(output);
  if (!parsed[name]) {
    throw new Error(`terraform output ${name} not found`);
  }
  return parsed[name].value;
}

function sortTests(a: std.TestResult, b: std.TestResult) {
  if (a.pass && !b.pass) {
    return -1;
  }
  if (!a.pass && b.pass) {
    return 1;
  }
  return a.path.localeCompare(b.path);
}

/**
 * Take a path like "root/env123/foo/bar" and return the environment number (123).
 */
function extractTestEnvFromPath(path: string): number | undefined {
  const parts = path.split("/");
  const envPart = parts[1] ?? parts[0];
  if (!envPart.startsWith("env")) {
    return undefined;
  }
  return parseInt(envPart.substring(3));
}

/*
 * Take a path like "root/env123/foo/test:first test/bar" and return "first test".
 */
function extractTestNameFromPath(path: string): string | undefined {
  const parts = path.split("/");
  for (const part of parts) {
    if (part.startsWith("test:")) {
      return part.substring(5);
    }
  }
  return undefined;
}

/*
 * Take a list of paths like:
 *
 * root/env0/foo
 * root/env0/test:first test        <-- this is a test
 * root/env1/bar/test:second test   <-- this is a test
 * root/env1/bar
 *
 * and extract the mapping from environment indices to test names:
 *
 * { 0: "first test", 1: "second test" }
 */
function extractTestMappings(paths: string[]): Record<number, string> {
  const mappings: Record<number, string> = {};
  for (const path of paths) {
    const parts = path.split("/");
    if (parts.some((p) => p.startsWith("test:"))) {
      const env = extractTestEnvFromPath(path);
      if (env === undefined) {
        continue;
      }
      const testName = extractTestNameFromPath(path);
      if (testName === undefined) {
        continue;
      }
      mappings[env] = testName;
    }
  }
  return mappings;
}

const MAX_BUFFER = 10 * 1024 * 1024;

/**
 * Executes command and returns STDOUT. If the command fails (non-zero), throws an error.
 */
async function execCapture(command: string, options: { cwd: string }) {
  log(command);
  const exec = promisify(cp.exec);
  const { stdout, stderr } = await exec(command, {
    cwd: options.cwd,
    maxBuffer: MAX_BUFFER,
  });
  if (stderr) {
    throw new Error(stderr);
  }
  log(stdout);
  return stdout;
}
