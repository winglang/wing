import * as cp from "child_process";
import { existsSync, readFile, readFileSync, realpathSync, rm, rmSync, statSync } from "fs";
import { basename, join, relative, resolve, sep } from "path";
import { promisify } from "util";
import { BuiltinPlatform, determineTargetFromPlatforms } from "@winglang/compiler";
import { std, simulator } from "@winglang/sdk";
import { Util } from "@winglang/sdk/lib/util";
import { prettyPrintError } from "@winglang/sdk/lib/util/enhanced-error";
import chalk from "chalk";
import debug from "debug";
import { glob } from "glob";
import { nanoid } from "nanoid";
import { printResults, validateOutputFilePath, writeResultsToFile } from "./results";
import { withSpinner } from "../../util";
import { compile, CompileOptions } from "../compile";

const log = debug("wing:test");

const ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS = "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS";
const ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS_AWSCDK = "WingTestRunnerFunctionArns";

/**
 * @param path path to the test/s file
 * @returns the file name and parent dir in the following format: "folder/file.ext"
 */
const generateTestName = (path: string) => path.split(sep).slice(-2).join("/");

/**
 * Options for the `test` command.
 */
export interface TestOptions extends CompileOptions {
  /**
   * Whether the output artifacts should be kept or cleaned up after the test run.
   */
  clean: boolean;
  /**
   * The name of the output file.
   */
  outputFile?: string;
  /**
   * String representing a regex pattern used to selectively filter which tests to run.
   */
  testFilter?: string;
  /**
   * How many times failed tests should be retried.
   */
  retry?: number;
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
  const results: { testName: string; results: std.TestResult[] }[] = [];
  process.env.WING_TARGET = determineTargetFromPlatforms(options.platform ?? []);
  const testFile = async (entrypoint: string) => {
    const testName = generateTestName(entrypoint);
    try {
      const singleTestResults: std.TestResult[] | void = await testOne(entrypoint, options);
      results.push({ testName, results: singleTestResults ?? [] });
    } catch (error: any) {
      console.log(error.message);
      results.push({
        testName: generateTestName(entrypoint),
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
  await Promise.all(selectedEntrypoints.map(testFile));
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

async function testOne(entrypoint: string, options: TestOptions) {
  const target = process.env.WING_TARGET; // TODO: try to just call method
  const synthDir = await withSpinner(
    `Compiling ${generateTestName(entrypoint)} to ${target}...`,
    async () =>
      compile(entrypoint, {
        ...options,
        rootId: options.rootId ?? `Test.${nanoid(10)}`,
        testing: true,
      })
  );

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
  results: std.TestResult[]
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

    // add any log messages that were emitted during the test
    for (const trace of result.traces) {
      // only show detailed traces if we are in debug mode
      if (trace.type === "resource" && process.env.DEBUG) {
        details.push(chalk.gray("[trace] " + trace.data.message));
      }
      if (trace.type === "log") {
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

async function runTestsWithRetry(
  testRunner: std.ITestRunnerClient,
  tests: string[],
  retries: number
): Promise<std.TestResult[]> {
  let runCount = retries + 1;
  let remainingTests = tests;
  const results: std.TestResult[] = [];

  while (runCount > 0 && remainingTests.length > 0) {
    const failedTests: string[] = [];

    for (const testPath of remainingTests) {
      const result = await testRunner.runTest(testPath);
      results.push(result);

      if (!result.pass) {
        failedTests.push(testPath);
      }
    }

    remainingTests = failedTests;

    if (remainingTests.length > 0 && runCount > 1) {
      console.log(`Retrying failed tests. ${runCount - 1} retries left.`);
    }

    runCount--;
  }

  return results;
}

async function testSimulator(synthDir: string, options: TestOptions) {
  const s = new simulator.Simulator({ simfile: synthDir });
  const { clean, testFilter, retry } = options;
  await s.start();

  const testRunner = s.getResource("root/cloud.TestRunner") as std.ITestRunnerClient;
  const tests = await testRunner.listTests();
  const filteredTests = filterTests(tests, testFilter);

  const results = await runTestsWithRetry(testRunner, filteredTests, retry ?? 0);

  await s.stop();

  const testReport = await renderTestReport(synthDir, results);
  console.log(testReport);

  let args: { methods: Record<string, Record<string, string>> };
  if (existsSync(join(synthDir, "usage_context.json"))) {
    args = { methods: JSON.parse(readFileSync(join(synthDir, "usage_context.json")).toString()) };
  }

  if (clean) {
    rmSync(synthDir, { recursive: true, force: true });
  } else {
    noCleanUp(synthDir);
  }

  return results.map((r) => ({ ...r, args }));
}

async function testTf(synthDir: string, options: TestOptions): Promise<std.TestResult[] | void> {
  const { clean, testFilter, retry, platform = [BuiltinPlatform.SIM] } = options;

  try {
    const installed = await isTerraformInstalled(synthDir);
    if (!installed) {
      throw new Error(
        "Terraform is not installed. Please install Terraform to run tests in the cloud."
      );
    }

    await withSpinner("terraform init", async () => terraformInit(synthDir));

    await withSpinner("terraform apply", () => terraformApply(synthDir));

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
      return runTestsWithRetry(testRunner, tests, retry ?? 0);
    });

    const testReport = await renderTestReport(synthDir, results);
    console.log(testReport);

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
      await cleanupTf(synthDir);
    } else {
      noCleanUp(synthDir);
    }
  }
}

async function testAwsCdk(synthDir: string, options: TestOptions): Promise<std.TestResult[]> {
  const { clean, testFilter, retry } = options;
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
      return runTestsWithRetry(testRunner, tests, retry ?? 0);
    });

    const testReport = await renderTestReport(synthDir, results);
    console.log(testReport);

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

async function cleanupTf(synthDir: string) {
  await withSpinner("terraform destroy", () => terraformDestroy(synthDir));
  rmSync(synthDir, { recursive: true, force: true });
}

async function isTerraformInstalled(synthDir: string) {
  const output = await execCapture("terraform version", { cwd: synthDir });
  return output.startsWith("Terraform v");
}

export async function terraformInit(synthDir: string) {
  return execCapture("terraform init", { cwd: synthDir });
}

async function terraformApply(synthDir: string) {
  return execCapture("terraform apply -auto-approve", { cwd: synthDir });
}

async function terraformDestroy(synthDir: string) {
  return execCapture("terraform destroy -auto-approve", { cwd: synthDir });
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
