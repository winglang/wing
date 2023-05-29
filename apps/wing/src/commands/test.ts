import { basename, sep } from "path";
import { compile, CompileOptions } from "./compile";
import chalk from "chalk";
import * as sdk from "@winglang/sdk";
import { ITestRunnerClient } from "@winglang/sdk/lib/cloud";
import { TestRunnerClient as TfawsTestRunnerClient } from "@winglang/sdk/lib/target-tf-aws/test-runner.inflight";
import * as cp from "child_process";
import debug from "debug";
import { promisify } from "util";
import { generateTmpDir, withSpinner } from "../util";
import { Target } from "./constants";
import { rmSync } from "fs-extra";

const log = debug("wing:test");

const ENV_WING_TEST_RUNNER_FUNCTION_ARNS = "WING_TEST_RUNNER_FUNCTION_ARNS";

/**
 * @param path path to the test/s file
 * @returns the file name and parent dir in the following format: "folder/file.ext"
 */
const generateTestName = (path: string) => path.split(sep).slice(-2).join("/");

/**
 * Options for the `test` command.
 */
export interface TestOptions extends CompileOptions {}

export async function test(entrypoints: string[], options: TestOptions) {
  const startTime = Date.now();
  const passing: string[] = [];
  const failing: { testName: string; error: Error }[] = [];
  for (const entrypoint of entrypoints) {
    try {
      const results: sdk.cloud.TestResult[] | void = await testOne(entrypoint, options);
      if (results?.some(({ pass }) => !pass)) {
        failing.push(
          ...results
            ?.filter(({ pass }) => !pass)
            .map((item) => ({
              testName: generateTestName(entrypoint),
              error: new Error(item.error),
            }))
        );
      } else {
        passing.push(generateTestName(entrypoint));
      }
    } catch (error) {
      failing.push({ testName: generateTestName(entrypoint), error: error as Error });
    }
  }
  printResults(passing, failing, Date.now() - startTime);
}

function printResults(
  passing: string[],
  failing: { testName: string; error: Error }[],
  duration: number
) {
  const durationInSeconds = duration / 1000;
  const totalSum = failing.length + passing.length;
  console.log(" "); // for getting a new line- \n does't seem to work :(
  console.log(`
${
  totalSum > 1
    ? `Tests Results:
${passing.map((testName) => `    ${chalk.green("✓")} ${testName}`).join("\n")}
${failing.map(({ testName }) => `    ${chalk.red("×")} ${testName}`).join("\n")}`
    : ""
}
${
  failing.length && totalSum > 1
    ? `
${" "}
Errors:` +
      failing
        .map(
          ({ testName, error }) => `

At ${testName}\n ${chalk.red(error.message)}
        `
        )
        .join("\n\n")
    : ""
}

${chalk.dim("Tests")}${failing.length ? chalk.red(` ${failing.length} failed`) : ""}${
    failing.length && passing.length ? chalk.dim(" |") : ""
  }${passing.length ? chalk.green(` ${passing.length} passed`) : ""} ${chalk.dim(`(${totalSum})`)} 
${chalk.dim("Duration")} ${Math.floor(durationInSeconds / 60)}m${(durationInSeconds % 60).toFixed(
    2
  )}s
`);
}

async function testOne(entrypoint: string, options: TestOptions) {
  // since the test cleans up after each run, it's essential to create a temporary directory-
  // at least one that is different then the usual compilation dir,  otherwise we might end up cleaning up the user's actual resources.
  const tempFile: string = Target.SIM ? entrypoint : await generateTmpDir(entrypoint);
  const synthDir = await withSpinner(
    `Compiling ${generateTestName(entrypoint)} to ${options.target}...`,
    () =>
      compile(tempFile, {
        ...options,
        testing: true,
      })
  );

  switch (options.target) {
    case Target.SIM:
      return await testSimulator(synthDir);
      break;
    case Target.TF_AWS:
      return await testTfAws(synthDir);
      break;
    default:
      throw new Error(`unsupported target ${options.target}`);
  }
}

/**
 * Render a test report for printing out to the console.
 */
export function renderTestReport(entrypoint: string, results: sdk.cloud.TestResult[]): string {
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
    for (const log of result.traces) {
      // only show detailed traces if we are in debug mode
      if (log.type === "resource" && process.env.DEBUG) {
        details.push(chalk.gray("[trace] " + log.data.message));
      }
      if (log.type === "log") {
        details.push(chalk.gray(log.data.message));
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

function testResultsContainsFailure(results: sdk.cloud.TestResult[]): boolean {
  return results.some((r) => !r.pass);
}

async function testSimulator(synthDir: string) {
  const s = new sdk.testing.Simulator({ simfile: synthDir });
  await s.start();

  const testRunner = s.getResource("root/cloud.TestRunner") as ITestRunnerClient;
  const tests = await testRunner.listTests();
  const filteredTests = pickOneTestPerEnvironment(tests);
  const results = new Array<sdk.cloud.TestResult>();

  // TODO: run these tests in parallel
  for (const path of filteredTests) {
    results.push(await testRunner.runTest(path));
  }

  await s.stop();

  const testReport = renderTestReport(synthDir, results);
  console.log(testReport);

  rmSync(synthDir, { recursive: true, force: true });

  if (testResultsContainsFailure(results)) {
    throw Error(results.map(({ error }) => error).join("\n"));
  }
}

async function testTfAws(synthDir: string): Promise<sdk.cloud.TestResult[] | void> {
  try {
    if (!isTerraformInstalled(synthDir)) {
      throw new Error(
        "Terraform is not installed. Please install Terraform to run tests in the cloud."
      );
    }

    await withSpinner("terraform init", async () => await terraformInit(synthDir));

    await withSpinner("terraform apply", () => terraformApply(synthDir));

    const [testRunner, tests] = await withSpinner("Setting up test runner...", async () => {
      const testArns = await terraformOutput(synthDir, ENV_WING_TEST_RUNNER_FUNCTION_ARNS);
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
    await cleanup(synthDir);
  }
}

async function cleanup(synthDir: string) {
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
    const testSuffix = testPath.substring(testPath.indexOf("env") + 1); // "<env #>/<path to test>"
    const env = testSuffix.substring(0, testSuffix.indexOf("/")); // "<env #>"
    const test = testSuffix.substring(testSuffix.indexOf("/") + 1); // "<path to test>"

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
