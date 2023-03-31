import { basename } from "path";
import { compile, CompileOptions } from "./compile";
import * as chalk from "chalk";
import * as sdk from "@winglang/sdk";
import { ITestRunnerClient } from "@winglang/sdk/lib/cloud";
import { TestRunnerClient as TfawsTestRunnerClient } from "@winglang/sdk/lib/target-tf-aws/test-runner.inflight";
import * as cp from "child_process";
import debug from "debug";
import * as ora from "ora";
import { promisify } from "util";

const log = debug("wing:test");

/**
 * Options for the `test` command.
 */
export interface TestOptions extends CompileOptions {}

export async function test(entrypoints: string[], options: TestOptions) {
  for (const entrypoint of entrypoints) {
    await testOne(entrypoint, options);
  }
}

async function testOne(entrypoint: string, options: TestOptions) {
  const synthDir = await withSpinner(`Compiling ${entrypoint}...`, () => compile(entrypoint, {
    ...options,
    testing: true,
  }));

  // deploy the compiled app (to simulator or to the cloud)
  // instantiate the cloud-specific test runner client
  // - for simulator, we probably know how this works
  // - for tf-aws, we need to extract any test-specific config from the
  //   synthesized app and pass it to the test runner client
  //   (maybe via `terraform output` command?)

  switch (options.target) {
    case "sim":
      await testSimulator(synthDir);
      break;
    case "tf-aws":
      await testTfAws(synthDir);
      break;
    default:
      throw new Error(`unsupported target ${options.target}`);
  }
}

/**
 * Print out a test report to the console.
 * @returns `true` if any tests failed, `false` otherwise.
 */
function printTestReport(entrypoint: string, results: sdk.cloud.TestResult[]): boolean {
  // print report
  let hasFailures = false;

  // find the longest `path` of all the tests
  const longestPath = results.reduce(
    (longest, result) =>
      result.path.length > longest ? result.path.length : longest,
    0
  );

  // if there are no inflight tests, add a dummy "pass" result
  // to indicate that compilation and preflight checks passed
  if (results.length === 0) {
    results.push({
      pass: true,
      path: '',
      // traces: [],
    });
  }

  for (const result of results.sort(sortTests)) {
    const status = result.pass ? chalk.green("pass") : chalk.red("fail");

    const details = new Array<string>();

    // TODO
    // add any log messages that were emitted during the test
    // for (const log of result.traces.filter(t => t.type == "log")) {
    //   details.push(chalk.gray(log.data.message));
    // }

    // if the test failed, add the error message and trace
    if (result.error) {
      details.push(...result.error.split("\n").map(l => chalk.red(l)));
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
    console.log(firstRow.join(" "));

    // print additional rows that are related to this test
    for (let i = 0; i < details.length; i++) {
      const left = i === details.length - 1 ? "└" : "│";
      console.log(`    ${chalk.gray(` ${left} `)}${details[i]}`);
    }

    if (!result.pass) {
      hasFailures = true;
    }
  }

  return hasFailures;
};

async function testSimulator(synthDir: string) {
  const s = new sdk.testing.Simulator({ simfile: synthDir });
  await s.start();

  const testRunner = s.getResource("root/cloud.TestRunner") as ITestRunnerClient;
  const tests = await testRunner.listTests();
  const filteredTests = pickOneTestPerEnvironment(tests);
  const results = new Array<sdk.cloud.TestResult>();

  for (const path of filteredTests) {
    results.push(await testRunner.runTest(path));
  }

  await s.stop();

  const hasFailures = printTestReport(synthDir, results);
  if (hasFailures) {
    process.exit(1);
  }
}

async function testTfAws(synthDir: string): Promise<sdk.cloud.TestResult[]> {
  if (!isTerraformInstalled(synthDir)) {
    throw new Error(
      "Terraform is not installed. Please install Terraform to run tests in the cloud."
    );
  }

  // TODO: check if there was a previous test run, and if so ask the user if they want to destroy
  // the previous test run before starting a new one

  await withSpinner("terraform init", () => terraformInit(synthDir));
  await withSpinner("terraform apply", () => terraformApply(synthDir));

  const [testRunner, tests] = await withSpinner("Setting up test runner...", async () => {
    const testArns = await terraformOutput(synthDir, "WING_TEST_RUNNER_FUNCTION_ARNS");
    const testRunner = new TfawsTestRunnerClient(testArns);

    const tests = await testRunner.listTests();
    return [testRunner, pickOneTestPerEnvironment(tests)];
  });

  const results = await withSpinner("Running tests...", async () => {
    const results = new Array<sdk.cloud.TestResult>();
    for (const path of tests) {
      results.push(await testRunner.runTest(path));
    }
    return results;
  });

  const hasFailures = printTestReport(synthDir, results);

  if (hasFailures) {
    // TODO: in the future we can add a `--destroy` flag to the `test` command that will
    // destroy the resources from a test, and then we can print this message:
    // "Run `wing test --target tf-aws --destroy` to clean up resources."
    console.log("One or more tests failed. Skipping test cleanup.");
    process.exit(1);
  }

  await withSpinner("terraform destroy", () => terraformDestroy(synthDir));

  return results;
}

async function isTerraformInstalled(synthDir: string) {
  const output = await execCapture("terraform version", { cwd: synthDir });
  return output.startsWith("Terraform v");
}

async function terraformInit(synthDir: string) {
  await execCapture("terraform init", { cwd: synthDir });
}

async function terraformApply(synthDir: string) {
  await execCapture("terraform apply -auto-approve", { cwd: synthDir });
}

async function terraformDestroy(synthDir: string) {
  await execCapture("terraform destroy -auto-approve", { cwd: synthDir });
}

async function terraformOutput(synthDir: string, name: string) {
  const output = await execCapture("terraform output -json", { cwd: synthDir });
  const parsed = JSON.parse(output);
  if (!parsed[name]) {
    throw new Error(`terraform output ${name} not found`);
  }
  return parsed[name].value;
}

function pickOneTestPerEnvironment(testPaths: string[]) {
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
    const testSuffix = testPath.substring(testPath.indexOf('env') + 1); // "<env #>/<path to test>"
    const env = testSuffix.substring(0, testSuffix.indexOf('/')); // "<env #>"
    const test = testSuffix.substring(testSuffix.indexOf('/') + 1); // "<path to test>"

    if (envs.has(env)) {
      continue;
    }

    if (tests.has(test)) {
      continue;
    }

    tests.set(test, testPath);
    envs.add(env);
  }

  return Array.from(tests.values());
}

function sortTests(a: sdk.cloud.TestResult, b: sdk.cloud.TestResult) {
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
  return stdout;
}

async function withSpinner<T>(
  message: string,
  fn: () => Promise<T>,
): Promise<T> {
  const spinner = ora({
    stream: process.stdout, // hangar tests currently expect stderr to be empty or else they fail
    text: message,
  }).start();
  try {
    const result = await fn();
    spinner.succeed();
    return result;
  } catch (e) {
    spinner.fail();
    throw e;
  }
}
