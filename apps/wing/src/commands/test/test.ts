import * as cp from "child_process";
import { readFile, rm, rmSync } from "fs";
import * as os from "os";
import { basename, resolve, sep } from "path";
import { promisify } from "util";
import { BuiltinPlatform, determineModelFromPlatforms } from "@winglang/compiler";
import { std, simulator } from "@winglang/sdk";
import { Util } from "@winglang/sdk/lib/util";
import chalk from "chalk";
import debug from "debug";
import { glob } from "glob";
import { nanoid } from "nanoid";
import { printResults, validateOutputFilePath, writeResultsToFile } from "./results";
import { withSpinner } from "../../util";
import { compile, CompileOptions, NotImplementedError } from "../compile";

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
  /** Whether to keep the build output. */
  clean: boolean;
  outputFile?: string;
  /** String representing a RegEx used for test filtering. */
  testFilter?: string;
}

export async function test(entrypoints: string[], options: TestOptions): Promise<number> {
  let patterns;

  if (options.outputFile) {
    validateOutputFilePath(options.outputFile);
  }

  if (entrypoints.length === 0) {
    patterns = ["*.test.w"];
  } else {
    patterns =
      os.platform() === "win32"
        ? entrypoints.map((entrypoint) => entrypoint.replace(/\\/g, "/"))
        : entrypoints;
  }

  const expandedEntrypoints = await glob(patterns);
  if (expandedEntrypoints.length === 0) {
    throw new Error(`No matching files found for patterns: [${patterns.join(", ")}]`);
  }

  const startTime = Date.now();
  const results: { testName: string; results: std.TestResult[] }[] = [];
  process.env.WING_MODEL = determineModelFromPlatforms(options.platform ?? []);
  const testFile = async (entrypoint: string) => {
    const testName = generateTestName(entrypoint);
    try {
      const singleTestResults: std.TestResult[] | void = await testOne(entrypoint, options);
      results.push({ testName, results: singleTestResults ?? [] });
    } catch (error) {
      console.log((error as Error).message);
      results.push({
        testName: generateTestName(entrypoint),
        results: [
          {
            pass: false,
            unsupported: error instanceof NotImplementedError,
            path: "",
            error: (error as Error).message,
            traces: [],
          },
        ],
      });
    }
  };
  await Promise.all(expandedEntrypoints.map(testFile));
  const testDuration = Date.now() - startTime;
  printResults(results, testDuration);
  if (options.outputFile) {
    writeResultsToFile(results, testDuration, options.outputFile);
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
  const model = process.env.WING_MODEL; // TODO: try to just call method
  const synthDir = await withSpinner(
    `Compiling ${generateTestName(entrypoint)} to ${model}...`,
    async () =>
      compile(entrypoint, {
        ...options,
        rootId: options.rootId ?? `Test.${nanoid(10)}`,
        testing: true,
      })
  );

  switch (model) {
    case BuiltinPlatform.SIM:
      return testSimulator(synthDir, options);
    case BuiltinPlatform.TF_AZURE:
    case BuiltinPlatform.TF_AWS:
      return testTf(synthDir, options);
    case BuiltinPlatform.AWSCDK:
      return testAwsCdk(synthDir, options);
    default:
      throw new Error(`unsupported target ${model}`);
  }
}

/**
 * Render a test report for printing out to the console.
 */
export function renderTestReport(entrypoint: string, results: std.TestResult[]): string {
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
      details.push(...result.error.split("\n").map((l) => chalk.red(l)));
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

async function testSimulator(synthDir: string, options: TestOptions) {
  const s = new simulator.Simulator({ simfile: synthDir });
  const { clean, testFilter } = options;
  await s.start();

  const testRunner = s.getResource("root/cloud.TestRunner") as std.ITestRunnerClient;
  const tests = await testRunner.listTests();
  const filteredTests = pickOneTestPerEnvironment(filterTests(tests, testFilter));
  const results = new Array<std.TestResult>();
  // TODO: run these tests in parallel
  for (const path of filteredTests) {
    results.push(await testRunner.runTest(path));
  }

  await s.stop();

  const testReport = renderTestReport(synthDir, results);
  console.log(testReport);

  if (clean) {
    rmSync(synthDir, { recursive: true, force: true });
  } else {
    noCleanUp(synthDir);
  }

  return results;
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
      const filteredTests = pickOneTestPerEnvironment(filterTests(allTests, testFilter));
      return [runner, filteredTests];
    });

    const results = await withSpinner("Running tests...", async () => {
      const res = new Array<std.TestResult>();
      for (const path of tests) {
        res.push(await testRunner.runTest(path));
      }
      return res;
    });

    const testReport = renderTestReport(synthDir, results);
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
};

async function testTf(synthDir: string, options: TestOptions): Promise<std.TestResult[] | void> {
  const { clean, testFilter, platform = [BuiltinPlatform.SIM] } = options;

  try {
    if (!isTerraformInstalled(synthDir)) {
      throw new Error(
        "Terraform is not installed. Please install Terraform to run tests in the cloud."
      );
    }

    await withSpinner("terraform init", async () => terraformInit(synthDir));

    await withSpinner("terraform apply", () => terraformApply(synthDir));

    const [testRunner, tests] = await withSpinner("Setting up test runner...", async () => {
      const testArns = await terraformOutput(synthDir, ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS);
      const { TestRunnerClient } = await import(
        `@winglang/sdk/lib/${targetFolder[platform[0]]}/test-runner.inflight`
      );
      const runner = new TestRunnerClient(testArns);

      const allTests = await runner.listTests();
      const filteredTests = pickOneTestPerEnvironment(filterTests(allTests, testFilter));
      return [runner, filteredTests];
    });

    const results = await withSpinner("Running tests...", async () => {
      const res = new Array<std.TestResult>();
      for (const path of tests) {
        res.push(await testRunner.runTest(path));
      }
      return res;
    });

    const testReport = renderTestReport(synthDir, results);
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
      await cleanupTf(synthDir);
    } else {
      noCleanUp(synthDir);
    }
  }
}

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

export function pickOneTestPerEnvironment(testPaths: string[]) {
  // Given a list of test paths like so:
  //
  // root/Default/env0/a/b/test:test1
  // root/Default/env0/d/e/f/test:test2
  // root/Default/env0/g/test:test3
  // root/Default/env1/a/b/test:test1
  // root/Default/env1/d/e/f/test:test2
  // root/Default/env1/g/test:test3
  // root/Default/env2/a/b/test:test1
  // root/Default/env2/d/e/f/test:test2
  // root/Default/env2/g/test:test3
  //
  // This function returns a list of test paths which uses each test name
  // exactly once and each "env" exactly once. In this case, the result would
  // be:
  //
  // root/Default/env0/a/b/test:test1
  // root/Default/env1/d/e/f/test:test2
  // root/Default/env2/g/test:test3

  const tests = new Map<string, string>();
  const envs = new Set<string>();

  for (const testPath of testPaths) {
    const testSuffix = testPath.substring(testPath.indexOf("env") + 1); // "<env #>/<path to test>"
    const env = testSuffix.substring(0, testSuffix.indexOf("/")); // "<env #>"
    const testName = testSuffix.substring(testSuffix.indexOf("/") + 1); // "<path to test>"

    if (envs.has(env)) {
      continue;
    }

    if (tests.has(testName)) {
      continue;
    }

    tests.set(testName, testPath);
    envs.add(env);
  }

  return Array.from(tests.values());
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
