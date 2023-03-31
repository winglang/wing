import { basename } from "path";
import { compile, CompileOptions } from "./compile";
import * as chalk from "chalk";
import * as sdk from "@winglang/sdk";
import { ITestRunnerClient } from "@winglang/sdk/lib/cloud";

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
  const synthDir = await compile(entrypoint, {
    ...options,
    testing: true,
  });

  // deploy the compiled app (to simulator or to the cloud)
  // instantiate the cloud-specific test runner client
  // - for simulator, we probably know how this works
  // - for tf-aws, we need to extract any test-specific config from the
  //   synthesized app and pass it to the test runner client
  //   (maybe via `terraform output` command?)

  let results: sdk.cloud.TestResult[];
  switch (options.target) {
    case "sim":
      results = await testSimulator(synthDir);
      break;
    case "tf-aws":
      results = await testTfAws(synthDir);
      break;
    default:
      throw new Error(`unsupported target ${options.target}`);
  }

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

  if (hasFailures) {
    process.exit(1);
  }
}

async function testSimulator(synthDir: string): Promise<sdk.cloud.TestResult[]> {
  const s = new sdk.testing.Simulator({ simfile: synthDir });
  await s.start();

  const testRunner = s.getResource("root/cloud.TestRunner") as ITestRunnerClient;
  const tests = await testRunner.listTests();
  const filteredTests = pickTests(tests);
  const results = new Array<sdk.cloud.TestResult>();

  for (const path of filteredTests) {
    results.push(await testRunner.runTest(path));
  }

  await s.stop();
  return results;
}

function pickTests(testPaths: string[]) {
  // Given a list of test paths like so:
  //
  // root/env0/a/b/test:test1
  // root/env0/d/e/f/test:test2
  // root/env0/g/test:test3
  // root/env1/a/b/test:test1
  // root/env1/d/e/f/test:test2
  // root/env1/g/test:test3
  // root/env2/a/b/test:test1
  // root/env2/d/e/f/test:test2
  // root/env2/g/test:test3
  //
  // This function returns a list of test paths which uses each test name
  // exactly once and each "env" exactly once. In this case, the result would
  // be:
  //
  // root/env0/a/b/test:test1
  // root/env1/d/e/f/test:test2
  // root/env2/g/test:test3

  const tests = new Map<string, string>();
  const envs = new Set<string>();

  for (const testPath of testPaths) {
    const [_root, env, test] = testPath.split("/");

    if (env === "Default") {
      continue;
    }

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

async function testTfAws(_synthDir: string): Promise<sdk.cloud.TestResult[]> {
  throw new Error("not implemented");
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
